import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Webcam from 'react-webcam';
import videocall from '../assests/Mentor.mp4';

const VideoCall = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  const [speech1, setSpeech] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const speech = (text) => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const handleGenerate = async () => {
    console.log("pressed");
    const response = await fetch("https://api.edenai.run/v2/text/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTZhZjY3NzUtNDM0ZC00YzhiLWE5OTMtMzg0YjdhODgyOGYxIiwidHlwZSI6ImFwaV90b2tlbiJ9.-5jwvonLSSasi9EnAzxU-pezBuKFXqBX5Ikbz6Ybo3Q",
      },
      body: JSON.stringify({
        providers: "openai",
        text: `You are a mentor for a mentee this is the question: ${transcript}. Reply politely and in a friendly way.`,
        temperature: 0.2,
        max_tokens: 500,
        fallback_providers: "",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    setShowVideo(true);
    setSpeech(data.openai.generated_text);

    const utterance = new SpeechSynthesisUtterance(data.openai.generated_text);
    utterance.onend = () => {
      setShowVideo(false); // Stop the video when speech ends
    };
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {showVideo && <video src={videocall} autoPlay loop muted />}
        </div>
        <div style={{ flex: 1 }}>
          <Webcam audio={false} />
        </div>
      </div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={handleGenerate}>Generate Response</button>
      <button onClick={() => speech(speech1)}>Speak</button>

      <p>{transcript}</p>
    </div>
  );
};

export default VideoCall;
