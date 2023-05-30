import Link from "next/link";
import React from "react";
import useStore from "../store/useStore";
import { useRouter } from "next/router";
import { EnvSlice } from "../store/envSlice";

const Index = () => {
  const clearApiData = useStore((state) => state.clearApiData);
  const getSavedEnv = useStore((state: EnvSlice) => state.getSavedEnv);
  const clearLocalStorage = useStore(
    (state: EnvSlice) => state.clearLocalStorage
  );

  const route = useRouter();
  const logOut = () => {
    clearApiData();
    clearLocalStorage();

    route.push("/environment");
  };
  return (
    <div className="w-fdivl py-2  bg-white/60 flex justify-center items-center border-b-2 border-black shadow-md  h-[80px]  sticky top-0 left-0 right-0 z-50 ">
      <div className=" text-center py-2 w-[200px]">
        <p className="text-bold text-2xl uppercase">Auto-Quiz</p>
        <p>
          By{" "}
          <span className="text-gray-400 text-xsmall">
            <Link href={"hhtps://www.younesdev.com"}>@YounesDev</Link>
          </span>
        </p>
      </div>

      <div className=" text-center py-2 flex-1 flex items-center justify-end px-5">
        <div className="flex gap-5 items-center justify-between w-3/12">
          <Link href={getSavedEnv() ? "/" : "/environment"}>
            <div className="py-2  text-small w-[100px] bg-slate-100 rounded-md cursor-pointer hover:text-white hover:bg-purple-500 hover:border-1 hover:border-white  hover:shadow-md">
              Home
            </div>
          </Link>

          <Link href={"/results"}>
            <div className="py-2 text-small  w-[100px] bg-slate-100 rounded-md cursor-pointer hover:text-white hover:bg-purple-500 hover:border-1 hover:border-white  hover:shadow-md">
              results
            </div>
          </Link>
          {getSavedEnv() === true ? (
            <div
              onClick={() => logOut()}
              className="py-2 text-xs underline    rounded-md cursor-pointer hover:text-white   hover:shadow-md"
            >
              logOut
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
