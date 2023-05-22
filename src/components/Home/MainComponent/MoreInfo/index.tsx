import useStore from "@/components/store/useStore";
import React from "react";

const Index = () => {
  const setAskFormFN = useStore((state) => state.setAskForFullName);
  const setAskFormEmail = useStore((state) => state.setAskForEmail);
  const setAskFormPhone = useStore((state) => state.setAskForPhone);
  const setTitleOfInput = useStore((state) => state.setTitle);
  const setDescription = useStore((state) => state.setDescription);

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
    </div>
  );
};

export default Index;
