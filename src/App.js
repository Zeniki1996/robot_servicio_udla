import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'; // Importa tus estilos CSS aquí

const SpeechToTextComponent = () => {
  const [text, setText] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setText(transcript);
    resetTranscript();
  };

  return (
    <div className="centered">
      <div className="pixel-art-container">
        <div className="pixel-art">
          <div className="smiley-face">😊</div>
          <textarea
            rows="4"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleListen}>
            <img src="microphone-icon.png" alt="Microphone" />
          </button>
          <button onClick={handleStop}>Detener</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="background">
      <SpeechToTextComponent />
    </div>
  );
};

export default App;
