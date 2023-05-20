/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/components/store/useStore";
import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

const Index = () => {
  const note = useStore((state) => state.note);
  const setNote = useStore((state) => state.setNote);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setNote(result);
    },
  });

  const startListening = () => {
    listen({
      lang: "en-US", // Set the language to en-US for US English
    });
  };

  return (
    <div className="box mt-4">
      <div className="flex flex-col justify-center items-center">
        {listening ? (
          <button onClick={stop}>
            <div>🎙️ Go ahead I m listening</div>
          </button>
        ) : (
          <button onClick={startListening}>
            <span>🛑 Start Recording</span>
          </button>
        )}
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
