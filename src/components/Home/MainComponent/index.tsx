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
      case 3:
        return <MoreInfo />;
      case 2:
        return <Result />;
      case 4:
        return <NewFormAlert />;
      case 5:
        return <GeneratedFormsTable />;

      default:
        return <Recorder />;
    }
  };

  return <div className="w-full">{ToRander()}</div>;
};

export default Index;
