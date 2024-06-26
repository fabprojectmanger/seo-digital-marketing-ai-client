import { createContext, useContext, useState, useRef, useEffect } from "react";
import { PRIMARY_OPTIONS } from "../data/options";
import { useLocation } from "react-router-dom";
const SEOContext = createContext();

export const SEOContextProvider = ({ children }) => {
  const [googleEmail, setGoogleEmail] = useState();
  const [promptMessage, setPromptMessage] = useState("");
  const [hasFinalizedPrompt, setHasFinalizedPrompt] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isTypingLoaderEnabled, setIsTypingLoaderEnabled] = useState(false);
  const [googleResponse, setGoogleResponse] = useState();
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const [selectedPrimaryOption, setSelectedPrimaryOption] = useState(PRIMARY_OPTIONS.DOMAIN);
  const restartRequired = useRef(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("selected_option");
    setHasFinalizedPrompt(localStorage.getItem("has_finalized_prompt"));
  }, []);

  useEffect(() => {
    if (location && location.pathname === "/") {
      setHasFinalizedPrompt(false);
    }
  }, [location]);

  useEffect(() => {
    if (hasFinalizedPrompt) {
      localStorage.setItem("has_finalized_prompt", true);
      setIsInputDisabled(true);
    } else {
      localStorage.setItem("has_finalized_prompt", false);
    }
  }, [hasFinalizedPrompt]);

  useEffect(() => {
    googleEmail
      ? localStorage.setItem("google_email", googleEmail)
      : setGoogleEmail(localStorage.getItem("google_email"));
  }, [googleEmail]);

  const contextValues = {
    googleEmail,
    setGoogleEmail,
    promptMessage,
    setPromptMessage,
    aiResponse,
    selectedPrimaryOption,
    setSelectedPrimaryOption,
    setAiResponse,
    isInputDisabled,
    setIsInputDisabled,
    isTypingLoaderEnabled,
    setIsTypingLoaderEnabled,
    googleResponse,
    setGoogleResponse,
    isStreamingResponse,
    setIsStreamingResponse,
    hasFinalizedPrompt,
    setHasFinalizedPrompt,
    restartRequired,
  };
  return <SEOContext.Provider value={contextValues}>{children}</SEOContext.Provider>;
};

export const useSEOContext = () => {
  return useContext(SEOContext);
};
