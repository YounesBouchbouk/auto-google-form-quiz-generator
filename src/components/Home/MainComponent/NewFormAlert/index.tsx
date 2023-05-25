/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="py-2 px-4 text-center w-3/4  text-green-500 rounded-lg">
        <p className="text-3xl">A new Form has been generated successfully</p>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-[200px] h-[200px] bg-purple-500 rounded-full shadow-xl animate-spin-slow flex justify-center items-center hover:animate-none cursor-pointer">
          <p className="text-white text-xl">Go To ? </p>
        </div>
      </div>
    </div>
  );
};

export default index;
