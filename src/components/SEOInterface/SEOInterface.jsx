import React, { useEffect, useState } from "react";
import "./SEOInterface.css";
import { DomainInput, OptionsSelector, PrimaryOptions, TextResponse } from "../index";
import { useLocation } from "react-router-dom";
import { useSEOContext } from "../../context/SEOContext";

const SEOInterface = () => {
  const location = useLocation();
  const { setGoogleResponse, setPromptMessage } = useSEOContext();
  const [responseArea, setResponseArea] = useState();

  useEffect(() => {
    if (location) {
      const promptMessage = location.state?.promptMessage;
      promptMessage && setPromptMessage(promptMessage);

      if (promptMessage) {
        if (location.pathname === "/options") {
          setResponseArea(<OptionsSelector />);
        }

        if (location.pathname === "/response") {
          const googleResponseState = location.state?.googleResponse;
          googleResponseState && setGoogleResponse(googleResponseState);
          setResponseArea(<TextResponse />);
        }
      }
    }
  }, [location]);

  return (
    <div className="seo__main">
      <div className="seo__container">
        <div className="seo__response-cont">{responseArea}</div>
        <div className="seo__primary-options-cont">
          <PrimaryOptions />
        </div>
        <div className="seo__message-cont">
          <DomainInput />
        </div>

        {/* <div className="seo__footer">
          Made with <span className="seo__footer-heart">♥</span> by Ashish &copy;
          {new Date().getFullYear()}
        </div> */}
      </div>
    </div>
  );
};

export default SEOInterface;
