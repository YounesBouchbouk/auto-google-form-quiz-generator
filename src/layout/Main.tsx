/* eslint-disable react-hooks/exhaustive-deps */
import { EnvSlice } from "@/components/store/envSlice";
import useStore from "@/components/store/useStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { appDataSlice } from "@/components/store/appData";
// import Title from "@components/Home/Title";

export interface IMainLayoutProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: IMainLayoutProps) => {
  const getSavedEnv = useStore((state: EnvSlice) => state.getSavedEnv);
  const setGeneratedForms = useStore(
    (state: appDataSlice) => state.setGeneratedForms
  );
  const generatedForms = useStore(
    (state: appDataSlice) => state.generatedForms
  );

  const router = useRouter();
  const [render] = useState(true);

  useEffect(() => {
    getSavedEnv() ? "" : router.push("/environment");

    const gnForms = localStorage.getItem("generated_forms");
    gnForms && setGeneratedForms(JSON.parse(gnForms));
  }, []);

  useEffect(() => {
    localStorage.setItem("generated_forms", JSON.stringify(generatedForms));
  }, [generatedForms]);

  return render ? <>{children}</> : <></>;
};
export function MainLayout({ children }: IMainLayoutProps) {
  const appLoading = useStore((state) => state.loading);

  return (
    <Wrapper>
      <Toaster />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="w-3/4 relative min-h-[700px] bg-white rounded-lg p-4 flex flex-col gap-3 items-center justify-center  ">
          <div className="w-full">{children}</div>
          {appLoading && (
            <div className="bg-white/90 top-0 left-0 h-full w-full absolute flex items-center justify-center ">
              <p className="text-black text-small font-bold animate-ping">
                Loading ......
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
