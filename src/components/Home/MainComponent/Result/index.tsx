/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import QuastionResult from "./QuastionResult";
import useStore from "@/components/store/useStore";

export type QuastionListType = {
  question: string;
  options: string[];
  id: number;
};

const Index = () => {
  const incrementStep = useStore((state) => state.incrementStep);

  return (
    <div className="w-full ">
      <div className="px-5">
        <QuastionResult />

        <div
          className="w-full flex items-center justify-end gap-10 "
          onClick={() => incrementStep()}
        >
          <div className="w-[90px]  h-[90px] bg-purple-500 rounded-full shadow-md  flex justify-center items-center hover:animate-none cursor-pointer mr-7 mt-10">
            <p className="text-white text-small">Next {`>>`} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
