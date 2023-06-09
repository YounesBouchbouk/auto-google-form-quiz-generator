import Head from "next/head";
// import { Inter } from "next/font/google";
import { ReactElement } from "react";
import { MainLayout } from "@/layout/Main";
// import Title from "@components/Home/Title";
import MainComponent from "@components/Home/MainComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>AUTO-POWER</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col mt-3 h-full  justify-start items-center w-full ">
        <MainComponent />
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
