"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import Wrapper from "../../components/wrapper/wrapper";

const StreamResponse = ({ paragraph, className }) => {
  const htmlRef = useRef();
  let { isStreamingResponse, setIsStreamingResponse, setIsTypingLoaderEnabled } = useTheme();
  const [streamedResponse, setStreamedResponse] = useState("");
  const STREAMING_DELAY = 40;
  useEffect(() => {
    if (paragraph) {
      setIsTypingLoaderEnabled(true);

      let currentIndex = 0;
      console.log(paragraph.length);
      const timer = setInterval(() => {
        if (currentIndex <= paragraph.length) {
          setStreamedResponse(paragraph.substring(0, currentIndex));          
          currentIndex = currentIndex + 9;
          htmlRef.current.scrollTop = currentIndex;
          if (!isStreamingResponse) {
            setIsStreamingResponse(true);
          }
        } else {
          clearInterval(timer);
          setIsStreamingResponse(false);
        }
      }, STREAMING_DELAY);

      setIsTypingLoaderEnabled(false);
      return () => clearInterval(timer);
    }
  }, [paragraph]);

  return <>
  <div ref={htmlRef} className='bg-white p-8 rounded-2xl max-h-[70vh] overflow-auto'>
  <div className={`${className || ''} text-base text-black font-medium leading-7 htmlIncluded`} dangerouslySetInnerHTML={{ __html: streamedResponse }} />
  </div>
  </>;
};

export default StreamResponse;
