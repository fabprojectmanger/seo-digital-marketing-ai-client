"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import Wrapper from "../../components/wrapper/wrapper";

const StreamResponse = ({ paragraph, className }) => {
  let { isStreamingResponse, setIsStreamingResponse, setIsTypingLoaderEnabled } = useTheme();
  const [streamedResponse, setStreamedResponse] = useState("");
  const STREAMING_DELAY = 30;
  useEffect(() => {
    if (paragraph) {
      setIsTypingLoaderEnabled(true);

      let currentIndex = 7;
      const timer = setInterval(() => {
        if (currentIndex <= paragraph.length) {
          setStreamedResponse(paragraph.substring(0, currentIndex));
          currentIndex = currentIndex + 4;
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
  <Wrapper className='bg-white p-8 rounded-2xl max-h-[70vh] overflow-auto'>
  <div className={`${className || ''} text-base text-black font-medium leading-7 htmlIncluded`} dangerouslySetInnerHTML={{ __html: streamedResponse }} />
  </Wrapper>
  </>;
};

export default StreamResponse;
