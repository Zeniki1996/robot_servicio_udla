import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    <div>
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
  );
};

const SmileyFaceComponent = () => {
  // Aquí iría tu componente de la carita sonriendo
  return <div>😊</div>;
};

const App = () => {
  return (
    <div>
      <SmileyFaceComponent />
      <SpeechToTextComponent />
    </div>
  );
};

export default App;
