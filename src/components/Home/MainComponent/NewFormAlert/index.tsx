/* eslint-disable @typescript-eslint/no-unused-vars */
import useStore from "@/components/store/useStore";
import Link from "next/link";
import React from "react";

const Index = () => {
  const generatedForms = useStore((state) => state.generatedForms);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="py-2 px-4 text-center w-3/4  text-green-500 rounded-lg">
        <p className="text-3xl">A new Form has been generated successfully</p>
      </div>
      <div className="w-full flex items-center justify-center">
        {generatedForms.length >= 1 && (
          <div className="  flex justify-center items-center hover:animate-none cursor-pointer">
            <Link href={generatedForms[generatedForms.length - 1].link}>
              <p className="text-purple-500 text-xl">Go To ? </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
