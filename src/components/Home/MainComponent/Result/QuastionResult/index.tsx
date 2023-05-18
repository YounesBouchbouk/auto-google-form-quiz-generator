import React, { useState } from "react";
import { QuastionListType } from "..";
import Link from "next/link";
import Card from "./Card";
import UpdateCard from "./NewCard";
type Props = {
  questionnaire: QuastionListType[];
  setQuastionList: React.Dispatch<React.SetStateAction<QuastionListType[]>>;
};

const Index = ({ questionnaire, setQuastionList }: Props) => {
  const [formLink, setformLink] = useState("");
  const handleGenerateGoogleForm = async () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyL8VmMxyBHNcRSW5nWMErsfy9Js5dUOllTY36kvia6zwbZKne_j4dPWnLfcK70DT7M/exec",
      {
        method: "POST",
        // mode: "no-cors",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(questionnaire),
      }
    )
      .then((response) => response.text())
      .then((text) => {
        setformLink(text);
      })
      .catch((error) => console.error("Error:", error));
  };

  console.log(questionnaire);

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

        <UpdateCard
          questionnaire={questionnaire}
          setQuastionList={setQuastionList}
        />
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
