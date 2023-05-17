/* eslint-disable @typescript-eslint/no-unused-vars */
import { log } from "console";
import React, { useState } from "react";
import QuastionResult from "./QuastionResult";
const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "I'm going to use your response to build a quize , so dont be nice i only need quastions and with out numerating them  ",
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

const Index = ({ note }: { note: string }) => {
  const [messages, setMessages] = useState<MessagesType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const [QuastionList, setQuastionList] = useState<QuastionListType[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

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
        Authorization: "Bearer " + API_KEY,
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
              id: index + 1,
            };
          });

        //clean list when GPT triying to be nice with user

        questionnaire = questionnaire.filter(
          (block) => block.options.length !== 0
        );

        console.log(questionnaire);

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

      {isTyping ? (
        <div>loading ... </div>
      ) : (
        <QuastionResult
          questionnaire={QuastionList}
          setQuastionList={setQuastionList}
        />
      )}
    </div>
  );
};

export default Index;
