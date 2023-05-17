import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
// import Header from "@components/Header";
export interface IMainLayoutProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: IMainLayoutProps) => {
  //   const getSavedData = useStore((state) => state.getSavedData)
  //   const getSavedEnv = useStore((state) => state.getSavedEnv)
  //   const router = useRouter()
  // const [render, setRender] = useState(true);
  const [render] = useState(true);

  //   useEffect(() => {
  //     getSavedEnv() ? '' : router.push('/environment')
  //     if (window.location.hash.startsWith('#login_')) {
  //       const authToken = window.location.hash.replace('#login_', '')
  //       router.push('/auth/' + authToken)
  //     } else {
  //       getSavedData() ? setRender(true) : router.push('/login')
  //     }
  //   }, [])

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
