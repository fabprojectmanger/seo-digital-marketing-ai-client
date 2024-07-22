import React from "react";
import Wrapper from "../wrapper/wrapper";
import H4 from "../headings/h4";
const Processing = () => {
  return (
    <Wrapper className="">
      <div className={`flex space-x-2 justify-center items-center`}>
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce"></div>
      </div>
      <H4 className={`text-center !text-2xl uppercase text-dark-100`}>
        PROCESSING Data
      </H4>
    </Wrapper>
  );
};

export default Processing;
