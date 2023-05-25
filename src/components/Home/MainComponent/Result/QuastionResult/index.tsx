import React from "react";
import Card from "./Card";
import NewQuastionCard from "./NewCard";
import useStore from "@/components/store/useStore";
import { EnvSlice } from "@/components/store/envSlice";
import { appDataSlice } from "@/components/store/appData";

const Index = () => {
  const questionaire = useStore((state: appDataSlice) => state.questionaire);
  const askForFullName = useStore((state) => state.askForFullName);
  const askForEmail = useStore((state) => state.askForEmail);
  const askForPhone = useStore((state) => state.askForPhone);
  const title = useStore((state) => state.title);
  const description = useStore((state) => state.description);

  const generatedForms = useStore(
    (state: appDataSlice) => state.generatedForms
  );
  const setGeneratedForms = useStore(
    (state: appDataSlice) => state.setGeneratedForms
  );

  console.log(questionaire);

  const apiUrl = useStore((state: EnvSlice) => state.apiURL);

  const handleGenerateGoogleForm = async () => {
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
        // setformLink(text);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="w-full ">
      <div className="w-full py-4 container grid grid-cols-3 gap-4 ">
        {questionaire.map((question, index) => (
          <Card question={question} key={index} />
        ))}

        {questionaire.length > 0 && <NewQuastionCard />}
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
