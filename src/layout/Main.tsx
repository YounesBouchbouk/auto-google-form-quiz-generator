/* eslint-disable react-hooks/exhaustive-deps */
import { EnvSlice } from "@/components/store/envSlice";
import useStore from "@/components/store/useStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { appDataSlice } from "@/components/store/appData";

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
  return (
    <Wrapper>
      <Toaster />
      {/* <div className="min-h-screen w-full flex items-center justify-center bg-gray-100"> */}
      <div className="min-h-screen w-full flex items-center justify-center ">
        <div className="w-3/4 min-h-[700px] bg-white rounded-lg p-4 flex flex-col gap-3  ">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}
