/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/components/store/useStore";
import React from "react";
import { toast } from "react-hot-toast";
import { useSpeechRecognition } from "react-speech-kit";

const Index = () => {
  const note = useStore((state) => state.note);
  const incrementStep = useStore((state) => state.incrementStep);

  const setNote = useStore((state) => state.setNote);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      console.log(result);

      setNote(result);
    },
  });

  const startListening = () => {
    listen({
      lang: "en-US", // Set the language to en-US for US English
    });
  };

  const handlNext = () => {
    note !== "" ? incrementStep() : toast.error("please fill the input ");
  };

  return (
    <div className="box mt-4 w-full">
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
          <p className="text-sm text-gray-500 py-1 px-2 bg-yellow-200 rounded-md shadow-md my-2">
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

      <div
        className="w-full flex items-center justify-end gap-10 "
        onClick={() => handlNext()}
      >
        <div className="w-[90px]  h-[90px] bg-purple-500 rounded-full shadow-md  flex justify-center items-center hover:animate-none cursor-pointer mr-7 mt-10">
          <p className="text-white text-small">Next {`>>`} </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
