"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import Wrapper from "../../components/wrapper/wrapper";
import HireExpret from '../../components/hire-an-expert/HireExpret'
const StreamResponse = ({ paragraph, className }) => {
  const htmlRef = useRef();
  let {showForm } = useTheme();
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);
  return <>
  <HireExpret />
  <div ref={htmlRef} className={`bg-white p-8 rounded-xl max-h-[70vh] overflow-auto ${showForm ?"opacity-25":""}`}>
  <div className={`${className || ''} text-base text-black font-medium leading-7 htmlIncluded`} dangerouslySetInnerHTML={{ __html: paragraph }} />
  </div>
  </>;
};

export default StreamResponse;