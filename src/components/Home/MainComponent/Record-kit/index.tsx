/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { appDataSlice } from "@/components/store/appData";
import { EnvSlice } from "@/components/store/envSlice";
import useStore from "@/components/store/useStore";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSpeechRecognition } from "react-speech-kit";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "you are a quize generator so always generate quastion with choices if i didn't mention that",
};

type MessagesType = {
  message: string;
  sentTime?: string;
  sender: string;
};

export type QuastionListType = {
  question: string;
  options: string[];
  id: number;
};

const Index = () => {
  const note = useStore((state) => state.note);
  const incrementStep = useStore((state) => state.incrementStep);
  const changeLoading = useStore((state) => state.changeLoading);

  const setNote = useStore((state) => state.setNote);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      console.log(result);

      setNote(result);
    },
  });

  const [messages, setMessages] = useState<MessagesType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const openAI_api = useStore((state: EnvSlice) => state.openAPI);

  const setQuastionList = useStore(
    (state: appDataSlice) => state.setQuestionaire
  );

  const handleSend = async (message: string) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      sentTime: "just now",
    };

    // const newMessages = [...messages, newMessage];

    // setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    // setIsTyping(true);
    await processMessageToChatGPT(newMessage);
  };

  async function processMessageToChatGPT(chatMessages: MessagesType) {
    const apiMessages: { role: string; content: string } = {
      role: "user",
      content: chatMessages.message,
    };

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    changeLoading();
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + openAI_api,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // build list from gtpResponse
        let questionnaire: QuastionListType[] = data.choices[0].message.content
          .split("\n\n")
          .map((block: string, index: number) => {
            const lines = block.split("\n");
            return {
              question: lines[0],
              options: lines.slice(1).map((option) => option.slice(3)),
              id: index,
            };
          });

        //clean list when GPT triying to be nice with user

        questionnaire = questionnaire.filter(
          (block) => block.options.length !== 0
        );

        setQuastionList(questionnaire);

        setMessages([
          ...messages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        changeLoading();

        incrementStep();
      })
      .catch((e) => {
        toast.error(e);
        changeLoading();
      });
  }

  const startListening = () => {
    listen({
      lang: "en-US", // Set the language to en-US for US English
    });
  };

  const handlNext = () => {
    if (note !== "") {
      handleSend(note);
    } else toast.error("please fill the input ");
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
          <p className="text-sm text-gray-500 py-1 px-2  rounded-md  ">
            If this is not exalctly what you have sayed , feel free to edit the
            text
          </p>
          <textarea
            className="min-h-[60px] w-full p-3 border-[1px] rounded-md border-gray-200"
            value={note}
            cols={10}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-10 ">
        <div
          onClick={() => handlNext()}
          className="w-[100px]  h-[40px] rounded-md bg-purple-500  shadow-md  flex justify-center items-center hover:animate-none cursor-pointer mr-7 mt-10"
        >
          <p className="text-white text-small">Next {`>>`} </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
