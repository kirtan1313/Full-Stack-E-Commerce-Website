import React from "react";
import "./loading.css";

const LoadingAnimation = () => {
  return (
    <div className="loading flex justify-center items-center gap-3 w-[100px] h-[100px]">
      <span className="w-[4px] h-[50px] bg-[#4c86f9]"></span>
      <span className="w-[4px] h-[50px] bg-[#4c86f9]"></span>
      <span className="w-[4px] h-[50px] bg-[#4c86f9]"></span>
      <span className="w-[4px] h-[50px] bg-[#4c86f9]"></span>
      <span className="w-[4px] h-[50px] bg-[#4c86f9]"></span>
    </div>
  );
};

export default LoadingAnimation;
