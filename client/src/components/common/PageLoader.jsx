import React from "react";
import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[var(--bg-primary)]">
      <Spinner size={40} />
    </div>
  );
};

export default PageLoader;
