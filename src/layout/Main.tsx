/* eslint-disable react-hooks/exhaustive-deps */
import { EnvSlice } from "@/components/store/envSlice";
import useStore from "@/components/store/useStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
export interface IMainLayoutProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: IMainLayoutProps) => {
  const getSavedEnv = useStore((state: EnvSlice) => state.getSavedEnv);
  const router = useRouter();
  const [render] = useState(true);

  useEffect(() => {
    getSavedEnv() ? "" : router.push("/environment");
  }, []);

  return render ? <>{children}</> : <></>;
};
export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <Wrapper>
      <Toaster />

      <div className="flex flex-col h-full overflow-hidden scrollbar-hide top-0 right-0 ">
        {children}
      </div>
    </Wrapper>
  );
}
