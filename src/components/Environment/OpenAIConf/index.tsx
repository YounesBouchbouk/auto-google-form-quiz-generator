import Image from "next/image";
import React from "react";
import OpenIA from "@images/openAI.png";
type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};
const Index = ({ setText }: Props) => {
  return (
    <div className="w-full flex-1  flex flex-col gap-3">
      <div className="py-3 px-4 text-lg  ">
        Step 2 : OpenAI API configuration
      </div>
      <div className="flex-1  w-full ">
        <ul className="py-3 px-2 space-y-4">
          <li className="text-sm">
            1 - Go to the{" "}
            <a
              href="https://platform.openai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-bold"
            >
              OpenAI platform
            </a>{" "}
            and log in to your account
          </li>

          <li className="text-sm">
            2 - Navigate to the API settings or developer dashboard
          </li>

          <li className="text-sm">
            3 - Generate a new API key for your application
          </li>

          <li className="text-sm">4 - Copy the generated API key</li>

          <li className="text-sm">
            5 - Use the API key in your application by providing it in the
            appropriate API calls or configuration
          </li>
        </ul>

        <div className="w-full ">
          <Image
            alt="openIa"
            style={{ height: "250px", width: "500px" }}
            src={OpenIA}
          />
        </div>
      </div>
      <div className="h-[50px]  w-full flex items-center justify-end ">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className="rounded-md border-[1px] border-gray-300 py-2 px-5 w-full"
          placeholder="put the API here ... "
        />
      </div>
    </div>
  );
};

export default Index;
