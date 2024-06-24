<<<<<<< HEAD
import React, { useState, useEffect, useRef, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { PorcupineWorker } from '@picovoice/porcupine-web';
=======
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
>>>>>>> ecbb79df8d2d47912508e353ed99a2c0ebb6eeee
import "./App.css";

// Imágenes utilizadas en el estado de la aplicación
const images = {
  abierto: require("./images/abierto.png"),
  feliz: require("./images/feliz.png"),
  cansado: require("./images/cansado.png"),
  enojado: require("./images/enojado.png"),
  guino: require("./images/guiño.png"),
  pensando: require("./images/pensando.png"),
  triste: require("./images/triste.png"),
};

const SpeechToTextComponent = () => {
  const [text, setText] = useState(""); // Estado para almacenar el texto reconocido
  const [status, setStatus] = useState("En espera"); // Estado para manejar el estado del reconocimiento de voz
  const [image, setImage] = useState(images.abierto); // Estado para manejar la imagen actual
<<<<<<< HEAD
  const [wakeWordDetected, setWakeWordDetected] = useState(false); // Estado para manejar la detección de la palabra clave
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition(); // Hook para el reconocimiento de voz
  const porcupineWorkerRef = useRef(null);

  // Inicializar Porcupine
  useEffect(() => {
    const initPorcupine = async () => {
      try {
        const accessKey = 'YOUR_ACCESS_KEY'; // Reemplaza con tu Access Key de Picovoice
        const keywordPath = 'path/to/hola-mavi.ppn'; // Ruta al archivo .ppn

        const porcupineWorker = await PorcupineWorker.create(
          accessKey,
          keywordPath,
          (keywordIndex) => {
            if (keywordIndex === 0) {
              setWakeWordDetected(true);
            }
          }
        );

        porcupineWorkerRef.current = porcupineWorker;
        await porcupineWorker.start();
      } catch (error) {
        console.error('Error initializing Porcupine:', error);
      }
    };

    initPorcupine();

    return () => {
      if (porcupineWorkerRef.current) {
        porcupineWorkerRef.current.terminate();
      }
    };
  }, []);

=======
  const { transcript, resetTranscript } = useSpeechRecognition(); // Hook para el reconocimiento de voz

>>>>>>> ecbb79df8d2d47912508e353ed99a2c0ebb6eeee
  // Efecto para manejar el cambio de imagen en base al estado
  useEffect(() => {
    let interval;
    if (status === "En espera") {
      interval = setInterval(() => {
        setImage(prevImage => (prevImage === images.feliz ? images.abierto : images.feliz));
      }, 2500); // 2s feliz, 0.5s abierto
    } else if (status === "Escuchando" || status === "Hablando") {
      interval = setInterval(() => {
        setImage(prevImage => (prevImage === images.abierto ? images.feliz : images.abierto));
      }, 2500); // 2s abierto, 0.5s feliz
    }
    return () => clearInterval(interval); // Limpieza del intervalo cuando el componente se desmonta o el estado cambia
  }, [status]);

<<<<<<< HEAD
  useEffect(() => {
    if (wakeWordDetected) {
      handleListen();
      setWakeWordDetected(false); // Reset the wake word detected state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wakeWordDetected]);

  const handleListen = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    setStatus("Escuchando");
    SpeechRecognition.startListening({ continuous: true, language: "es-ES" });

    // Handle the end event when the user stops speaking
    const recognition = SpeechRecognition.getRecognition();
    recognition.onend = () => {
      setStatus("Pensando");
      handleStop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserSupportsSpeechRecognition]);
=======
  // Función para iniciar el reconocimiento de voz
  const handleListen = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }
    // Iniciar reconocimiento de voz en español
    SpeechRecognition.startListening({ language: "es-ES" });
    setStatus("Escuchando");
  };
>>>>>>> ecbb79df8d2d47912508e353ed99a2c0ebb6eeee

  // Función para detener el reconocimiento de voz
  const handleStop = () => {
    SpeechRecognition.stopListening();
    setText(transcript);
    resetTranscript();

    if (transcript.trim()) {
      setStatus("Pensando");
      setImage(images.pensando);

      // Enviar el texto reconocido al backend
      fetch("http://localhost:3001/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: transcript })
      })
        .then(response => response.json())
        .then(data => {
          const responseText = data.text; // Suponiendo que el backend devuelve { text: "respuesta del bot" }
          setStatus("Hablando");
          handleSpeak(responseText);
        })
        .catch(error => {
          console.error("Error al llamar a la API:", error);
          setStatus("En espera");
          setImage(images.abierto);
        });
    } else {
      alert("No se detectó contenido de la voz");
      setStatus("En espera");
      setImage(images.abierto);
    }
<<<<<<< HEAD
  };

  const handleSpeak = (textToSpeak) => {
    if (textToSpeak.trim()) {
      setStatus("Hablando");
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "es-ES"; // Establecer el idioma a español
      utterance.onend = () => {
        setImage(images.guino);
        setTimeout(() => {
          setStatus("En espera");
          setImage(images.abierto);
          // Reset to listening for wake word
          if (porcupineWorkerRef.current) {
            porcupineWorkerRef.current.start();
          }
        }, 2000); // Cambiar la imagen a "guiño" por 2 segundos cuando termina de hablar
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert("No hay contenido en el cuadro de texto");
    }
=======
>>>>>>> ecbb79df8d2d47912508e353ed99a2c0ebb6eeee
  };

  // Función para convertir texto en voz
  const handleSpeak = (textToSpeak) => {
    if (textToSpeak.trim()) {
      setStatus("Hablando");
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "es-ES"; // Establecer el idioma a español
      utterance.onend = () => {
        setImage(images.guino);
        setTimeout(() => {
          setStatus("En espera");
          setImage(images.abierto);
        }, 2000); // Cambiar la imagen a "guiño" por 2 segundos cuando termina de hablar
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert("No hay contenido en el cuadro de texto");
    }
  };

  // Función para manejar la detección de la frase desencadenadora
  const handleWakeWord = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }
    SpeechRecognition.startListening({ continuous: true, language: "es-ES" });

    SpeechRecognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      if (transcript.toLowerCase().includes("hola uli")) {
        SpeechRecognition.stopListening();
        setStatus("Escuchando");
        handleListen();

        // Detener automáticamente después de 5 segundos
        setTimeout(() => {
          handleStop();
        }, 5000);
      }
    };
  };

  useEffect(() => {
    handleWakeWord();
  }, []);

  return (
    <div className="centered">
      <div className="pixel-art-container">
        <img src={image} alt="Estado actual" className="state-image" />
        <div className="pixel-art">
          <textarea
            rows="4"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="button-container">
            <button onClick={handleListen}>
              <img src="microphone-icon.png" alt="Microphone" />
            </button>
            <button onClick={handleStop}>Detener</button>
            <button onClick={() => handleSpeak(text)}>Hablar</button>
          </div>
        </div>
      </div>
      <span style={{ color: "white" }}>{status}</span>
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
