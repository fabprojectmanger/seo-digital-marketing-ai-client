"use client";
import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "./ThemeContext";
import Cookies from "js-cookie";
export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [error, setError] = useState(false);
  const [domain, setDomain] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [googleEmail, setGoogleEmail] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [searchEnabled, setSearchEnabled] = useState("");
  const [googleResponse, setGoogleResponse] = useState();
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [isTypingLoaderEnabled, setIsTypingLoaderEnabled] = useState(false);
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const [hasFinalizedPrompt, setHasFinalizedPrompt] = useState(false);
  const [selectedPrimaryOption, setSelectedPrimaryOption] = useState("domain");
  const restartRequired = useRef(false);
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
      ? Cookies.set("google_email", googleEmail, { expires: 1 / 24 })
      : setGoogleEmail(Cookies.get("google_email"));
  }, [googleEmail]);
  useEffect(() => {
    domain
      ? localStorage.setItem("domain", domain)
      : setDomain(localStorage.getItem("domain"));
  }, [domain]);

  const value = {
    error,
    setError,
    domain,
    setDomain,
    userLoggedIn,
    setUserLoggedIn,
    googleEmail,
    googleResponse,
    setGoogleResponse,
    setGoogleEmail,
    isStreamingResponse,
    setIsStreamingResponse,
    setIsTypingLoaderEnabled,
    aiResponse,
    setAiResponse,
    isInputDisabled,
    promptMessage,
    setPromptMessage,
    isTypingLoaderEnabled,
    setHasFinalizedPrompt,
    restartRequired,
    selectedPrimaryOption,
    setSelectedPrimaryOption,
    searchEnabled,
    setSearchEnabled,
    setIsInputDisabled,
    isInputDisabled
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
