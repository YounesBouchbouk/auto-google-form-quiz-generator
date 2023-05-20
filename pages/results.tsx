import { MainLayout } from "@/layout/Main";
import React, { ReactElement } from "react";
import GeneratedFormsTable from "@/components/Home/MainComponent/Result/generatedQuastion/Table";

const Results = () => {
  return <GeneratedFormsTable />;
};

export default Results;

Results.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
