/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useState } from "react";
import useStore from "@/components/store/useStore";
import { EnvSlice } from "@/components/store/envSlice";
import { appDataSlice } from "@/components/store/appData";
import { MainLayout } from "@/layout/Main";
// "Explain things like you would to a 10 year old learning how to code."
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

const Moodle = () => {
  const [messages, setMessages] = useState<MessagesType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [note, setNote] = useState("");
  const [result, setresult] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const openAI_api = useStore((state: EnvSlice) => state.openAPI);

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
    setIsTyping(true);
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
        const text: string = data.choices[0].message.content;
        console.log(text);
        setresult(text);

        setIsTyping(false);
      });
  }

  return (
    <div className="w-full  hover:text-white  text-gray-200">
      <textarea
        name=""
        onChange={(e) => setNote(e.target.value)}
        className="  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Handle the Enter key press here
            handleSend(note);
            // Perform any desired actions
          }
        }}
      />

      {/* {note !== "" && (
        <div className="w-full py-3 flex items-center justify-center">
          <button
            className="w-[100px]  rounded-md"
            onClick={() => handleSend(note)}
          >
            Send{" "}
          </button>
        </div>
      )} */}

      <div className="px-5 mt-5">
        {isTyping ? (
          <div>
            <p>loading ...</p>{" "}
          </div>
        ) : (
          <div>
            {" "}
            <p>{result}</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Moodle;

Moodle.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
