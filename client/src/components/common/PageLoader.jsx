import React from "react";
import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full py-12">
      <Spinner size={40} />
    </div>
  );
};

export default PageLoader;
