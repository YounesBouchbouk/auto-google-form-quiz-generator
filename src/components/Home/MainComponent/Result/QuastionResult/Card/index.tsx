import React, { useState } from "react";
import { QuastionListType } from "../..";

type Props = {
  question: QuastionListType;
  setQuastionList: React.Dispatch<React.SetStateAction<QuastionListType[]>>;
};

const Index = ({ question, setQuastionList }: Props) => {
  const [newOption, setnewOption] = useState("");
  const [hideInput, setHideInput] = useState(true);

  const handlAddItem = () => {
    setQuastionList((state) =>
      state.map((qst: QuastionListType) => {
        if (qst.id === question.id) {
          const newOptions = qst.options;
          return {
            ...qst,
            options: newOptions.concat([newOption]),
          };
        } else {
          return qst;
        }
      })
    );

    setnewOption("");
    setHideInput(true);
  };

  const handlRemoveItem = (value: string) => {
    setQuastionList((state) =>
      state.map((qst: QuastionListType) => {
        if (qst.id === question.id) {
          const options = qst.options.filter((it) => it !== value);
          return {
            ...qst,
            options,
          };
        } else {
          return qst;
        }
      })
    );
  };

  const handlRemove = () => {
    setQuastionList((state) =>
      state.filter((qst: QuastionListType) => qst.id !== question.id)
    );
  };

  return (
    <div className="col-span-1 py-2 ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">{question.question}</h2>

        <p
          className=" text-red-600 cursor-pointer hover:font-bold"
          onClick={handlRemove}
        >
          delete
        </p>
      </div>

      <ul className="px-4 py-2">
        {question.options.map((li) => (
          <li key={li}>
            * {li}{" "}
            <span
              className="text-red-600 cursor-pointer hover:font-bold"
              onClick={() => handlRemoveItem(li)}
            >
              x
            </span>
          </li>
        ))}
        <li>
          {hideInput && (
            <button
              className="px-2 bg-slate-100"
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
    </div>
  );
};

export default Index;
