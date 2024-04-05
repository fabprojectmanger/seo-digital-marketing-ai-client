import { createContext, useContext, useState, useRef, useEffect } from "react";
const SEOContext = createContext();

export const SEOContextProvider = ({ children }) => {
  const [domainName, setDomainName] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isTypingLoaderEnabled, setIsTypingLoaderEnabled] = useState(false);
  const [googleResponse, setGoogleResponse] = useState();
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const restartRequired = useRef(false);

  useEffect(() => {
    setIsInputDisabled(isStreamingResponse);
    setIsTypingLoaderEnabled(isStreamingResponse);
  }, [isStreamingResponse]);

  const contextValues = {
    domainName,
    setDomainName,
    aiResponse,
    setAiResponse,
    isInputDisabled,
    setIsInputDisabled,
    isTypingLoaderEnabled,
    setIsTypingLoaderEnabled,
    googleResponse,
    setGoogleResponse,
    isStreamingResponse,
    setIsStreamingResponse,
    restartRequired: restartRequired.current,
  };
  return <SEOContext.Provider value={contextValues}>{children}</SEOContext.Provider>;
};

export const useSEOContext = () => {
  return useContext(SEOContext);
};
