import React, { useState } from "react";
import { QuastionListType } from "../..";
import useStore from "@/components/store/useStore";

type Props = {
  question: QuastionListType;
};

const Index = ({ question }: Props) => {
  const [newOption, setnewOption] = useState("");
  const [hideInput, setHideInput] = useState(true);
  const setQuastionList = useStore((state) => state.setQuestionaire);
  const questionaire = useStore((state) => state.questionaire);

  const handlAddItem = () => {
    const newQuestions = questionaire.map((qst: QuastionListType) => {
      if (qst.id === question.id) {
        const newOptions = qst.options;
        return {
          ...qst,
          options: newOptions.concat([newOption]),
        };
      } else {
        return qst;
      }
    });

    setQuastionList(newQuestions);

    setnewOption("");
    setHideInput(true);
  };

  const handlRemoveItem = (value: string) => {
    const newQuestions = questionaire.map((qst: QuastionListType) => {
      if (qst.id === question.id) {
        const options = qst.options.filter((it) => it !== value);
        return {
          ...qst,
          options,
        };
      } else {
        return qst;
      }
    });
    setQuastionList(newQuestions);
  };

  const handlRemove = () => {
    const newQuestions = questionaire.filter(
      (qst: QuastionListType) => qst.id !== question.id
    );

    setQuastionList(newQuestions);
  };

  return (
    <div className="col-span-1 p-2 bg-slate-50 rounded-lg shadow-md  ">
      <div className="flex justify-between items-center">
        <p className="font-bold text-[14px]">{question.question}</p>

        <p
          className=" text-red-600 cursor-pointer  font-bold"
          onClick={handlRemove}
        >
          x
        </p>
      </div>

      <ul className="px-4 py-2">
        {question.options.map((li) => (
          <div key={li} className="flex items-center justify-between">
            <p>
              * <span className="text-[13px]">{li}</span>{" "}
            </p>
            <span
              className="text-red-400 cursor-pointer font-bold text-xs "
              onClick={() => handlRemoveItem(li)}
            >
              x
            </span>
          </div>
        ))}
        <li>
          {hideInput && (
            <button
              className="px-2 bg-white rounded-md text-xsmall"
              onClick={() => setHideInput((state) => !state)}
            >
              + custom option
            </button>
          )}
        </li>
        {!hideInput && (
          <li>
            *{" "}
            <input
              type="text"
              className=" px-2 text-xs py-1 rounded-md"
              placeholder="choice ..."
              onChange={(e) => setnewOption(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && newOption !== "" && handlAddItem();
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Index;
