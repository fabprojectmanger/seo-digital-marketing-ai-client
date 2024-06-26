import { useEffect, useState } from "react";
import "./DomainInput.css";
import { useSEOContext } from "../../context/SEOContext";
import TypingLoader from "../TypingLoader/TypingLoader";
import { PRIMARY_OPTIONS } from "../../data/options";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

const QueryInput = () => {
  const {
    promptMessage,
    hasFinalizedPrompt,
    setHasFinalizedPrompt,
    setPromptMessage,
    isInputDisabled,
    setIsInputDisabled,
    isTypingLoaderEnabled,
    selectedPrimaryOption,
  } = useSEOContext();

  const [placeholderText, setPlaceholderText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let PRIMARY_PLACEHOLDER;
    if (selectedPrimaryOption === PRIMARY_OPTIONS.DOMAIN) {
      PRIMARY_PLACEHOLDER = "Enter your domain name";
    } else if (selectedPrimaryOption === PRIMARY_OPTIONS.WRITING) {
      PRIMARY_PLACEHOLDER = "Enter your writing topic";
    }

    isInputDisabled
      ? setPlaceholderText("Generating a response...")
      : setPlaceholderText(PRIMARY_PLACEHOLDER);
  }, [isInputDisabled, selectedPrimaryOption]);

  const handleDomainPrompt = () => {
    if (!isValidDomainString(promptMessage)) {
      // TODO: show error if it's an incorrect domain
      alert("Invalid domain");
      return true;
    }

    navigate("/options", { state: { promptMessage } });
    return false;
  };

  const handleContentWritingPrompt = () => {
    navigate("/response", { state: { promptMessage } });
    return false;
  };

  const handleSendPromptButton = () => {
    let alertShown = false;
    if (!promptMessage && !promptMessage.trim()) {
      // TODO: show error if it's an empty prompt message
      alert("Prompt cannot be empty.");
      alertShown(true);
    }
    switch (selectedPrimaryOption) {
      case PRIMARY_OPTIONS.DOMAIN:
        alertShown = handleDomainPrompt();
        break;
      case PRIMARY_OPTIONS.WRITING:
        alertShown = handleContentWritingPrompt();
    }
    if (alertShown) return false;
    setIsInputDisabled(true);
    setHasFinalizedPrompt(true);
    if (hasFinalizedPrompt) {
      navigate("/");
      // TODO: Reset states instead of reloading
      window.location.reload();
    }
  };

  function isValidDomainString(url) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+(\.[a-z]{2,6})(\/\S*)?$/i;
    return pattern.test(url);
  }

  return (
    <div className="seo__domain-cont">
      <div className="seo__domain-loader">{isTypingLoaderEnabled && <TypingLoader />}</div>

      <div className="seo__domain-input-cont">
        <input
          className="seo__domain-input"
          type="text"
          autoFocus
          value={promptMessage}
          disabled={isInputDisabled}
          onChange={(e) => setPromptMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSendPromptButton();
          }}
          placeholder={placeholderText}
        />
        <div
          className={`seo__domain-button 
          ${promptMessage ? "seo__domain-button--white " : ""}
          ${
            hasFinalizedPrompt
              ? "seo__domain-button--restart"
              : isInputDisabled
              ? "seo__domain-button--disabled"
              : ""
          }

          `}
          onClick={handleSendPromptButton}
        >
          {hasFinalizedPrompt ? <VscDebugRestart /> : <FaArrowUp />}
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
