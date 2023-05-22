import React from "react";
import Recorder from "./Record-kit";
import Result from "./Result";
import MoreInfo from "./MoreInfo";

const Index = () => {
  return (
    <>
      <div className="container">
        <Recorder />
        <MoreInfo />
        <Result />
      </div>
    </>
  );
};

export default Index;
