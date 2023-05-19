import React from "react";

type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
};
const Index = ({ setText }: Props) => {
  return (
    <div className="w-full flex-1  border-1 flex flex-col gap-3">
      <div className="py-3 px-4 ">Step 1 : Google Script configuration</div>
      <div className="flex-1 border-2 w-full "></div>
      <div className="h-[50px]  w-full flex items-center justify-end ">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className="rounded-md border-2 border-gray-300 py-2 px-5 w-full"
          placeholder="put the API here ... "
        />
      </div>
    </div>
  );
};

export default Index;
