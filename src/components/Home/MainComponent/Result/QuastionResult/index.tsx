/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import { QuastionListType } from "..";
import Link from "next/link";

type Props = {
  questionnaire: QuastionListType[];
};

const Index = ({ questionnaire }: Props) => {
  const [formLink, setformLink] = useState("");
  const handleGenerateGoogleForm = async () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzKIEglgd7-xP-YfG74GrzmexwUxgHQm5viDaUwW91u1sShfaVXMzgNEKjCom3hRtrH/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionnaire),
      }
    )
      .then((response) => response.text())
      .then((url) => {
        setformLink(url);
        console.log(url);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="w-full ">
      <div className="w-full py-4 container grid grid-cols-3 gap-4 ">
        {questionnaire.map((question, index) => (
          <div key={index} className="col-span-1 py-2 ">
            <h2 className="font-bold">{question.question}</h2>

            <ul className="px-4">
              {question.options.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <button onClick={handleGenerateGoogleForm}>
          Generate Google Form ?{" "}
        </button>
      </div>

      {formLink !== "" && <Link href={formLink}>{formLink}</Link>}
    </div>
  );
};

export default Index;
