interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  avatar: string;
  jobTitle: string;
  department: string;
  skills: string[];
  languages: string[];
  timezone: string;
  joinDate: string;
  lastLogin: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  jobTitle?: string;
  department?: string;
  skills?: string[];
  languages?: string[];
  timezone?: string;
}

interface AvatarUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: { field: string; message: string; }[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class ProfileService {
  private static getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
    };
  }

  static async getProfile(): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // Silent fail for offline mode - this is expected when API is not available
    }

    return null;
  }

  static async updateProfile(data: ProfileUpdateData): Promise<{
    success: boolean;
    profile?: UserProfile;
    error?: string;
  }> {
    try {
      // Validate data first
      const validation = this.validateProfileData(data);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.errors.map(e => e.message).join(', '),
        };
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          profile: result.profile,
        };
      } else {
        return {
          success: false,
          error: result.message || 'Update failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }

  static async uploadAvatar(file: File): Promise<AvatarUploadResult> {
    try {
      // Validate file
      const validation = this.validateAvatarFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.errors.map(e => e.message).join(', '),
        };
      }

      // Create form data
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          url: result.url,
        };
      } else {
        return {
          success: false,
          error: result.message || 'Upload failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  static async deleteAvatar(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: result.message || 'Delete failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

  static async verifyEmail(email: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/verify-email`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }

  static async confirmEmailVerification(token: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/confirm-email`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Confirmation failed',
      };
    }
  }

  static async verifyPhone(phone: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/verify-phone`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ phone }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }

  static async confirmPhoneVerification(code: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/confirm-phone`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Confirmation failed',
      };
    }
  }

  static async deleteAccount(password: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/delete`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

  static async exportData(): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/export`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data,
        };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: result.message || 'Export failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed',
      };
    }
  }

  static async getActivityLog(): Promise<{
    id: string;
    action: string;
    timestamp: string;
    ipAddress: string;
    userAgent: string;
    details?: string;
  }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/activity-log`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get activity log:', error);
    }

    return [];
  }

  static validateProfileData(data: ProfileUpdateData): ValidationResult {
    const errors: { field: string; message: string; }[] = [];

    // Validate name
    if (data.name !== undefined) {
      if (!data.name.trim()) {
        errors.push({ field: 'name', message: 'Name is required' });
      } else if (data.name.length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
      } else if (data.name.length > 100) {
        errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
      }
    }

    // Validate email
    if (data.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email.trim()) {
        errors.push({ field: 'email', message: 'Email is required' });
      } else if (!emailRegex.test(data.email)) {
        errors.push({ field: 'email', message: 'Invalid email format' });
      }
    }

    // Validate phone
    if (data.phone !== undefined && data.phone.trim()) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        errors.push({ field: 'phone', message: 'Invalid phone number format' });
      }
    }

    // Validate website
    if (data.website !== undefined && data.website.trim()) {
      try {
        new URL(data.website);
      } catch {
        errors.push({ field: 'website', message: 'Invalid website URL' });
      }
    }

    // Validate LinkedIn
    if (data.linkedin !== undefined && data.linkedin.trim()) {
      if (!data.linkedin.includes('linkedin.com')) {
        errors.push({ field: 'linkedin', message: 'Must be a valid LinkedIn URL' });
      }
    }

    // Validate GitHub
    if (data.github !== undefined && data.github.trim()) {
      if (!data.github.includes('github.com')) {
        errors.push({ field: 'github', message: 'Must be a valid GitHub URL' });
      }
    }

    // Validate bio
    if (data.bio !== undefined && data.bio.length > 500) {
      errors.push({ field: 'bio', message: 'Bio must not exceed 500 characters' });
    }

    // Validate skills
    if (data.skills !== undefined) {
      if (data.skills.length > 20) {
        errors.push({ field: 'skills', message: 'Maximum 20 skills allowed' });
      }
      for (const skill of data.skills) {
        if (skill.length > 50) {
          errors.push({ field: 'skills', message: 'Each skill must not exceed 50 characters' });
          break;
        }
      }
    }

    // Validate languages
    if (data.languages !== undefined) {
      if (data.languages.length > 10) {
        errors.push({ field: 'languages', message: 'Maximum 10 languages allowed' });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateAvatarFile(file: File): ValidationResult {
    const errors: { field: string; message: string; }[] = [];

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors.push({ 
        field: 'avatar', 
        message: 'Only JPEG, PNG, and WebP images are allowed' 
      });
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errors.push({ 
        field: 'avatar', 
        message: 'File size must not exceed 5MB' 
      });
    }

    // Check file name
    if (file.name.length > 255) {
      errors.push({ 
        field: 'avatar', 
        message: 'File name is too long' 
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static async resizeImage(file: File, maxWidth: number = 400, maxHeight: number = 400): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and resize image
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          0.9 // Quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static generateAvatarPlaceholder(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);

    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    
    const colorIndex = name.length % colors.length;
    const backgroundColor = colors[colorIndex];

    // Generate SVG
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="${backgroundColor}"/>
        <text x="100" y="130" font-family="Arial, sans-serif" font-size="80" 
              font-weight="bold" text-anchor="middle" fill="white">
          ${initials}
        </text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
}

export type { UserProfile, ProfileUpdateData, AvatarUploadResult, ValidationResult };