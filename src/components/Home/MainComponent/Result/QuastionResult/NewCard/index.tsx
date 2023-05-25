import React, { useState } from "react";
import { QuastionListType } from "../..";
import { appDataSlice } from "@/components/store/appData";
import useStore from "@/components/store/useStore";

const Index = () => {
  const [newOption, setnewOption] = useState("");
  const [hideInput, setHideInput] = useState(true);
  const questionnaire = useStore((state: appDataSlice) => state.questionaire);
  const setQuastionList = useStore(
    (state: appDataSlice) => state.setQuestionaire
  );

  const [newQuestion, setnewQuestion] = useState<QuastionListType>({
    id: questionnaire.length + 1,
    options: [],
    question: "",
  });

  const [hideForm, sethideForm] = useState(true);

  const handlAddItem = () => {
    setnewQuestion((state) => ({
      ...state,
      options: [newOption, ...state.options],
    }));

    setnewOption("");
    setHideInput(true);
  };

  const handlRemove = (value: string) => {
    setnewQuestion((qst) => {
      const options = qst.options.filter((it) => it !== value);
      return {
        ...qst,
        options,
      };
    });
  };

  const HandleSave = () => {
    const newQuestios = questionnaire
      .concat([
        {
          ...newQuestion,
          question: `${newQuestion.id}. ${newQuestion.question}`,
        },
      ])
      .slice();
    setQuastionList(newQuestios);

    setnewQuestion({ id: questionnaire.length + 1, options: [], question: "" });
    sethideForm(true);
  };

  if (!hideForm) {
    return (
      <div className="col-span-1 py-2 ">
        <input
          type="text"
          className="px-2 py-1 w-full border-1 border-black"
          placeholder="write you new quastion ..."
          value={newQuestion.question}
          onChange={(e) =>
            setnewQuestion((state) => {
              return { ...state, question: e.target.value };
            })
          }
        />
        <ul className="px-4 py-2">
          {newQuestion.options.map((li) => (
            <li key={li}>
              * {li}{" "}
              <span
                className="text-red-600 cursor-pointer hover:font-bold"
                onClick={() => handlRemove(li)}
              >
                x
              </span>
            </li>
          ))}
          <li>
            {hideInput && (
              <button
                className="px-2 bg-slate-100 text-xs py-1"
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
                className="py-1 px-2"
                placeholder="choice ..."
                onChange={(e) => setnewOption(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && handlAddItem();
                }}
              />
            </li>
          )}
        </ul>

        <div className="flex items-end justify-end gap-8">
          <button
            className="text-purple-600 bg-slate-50 px-5 py-2 rounded-xl text-small"
            onClick={HandleSave}
          >
            Save
          </button>
          <button
            className=" py-2 bg-slate-50 px-5 rounded-xl text-small"
            onClick={() => sethideForm(true)}
          >
            cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-span-1 py-2  w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
        <button className=" text-xl" onClick={() => sethideForm(false)}>
          Add new question ?
        </button>
      </div>
    );
  }
};

export default Index;
