/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import QuastionResult from "./QuastionResult";
import useStore from "@/components/store/useStore";
import { EnvSlice } from "@/components/store/envSlice";
import { appDataSlice } from "@/components/store/appData";
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

const Index = () => {
  const [messages, setMessages] = useState<MessagesType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const note = useStore((state: appDataSlice) => state.note);
  const setQuastionList = useStore(
    (state: appDataSlice) => state.setQuestionaire
  );

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
        setIsTyping(false);
      });
  }

  return (
    <div className="w-full ">
      {note !== "" && (
        <div className="w-full py-3 flex items-center justify-center">
          <button
            className="w-[100px] bg-blue-300 rounded-md"
            onClick={() => handleSend(note)}
          >
            Send{" "}
          </button>
        </div>
      )}

      <div className="px-5">
        {isTyping ? <div>loading ... </div> : <QuastionResult />}
      </div>
    </div>
  );
};

export default Index;
