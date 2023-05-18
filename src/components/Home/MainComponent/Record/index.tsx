/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type Props = {
  setNote: React.Dispatch<React.SetStateAction<string>>;
  note: string;
};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

let mic: any;

const Index = ({ note, setNote }: Props) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      mic = new SpeechRecognition();

      mic.continuous = true;
      mic.interimResults = true;
      mic.lang = "en-US";

      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event: any) => {
        const transcript: any = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
      };

      mic.onerror = (event: any) => {
        console.log(event.error);
      };

      mic.onend = () => {
        if (isListening) {
          console.log("continue..");
          mic.start();
        } else {
          console.log("Stopped Mic on Click");
        }
      };
    }

    handleListen();

    // Cleanup function to stop recognition when component is unmounted
    return () => {
      if (mic) {
        mic.stop();
      }
    };
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
    } else {
      mic.stop();
    }
  };

  return (
    <div className="box mt-4">
      <div className="flex flex-col justify-center items-center">
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          {isListening ? (
            <span>🎙️ Stop Recording</span>
          ) : (
            <span>🛑 Start Recording</span>
          )}
        </button>
      </div>

      <div className="p-3  flex w-full  items-center justify-center">
        <div className="w-[80%] ">
          <p className="text-sm text-gray-400">
            If this is not exalctly what you have sayed , feel free to edit the
            text
          </p>
          <textarea
            className="min-h-[60px] w-full p-3 border-2 rounded-md border-gray-200"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
