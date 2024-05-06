import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
const SEOContext = createContext();

export const SEOContextProvider = ({ children }) => {
  const [googleEmail, setGoogleEmail] = useState();
  const [domainName, setDomainName] = useState("");
  const [hasFinalizedDomain, setHasFinalizedDomain] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isTypingLoaderEnabled, setIsTypingLoaderEnabled] = useState(false);
  const [googleResponse, setGoogleResponse] = useState();
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const restartRequired = useRef(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("selected_option");
    setHasFinalizedDomain(localStorage.getItem("has_finalized_domain"));
  }, []);

  useEffect(() => {
    if (location && location.pathname === "/") {
      setHasFinalizedDomain(false);
    }
  }, [location]);

  useEffect(() => {
    if (hasFinalizedDomain) {
      localStorage.setItem("has_finalized_domain", true);
      setIsInputDisabled(true);
    } else {
      localStorage.setItem("has_finalized_domain", false);
    }
  }, [hasFinalizedDomain]);

  useEffect(() => {
    googleEmail
      ? localStorage.setItem("google_email", googleEmail)
      : setGoogleEmail(localStorage.getItem("google_email"));
  }, [googleEmail]);

  const contextValues = {
    googleEmail,
    setGoogleEmail,
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
    hasFinalizedDomain,
    setHasFinalizedDomain,
    restartRequired,
  };
  return <SEOContext.Provider value={contextValues}>{children}</SEOContext.Provider>;
};

export const useSEOContext = () => {
  return useContext(SEOContext);
};
