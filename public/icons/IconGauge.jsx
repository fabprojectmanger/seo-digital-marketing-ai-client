"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../../src/components/wrapper/wrapper";

const IconGauge = ({ className, gap }) => {
  const [circleFill, setCircleFill] = useState("#f33");
  useEffect(() => {
    if (gap >= 90 && gap <= 100) {
      setCircleFill("#0c6");
    } else if (gap >= 50 && gap <= 89) {
      setCircleFill("#fa3");
    } else if (gap >= 0 && gap <= 49) {
      setCircleFill("#f33");
    }
  }, [gap]);
  return (
    <Wrapper className={"relative " + className}>
      <span
        className=" text-5xl block leading-none font-semibold"
        style={{ color: circleFill }}
        dangerouslySetInnerHTML={{
          __html: gap,
        }}
      ></span>
    </Wrapper>
  );
};

export default IconGauge;
