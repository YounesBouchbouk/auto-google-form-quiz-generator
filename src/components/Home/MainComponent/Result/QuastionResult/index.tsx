import React, { useState } from "react";
import { QuastionListType } from "..";
import Link from "next/link";
import Card from "./Card";
import NewQuastionCard from "./NewCard";
import useStore from "@/components/store/useStore";
type Props = {
  questionnaire: QuastionListType[];
  setQuastionList: React.Dispatch<React.SetStateAction<QuastionListType[]>>;
};

const Index = ({ questionnaire, setQuastionList }: Props) => {
  const [formLink, setformLink] = useState("");
  const apiUrl = useStore((state) => state.apiURL);
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
        setformLink(text);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="w-full ">
      <div className="w-full py-4 container grid grid-cols-3 gap-4 ">
        {questionnaire.map((question, index) => (
          <Card
            question={question}
            key={index}
            setQuastionList={setQuastionList}
          />
        ))}

        {questionnaire.length > 0 && (
          <NewQuastionCard
            questionnaire={questionnaire}
            setQuastionList={setQuastionList}
          />
        )}
      </div>

      {questionnaire.length !== 0 && (
        <div className="flex items-center justify-center">
          <button onClick={handleGenerateGoogleForm}>
            Generate Google Form ?{" "}
          </button>
        </div>
      )}

      {formLink !== "" && <Link href={formLink}>{formLink}</Link>}
    </div>
  );
};

export default Index;
