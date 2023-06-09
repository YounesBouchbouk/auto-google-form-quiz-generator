import React, { ReactElement, useState } from "react";
import StepTwoURL from "@components/Environment/OpenAIConf";
import StepOneURL from "@components/Environment/ScriptConf";
import { useRouter } from "next/router";
import { MainLayout } from "@/layout/Main";
import { toast } from "react-hot-toast";

const Environment = () => {
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");
  const router = useRouter();
  const handleClickNext = () => {
    if (text == "") {
      toast.error("empty field");
      return;
    }
    if (step === 1) {
      localStorage.setItem("apiURL", text as string);
      setStep((state) => state + 1);
    } else {
      localStorage.setItem("openAPI", text as string);
      router.push("/");
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center  bg-gray-50/60">
      <div className="w-3/4 max-h-[700px] bg-white rounded-lg p-4 flex flex-col gap-3  ">
        {step === 1 ? (
          <StepOneURL setText={setText} />
        ) : (
          <StepTwoURL setText={setText} />
        )}
        <div className="h-[50px]  w-full flex gap-4 items-center justify-end px-5">
          {step > 1 && (
            <button
              disabled={step === 1}
              onClick={() => setStep((state) => state - 1)}
              className="py-2 px-5 w-[200px] bg-blue-200 rounded-md"
            >
              Previeus
            </button>
          )}
          <button
            onClick={() => handleClickNext()}
            className="py-2 px-5 w-[200px] bg-blue-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Environment;

Environment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
