import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'; // Asegúrate de importar tus estilos CSS aquí

// Componentes para la cara
const Eyes = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'black', borderRadius: '50%', marginRight: '10px', marginBottom:'10px' }}></div>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'black', borderRadius: '50%' }}></div>
    </div>
  );
};

const Mouth = () => {
  return (
    <div style={{ width: '150px', height: '50px', backgroundColor: 'red', margin: '0 auto', marginBottom:'10px' }}></div>
  );
};

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

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="centered">
      <div className="pixel-art-container">
        <div className="pixel-art">
          <Eyes />
          <Mouth />
          <textarea
            rows="4"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button onClick={handleListen}>
              <img src="microphone-icon.png" alt="Microphone" />
            </button>
            <button onClick={handleStop}>Detener</button>
            <button onClick={handleSpeak}>Hablar</button>
          </div>
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
