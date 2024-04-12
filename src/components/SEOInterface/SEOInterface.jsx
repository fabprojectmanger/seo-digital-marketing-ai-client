import React, { useEffect, useState, useRef } from "react";
import "./SEOInterface.css";
import { DomainInput, OptionsSelector, TextResponse } from "../index";
import { useLocation } from "react-router-dom";
import { useSEOContext } from "../../context/SEOContext";

const SEOInterface = () => {
  const location = useLocation();
  const { setGoogleResponse, setDomainName } = useSEOContext();
  const [responseArea, setResponseArea] = useState();

  useEffect(() => {
    if (location) {
      console.log({ location });

      const domainName = location.state?.domainName;
      domainName && setDomainName(domainName);

      if (domainName) {
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
        <div className="seo__message-cont">
          <DomainInput />
        </div>
        <div className="seo__response-cont">{responseArea}</div>
        <div className="seo__footer">
          Made with <span className="seo__footer-heart">♥</span> by Ashish &copy;
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default SEOInterface;
