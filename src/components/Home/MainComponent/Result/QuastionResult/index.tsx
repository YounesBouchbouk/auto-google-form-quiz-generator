import React from "react";
import Card from "./Card";
import NewQuastionCard from "./NewCard";
import useStore from "@/components/store/useStore";
import { EnvSlice } from "@/components/store/envSlice";
import { appDataSlice } from "@/components/store/appData";

const Index = () => {
  const questionnaire = useStore((state: appDataSlice) => state.questionaire);
  const generatedForms = useStore(
    (state: appDataSlice) => state.generatedForms
  );
  const setGeneratedForms = useStore(
    (state: appDataSlice) => state.setGeneratedForms
  );

  const apiUrl = useStore((state: EnvSlice) => state.apiURL);

  const handleGenerateGoogleForm = async () => {
    fetch(apiUrl, {
      method: "POST",
      // mode: "no-cors",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(questionnaire),
    })
      .then((response) => response.text())
      .then((text) => {
        const date = new Date();
        setGeneratedForms(
          generatedForms.concat({ createdAt: date, link: text, title: "ttl" })
        );
        // setformLink(text);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="w-full ">
      <div className="w-full py-4 container grid grid-cols-3 gap-4 ">
        {questionnaire.map((question, index) => (
          <Card question={question} key={index} />
        ))}

        {questionnaire.length > 0 && <NewQuastionCard />}
      </div>

      {questionnaire.length !== 0 && (
        <div className="flex items-center justify-center">
          <button onClick={handleGenerateGoogleForm}>
            Generate Google Form ?{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
