interface SecurityPolicy {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    historySize: number;
    maxAge: number; // days
  };
  sessionPolicy: {
    timeout: number; // minutes
    maxSessions: number;
    requireReauth: boolean;
    ipBinding: boolean;
  };
  accessPolicy: {
    ipWhitelist: string[];
    geoRestrictions: string[];
    allowVPN: boolean;
    requireVerifiedDevice: boolean;
  };
  twoFactorPolicy: {
    enforced: boolean;
    methods: ('app' | 'sms' | 'email')[];
    backupCodes: boolean;
  };
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | '2fa_setup' | '2fa_disable' | 'failed_login' | 'suspicious_activity';
  status: 'success' | 'failed' | 'warning' | 'blocked';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  details?: any;
  riskScore: number; // 0-100
}

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  appName: string;
  accountName: string;
}

interface SecurityMetrics {
  totalEvents: number;
  failedLogins24h: number;
  suspiciousActivity: number;
  blockedAttempts: number;
  averageRiskScore: number;
  lastSecurityScan: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface PasswordStrength {
  score: number; // 0-100
  feedback: string[];
  estimatedCrackTime: string;
  meets: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    commonPasswords: boolean;
    personalInfo: boolean;
  };
}

interface DeviceInfo {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  trusted: boolean;
  lastUsed: string;
  ipAddress: string;
  location?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class SecurityService {
  private static getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
    };
  }

  static async getSecurityPolicy(): Promise<SecurityPolicy | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/policy`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get security policy:', error);
    }

    return null;
  }

  static async updateSecurityPolicy(policy: Partial<SecurityPolicy>): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/policy`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(policy),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<{
    success: boolean;
    error?: string;
    warnings?: string[];
  }> {
    try {
      // Validate password strength first
      const strength = await this.checkPasswordStrength(newPassword);
      if (strength.score < 70) {
        return {
          success: false,
          error: 'Password is too weak',
          warnings: strength.feedback,
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: await this.hashPassword(currentPassword),
          newPassword: await this.hashPassword(newPassword),
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
        warnings: result.warnings,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password change failed',
      };
    }
  }

  static async checkPasswordStrength(password: string): Promise<PasswordStrength> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/password-strength`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to check password strength:', error);
    }

    // Fallback client-side check
    return this.clientSidePasswordCheck(password);
  }

  private static clientSidePasswordCheck(password: string): PasswordStrength {
    const feedback: string[] = [];
    let score = 0;

    const meets = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      commonPasswords: !this.isCommonPassword(password),
      personalInfo: true, // Would need user info to check properly
    };

    // Score calculation
    if (meets.length) score += 20;
    if (meets.uppercase) score += 15;
    if (meets.lowercase) score += 15;
    if (meets.numbers) score += 15;
    if (meets.symbols) score += 20;
    if (meets.commonPasswords) score += 15;

    // Length bonus
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Variety bonus
    const charTypes = [meets.uppercase, meets.lowercase, meets.numbers, meets.symbols].filter(Boolean).length;
    score += charTypes * 2;

    // Generate feedback
    if (!meets.length) feedback.push('Password must be at least 8 characters long');
    if (!meets.uppercase) feedback.push('Add uppercase letters');
    if (!meets.lowercase) feedback.push('Add lowercase letters');
    if (!meets.numbers) feedback.push('Add numbers');
    if (!meets.symbols) feedback.push('Add special characters');
    if (!meets.commonPasswords) feedback.push('Avoid common passwords');

    let estimatedCrackTime = 'Unknown';
    if (score < 30) estimatedCrackTime = 'Seconds';
    else if (score < 50) estimatedCrackTime = 'Minutes';
    else if (score < 70) estimatedCrackTime = 'Hours';
    else if (score < 85) estimatedCrackTime = 'Days';
    else estimatedCrackTime = 'Years';

    return {
      score: Math.min(100, score),
      feedback,
      estimatedCrackTime,
      meets,
    };
  }

  private static isCommonPassword(password: string): boolean {
    const common = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
      'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon'
    ];
    return common.includes(password.toLowerCase());
  }

  static async setup2FA(): Promise<{
    success: boolean;
    setup?: TwoFactorSetup;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/setup`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        setup: result.setup,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA setup failed',
      };
    }
  }

  static async verify2FA(code: string, method: 'app' | 'sms' | 'email' = 'app'): Promise<{
    success: boolean;
    backupCodes?: string[];
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ code, method }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        backupCodes: result.backupCodes,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA verification failed',
      };
    }
  }

  static async disable2FA(password: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/disable`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ 
          password: await this.hashPassword(password),
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA disable failed',
      };
    }
  }

  static async regenerateBackupCodes(): Promise<{
    success: boolean;
    codes?: string[];
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/backup-codes`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        codes: result.codes,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate backup codes',
      };
    }
  }

  static async getSecurityEvents(limit: number = 50): Promise<SecurityEvent[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/events?limit=${limit}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get security events:', error);
    }

    return [];
  }

  static async getSecurityMetrics(): Promise<SecurityMetrics | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/metrics`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get security metrics:', error);
    }

    return null;
  }

  static async getTrustedDevices(): Promise<DeviceInfo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/devices`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get trusted devices:', error);
    }

    return [];
  }

  static async trustDevice(deviceId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/devices/${deviceId}/trust`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to trust device',
      };
    }
  }

  static async revokeDevice(deviceId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/devices/${deviceId}/revoke`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to revoke device',
      };
    }
  }

  static async terminateAllSessions(): Promise<{
    success: boolean;
    terminatedCount?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sessions/terminate-all`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        terminatedCount: result.terminatedCount,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to terminate sessions',
      };
    }
  }

  static async runSecurityScan(): Promise<{
    success: boolean;
    results?: {
      vulnerabilities: any[];
      recommendations: string[];
      riskScore: number;
    };
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/scan`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        results: result.results,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Security scan failed',
      };
    }
  }

  static async enableLoginNotifications(enabled: boolean): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/login-notifications`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ enabled }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update settings',
      };
    }
  }

  static async reportSuspiciousActivity(details: {
    type: string;
    description: string;
    evidence?: any;
  }): Promise<{
    success: boolean;
    reportId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/report-suspicious`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(details),
      });

      const result = await response.json();
      return {
        success: response.ok,
        reportId: result.reportId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to report activity',
      };
    }
  }

  private static async hashPassword(password: string): Promise<string> {
    try {
      // In production, use proper client-side hashing with salt
      const encoder = new TextEncoder();
      const data = encoder.encode(password + 'salt');
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Password hashing failed:', error);
      return password; // Fallback - not secure!
    }
  }

  static formatRiskScore(score: number): {
    level: 'low' | 'medium' | 'high' | 'critical';
    color: string;
    description: string;
  } {
    if (score < 25) {
      return {
        level: 'low',
        color: 'green',
        description: 'Low risk - Normal activity',
      };
    } else if (score < 50) {
      return {
        level: 'medium',
        color: 'yellow',
        description: 'Medium risk - Monitor activity',
      };
    } else if (score < 75) {
      return {
        level: 'high',
        color: 'orange',
        description: 'High risk - Investigate immediately',
      };
    } else {
      return {
        level: 'critical',
        color: 'red',
        description: 'Critical risk - Take immediate action',
      };
    }
  }

  static async downloadSecurityReport(): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/security/report`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return {
          success: true,
          url,
        };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: result.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to download report',
      };
    }
  }
}

export type {
  SecurityPolicy,
  SecurityEvent,
  TwoFactorSetup,
  SecurityMetrics,
  PasswordStrength,
  DeviceInfo,
};