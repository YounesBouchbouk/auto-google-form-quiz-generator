import { appDataSlice } from "@/components/store/appData";
import { EnvSlice } from "@/components/store/envSlice";
import useStore from "@/components/store/useStore";
import React from "react";
import { toast } from "react-hot-toast";

export type QuastionListType = {
  question: string;
  options: string[];
  id: number;
};

const Index = () => {
  const questionaire = useStore((state: appDataSlice) => state.questionaire);
  const setAskFormFN = useStore((state) => state.setAskForFullName);
  const setAskFormEmail = useStore((state) => state.setAskForEmail);
  const setAskFormPhone = useStore((state) => state.setAskForPhone);
  const setTitleOfInput = useStore((state) => state.setTitle);
  const setDescription = useStore((state) => state.setDescription);

  const incrementStep = useStore((state) => state.incrementStep);

  const askForFullName = useStore((state) => state.askForFullName);
  const askForEmail = useStore((state) => state.askForEmail);
  const askForPhone = useStore((state) => state.askForPhone);
  const title = useStore((state) => state.title);
  const description = useStore((state) => state.description);
  const changeLoading = useStore((state) => state.changeLoading);
  const generatedForms = useStore(
    (state: appDataSlice) => state.generatedForms
  );
  const setGeneratedForms = useStore(
    (state: appDataSlice) => state.setGeneratedForms
  );

  const apiUrl = useStore((state: EnvSlice) => state.apiURL);

  const handleGenerateGoogleForm = async () => {
    changeLoading();
    fetch(apiUrl, {
      method: "POST",
      // mode: "no-cors",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        title: title,
        description,
        askName: askForFullName, // set to true if you want to ask for the user's name
        askEmail: askForEmail, // set to true if you want to ask for the user's email
        askPhone: askForPhone, // set to true if you want to ask for the user's phone
        questionaire: questionaire,
      }),
    })
      .then((response) => response.text())
      .then((text) => {
        const date = new Date();
        setGeneratedForms(
          generatedForms.concat({
            createdAt: date,
            link: text,
            title,
            description,
          })
        );
        changeLoading();
        incrementStep();
      })
      .catch((error) => {
        changeLoading();
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5 justify-center items-center">
        <div className="w-3/4 border-2 rounded-md border-gray-600">
          <input
            type="text"
            name=""
            placeholder="set a title for the form"
            className="py-2 px-5 w-full rounded-md"
            onChange={(e) => setTitleOfInput(e.target.value)}
          />
        </div>
        <div className="w-3/4 border-2 rounded-md border-gray-600">
          <textarea
            placeholder="set a description"
            className="py-2 px-5 w-full rounded-md"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center"></div>
      <div className="flex w-full justify-center   gap-6">
        <div className="flex w-[200px] items-center pl-4  rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            name="FN"
            onChange={(e) => setAskFormFN(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-1"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ask For Full Name ?
          </label>
        </div>
        <div className="flex w-[200px] items-center pl-4  rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            onChange={(e) => setAskFormEmail(e.target.checked)}
            name="EM"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-1"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ask For Email
          </label>
        </div>
        <div className="flex w-[200px] items-center pl-4  rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-2"
            type="checkbox"
            onChange={(e) => setAskFormPhone(e.target.checked)}
            name="PH"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-2"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ask For Phone ?
          </label>
        </div>
      </div>

      {questionaire.length !== 0 && (
        <div className="flex items-center justify-center">
          <button
            onClick={handleGenerateGoogleForm}
            className="px-8 py-2 rounded-lg bg-purple-500 my-4 hover:bg-purple-400 text-white"
          >
            Generate Google Form ?{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
