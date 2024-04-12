import React, { useState, useEffect } from "react";
import { useSEOContext } from "../../context/SEOContext";

const StreamResponse = ({ paragraph }) => {
  let { isStreamingResponse, setIsStreamingResponse, setIsTypingLoaderEnabled } = useSEOContext();
  const [streamedResponse, setStreamedResponse] = useState("");

  const STREAMING_DELAY = 30;

  useEffect(() => {
    if (paragraph) {
      setIsTypingLoaderEnabled(true);

      let currentIndex = 0;
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

  return <div dangerouslySetInnerHTML={{ __html: streamedResponse }} />;
};

export default StreamResponse;
