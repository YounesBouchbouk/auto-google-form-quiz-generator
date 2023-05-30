import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";
import AppScript from "@images/AppScript.png";

type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};
const Index = ({ setText }: Props) => {
  function handleDownload() {
    const downloadUrl = "/script.txt"; // Replace with the actual path to your file

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "script.txt"; // Replace with the desired filename and extension

    link.click();
  }

  const copyAppScriptLinkToCbord = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("https://www.google.com/script/start/");
      toast.success("link has been copied");
      return;
    } else {
      return Promise.reject("The Clipboard API is not available.");
    }
  };

  return (
    <div className="w-full flex-1  border-1 flex flex-col gap-3">
      <div className="py-3 px-4 text-lg  ">
        Step 1 : Google Script configuration
      </div>
      <div className="flex-1 w-full ">
        <ul className="py-3 px-2 space-y-5">
          <li className="text-sm">
            1 - Click this{" "}
            <span
              className="cursor-pointer font-bold text-purple-500"
              onClick={handleDownload}
            >
              link
            </span>{" "}
            to download the script
          </li>

          <li className="text-sm">
            2 - Login to{" "}
            <span
              className="cursor-pointer font-bold text-purple-500"
              onClick={copyAppScriptLinkToCbord}
            >
              Google Apps Script
            </span>{" "}
            and create a new project
          </li>

          <li className="text-sm">
            3 - Paste the downloaded script code into the newly created project
          </li>

          <li className="text-sm">
            4 - Deploy the project and obtain the deployment link
          </li>

          <li className="text-sm">
            5 - Paste the deployment link into the input field below:
          </li>
        </ul>

        <div className="w-full ">
          <Image
            alt="AppScript"
            style={{ height: "250px", width: "500px" }}
            src={AppScript}
          />
        </div>
      </div>
      <div className="h-[50px]  w-full flex items-center justify-end ">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className="rounded-md border-[1px] border-gray-300 py-2 px-5 w-full"
          placeholder="put the URL here ... "
        />
      </div>
    </div>
  );
};

export default Index;
