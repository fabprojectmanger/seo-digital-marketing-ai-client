import { useEffect, useState } from "react";
import "./DomainInput.css";
import { FaArrowUp } from "react-icons/fa";
import { useSEOContext } from "../../context/SEOContext";
import TypingLoader from "../TypingLoader/TypingLoader";
import { useNavigate } from "react-router-dom";

const QueryInput = () => {
  const { domainName, setDomainName, isInputDisabled, isTypingLoaderEnabled } =
    useSEOContext();

  const [placeholderText, setPlaceholderText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    isInputDisabled
      ? setPlaceholderText("Generating a response...")
      : setPlaceholderText("Enter the domain of the website...");
  }, [isInputDisabled]);

  const handleSendPromptButton = () => {
    if (isInputDisabled) return;
    if ((!domainName && !domainName.trim()) || !isValidDomainString(domainName)) {
      // TODO:show error if it's incorrect domain
      return alert("invalid domain");
    }
    setDomainName("");
    navigate("/options", { state: { domainName } });
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
          value={domainName}
          disabled={isInputDisabled}
          onChange={(e) => setDomainName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSendPromptButton();
          }}
          placeholder={placeholderText}
        />
        <div
          className={`seo__domain-button 
          ${domainName ? "seo__domain-button--white " : ""} 
          ${isInputDisabled ? "seo__domain-button--disabled" : ""}
          `}
          onClick={handleSendPromptButton}
        >
          <FaArrowUp />
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
