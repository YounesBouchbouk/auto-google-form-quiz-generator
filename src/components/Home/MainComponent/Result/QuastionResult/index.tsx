import React from "react";
import Card from "./Card";
import NewQuastionCard from "./NewCard";
import useStore from "@/components/store/useStore";
import { appDataSlice } from "@/components/store/appData";

const Index = () => {
  const questionaire = useStore((state: appDataSlice) => state.questionaire);

  return (
    <div className="w-full ">
      <div className="w-full py-4 container grid grid-cols-3 gap-4 ">
        {questionaire.map((question, index) => (
          <Card question={question} key={index} />
        ))}

        {questionaire.length > 0 && <NewQuastionCard />}
      </div>
    </div>
  );
};

export default Index;
