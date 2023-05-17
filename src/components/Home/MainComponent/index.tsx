import React, { useState } from "react";
import Recorder from "./Record";
import Result from "./Result";
const Index = () => {
  const [note, setNote] = useState<string>("");

  return (
    <>
      <div className="container">
        <Recorder note={note} setNote={setNote} />

        <Result note={note} />
      </div>
    </>
  );
};

export default Index;
