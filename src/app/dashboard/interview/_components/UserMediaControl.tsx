/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { CameraIcon, MicIcon, CameraOffIcon, MicOffIcon } from 'lucide-react';

type SpeechRecognition = typeof window.webkitSpeechRecognition;
import { Button } from '@/components/ui/button';


declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function UserMediaControl() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (cameraEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: micEnabled })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [cameraEnabled, micEnabled]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognition) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + event.results[i][0].transcript);
        }
      }
    };
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleMicClick = () => {
    setMicEnabled(prevState => !prevState);
    setIsListening(prevState => !prevState);
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };

  // const toggleMic = () => {
  //   setMicEnabled(!micEnabled);
  // };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-2xl h-96 bg-black rounded-lg overflow-hidden">
        {cameraEnabled ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={!micEnabled}
          ></video>
        ) : (
          <p className="text-gray-500 text-lg flex items-center justify-center h-full">Your camera is off</p>
        )}
        <div className="absolute bottom-4 left-64 flex items-center justify-center space-x-8">
          <Button
            onClick={toggleCamera}
            className={`p-2 rounded-full shadow-md ${cameraEnabled
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
          >
            {cameraEnabled ? <CameraOffIcon className="w-6 h-6" /> : <CameraIcon className="w-6 h-6" />}
          </Button>
          <Button
            onClick={handleMicClick}
            className={`p-2 rounded-full shadow-md ${micEnabled
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
          >
            {micEnabled ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
}


