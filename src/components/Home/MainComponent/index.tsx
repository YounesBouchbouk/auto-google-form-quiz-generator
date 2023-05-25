/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Recorder from "./Record-kit";
import Result from "./Result";
import MoreInfo from "./MoreInfo";
import useStore from "@/components/store/useStore";
import GeneratedFormsTable from "@/components/Home/MainComponent/Result/generatedQuastion/Table";
import NewFormAlert from "@components/Home/MainComponent/NewFormAlert";
const Index = () => {
  const step = useStore((state) => state.globalStep);

  const ToRander = () => {
    switch (step) {
      case 1:
        return <Recorder />;
      case 2:
        return <MoreInfo />;
      case 3:
        return <Result />;
      case 4:
        return <NewFormAlert />;
      case 5:
        return <GeneratedFormsTable />;

      default:
    }
  };

  return (
    <div className="w-full ">
      {/* <Recorder /> */}
      {/* <MoreInfo /> */}
      {/* <Result /> */}

      {ToRander()}
    </div>
  );
};

export default Index;
