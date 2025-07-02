import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain,
  MessageSquare
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const VoiceCommands: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const voiceCommands = [
    {
      command: t.voiceCommandsPanel.commands.createProject,
      action: () => {
        speak(t.voiceCommandsPanel.responses.creatingProject);
        // Trigger new project modal
      }
    },
    {
      command: t.voiceCommandsPanel.commands.showTasks,
      action: () => {
        speak(t.voiceCommandsPanel.responses.showingTasks);
        // Navigate to tasks
      }
    },
    {
      command: t.voiceCommandsPanel.commands.analyzePerformance,
      action: () => {
        speak(t.voiceCommandsPanel.responses.analyzingPerformance);
        // Show performance analysis
      }
    },
    {
      command: t.voiceCommandsPanel.commands.smartReport,
      action: () => {
        speak(t.voiceCommandsPanel.responses.generatingReport);
        // Generate AI report
      }
    }
  ];

  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(t.voiceCommandsPanel.messages.notSupported);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'fr' ? 'fr-FR' : 'en-US';

    setIsListening(true);
    setConfidence(0);

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const confidence = event.results[0][0].confidence;
      
      setLastCommand(command);
      setConfidence(Math.round(confidence * 100));
      
      processVoiceCommand(command);
    };

    recognition.onerror = (event: any) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      setIsListening(false);
      speak(t.voiceCommandsPanel.messages.errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processVoiceCommand = (command: string) => {
    const matchedCommand = voiceCommands.find(cmd => 
      command.includes(cmd.command) || 
      cmd.command.split(' ').some((word: string) => command.includes(word))
    );

    if (matchedCommand) {
      matchedCommand.action();
    } else {
      speak(t.voiceCommandsPanel.messages.commandNotRecognized);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    speechSynthesis.cancel();
  };

  return (
    <div className="fixed top-20 right-6 z-40">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-slate-900">{t.voiceCommandsPanel.title}</h3>
          </div>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1 rounded ${voiceEnabled ? 'text-purple-500' : 'text-slate-400'}`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Voice Control */}
        <div className="text-center mb-4">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/25' 
                : isSpeaking
                ? 'bg-blue-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : isSpeaking ? (
              <Volume2 className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
          
          <div className="mt-2">
            {isListening && (
              <div className="text-sm text-red-600 font-medium">🎤 {t.voiceCommandsPanel.listening}</div>
            )}
            {isSpeaking && (
              <div className="text-sm text-blue-600 font-medium">🔊 {t.voiceCommandsPanel.speaking}</div>
            )}
            {!isListening && !isSpeaking && (
              <div className="text-sm text-slate-600">{t.voiceCommandsPanel.clickToSpeak}</div>
            )}
          </div>
        </div>

        {/* Last Command */}
        {lastCommand && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-500 mb-1">{t.voiceCommandsPanel.lastCommand}:</div>
            <div className="text-sm text-slate-900 font-medium">"{lastCommand}"</div>
            {confidence > 0 && (
              <div className="text-xs text-slate-500 mt-1">{t.voiceCommandsPanel.confidence}: {confidence}%</div>
            )}
          </div>
        )}

        {/* Available Commands */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{t.voiceCommandsPanel.availableCommands}:</span>
          </h4>
          <div className="space-y-2">
            {voiceCommands.map((cmd, index) => (
              <div key={index} className="text-xs p-2 bg-slate-50 rounded border-l-2 border-purple-500">
                "_{cmd.command}_"
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => speak(t.voiceCommandsPanel.messages.testMessage)}
              className="p-2 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
            >
              {t.voiceCommandsPanel.voiceTest}
            </button>
            <button
              onClick={() => {
                setLastCommand('');
                setConfidence(0);
              }}
              className="p-2 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
            >
              {t.voiceCommandsPanel.clear}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommands;