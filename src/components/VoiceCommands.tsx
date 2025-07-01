import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Zap, 
  Brain,
  MessageSquare,
  Settings
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const VoiceCommands: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const voiceCommands = [
    {
      command: "créer un nouveau projet",
      action: () => {
        speak("Création d'un nouveau projet en cours...");
        // Trigger new project modal
      }
    },
    {
      command: "afficher les tâches",
      action: () => {
        speak("Affichage des tâches...");
        // Navigate to tasks
      }
    },
    {
      command: "analyser les performances",
      action: () => {
        speak("Analyse des performances de l'équipe en cours...");
        // Show performance analysis
      }
    },
    {
      command: "rapport intelligent",
      action: () => {
        speak("Génération du rapport intelligent...");
        // Generate AI report
      }
    }
  ];

  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Reconnaissance vocale non supportée dans ce navigateur');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

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
      speak("Désolé, je n'ai pas compris. Pouvez-vous répéter ?");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processVoiceCommand = (command: string) => {
    const matchedCommand = voiceCommands.find(cmd => 
      command.includes(cmd.command) || 
      cmd.command.split(' ').some(word => command.includes(word))
    );

    if (matchedCommand) {
      matchedCommand.action();
    } else {
      speak("Commande non reconnue. Dites 'aide' pour voir les commandes disponibles.");
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
            <h3 className="font-semibold text-slate-900">Commandes Vocales IA</h3>
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
              <div className="text-sm text-red-600 font-medium">🎤 Écoute en cours...</div>
            )}
            {isSpeaking && (
              <div className="text-sm text-blue-600 font-medium">🔊 Réponse en cours...</div>
            )}
            {!isListening && !isSpeaking && (
              <div className="text-sm text-slate-600">Cliquez pour parler</div>
            )}
          </div>
        </div>

        {/* Last Command */}
        {lastCommand && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-500 mb-1">Dernière commande:</div>
            <div className="text-sm text-slate-900 font-medium">"{lastCommand}"</div>
            {confidence > 0 && (
              <div className="text-xs text-slate-500 mt-1">Confiance: {confidence}%</div>
            )}
          </div>
        )}

        {/* Available Commands */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>Commandes disponibles:</span>
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
              onClick={() => speak("Bonjour ! Je suis votre assistant vocal IA. Comment puis-je vous aider aujourd'hui ?")}
              className="p-2 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
            >
              Test vocal
            </button>
            <button
              onClick={() => {
                setLastCommand('');
                setConfidence(0);
              }}
              className="p-2 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommands;