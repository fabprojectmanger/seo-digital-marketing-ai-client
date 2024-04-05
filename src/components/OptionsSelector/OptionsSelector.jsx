import "./OptionsSelector.css";
import { useState, useEffect, useRef } from "react";
import useTimeout from "../../hooks/useTimeout.jsx";
import { useSEOContext } from "../../context/SEOContext";
import { useNavigate } from "react-router-dom";
import Axios from "../../helpers/axios.js";

const OPTIONS = [
  { id: 0, value: "One day analysis.", oneDayAgo: true },
  { id: 1, value: "One week analysis.", oneWeekAgo: true },
  { id: 2, value: "One month analysis.", oneMonthAgo: true },
];

const OptionsSelector = () => {
  let { domainName, setIsInputDisabled, setIsTypingLoaderEnabled, setGoogleResponse } =
    useSEOContext();

  const [categoryIndexToShow, setCategoryIndexToShow] = useState(0);
  const [animatedCategoryIndexes, setAnimatedCategoryIndexes] = useState([]);

  const popup = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setIsInputDisabled(true);

    const receiveMessage = (event) => {
      if (event.origin === Axios.BASE_SERVER_URL && event.data.includes("successful-auth")) {
        console.log("Received message:", event);
        console.log("Authentication Successful.");
        // DELIMITER SET ON THE SERVER  SIDE TO AVOID CONFUSION
        let response = event.data.split("/delimiter");
        response = JSON.parse(response[1]);
        setGoogleResponse(response);
        popup.current.close();
        navigate("/response", { state: { domainName, googleResponse: response } });
      }
    };

    window.addEventListener("message", receiveMessage);

    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  // Animation may glitch depending on the following delay and delay in the css
  const DELAY_FOR_OPTIONS_SLIDE_IN = 300;

  useTimeout(updateCategoryIndexes, DELAY_FOR_OPTIONS_SLIDE_IN, [
    categoryIndexToShow,
    setIsTypingLoaderEnabled,
  ]);

  useTimeout(
    () => {
      const index = categoryIndexToShow - 1;
      if (!animatedCategoryIndexes.includes(index) && categoryIndexToShow) {
        setAnimatedCategoryIndexes((prevIndexes) => [...prevIndexes, index]);
      }
    },
    DELAY_FOR_OPTIONS_SLIDE_IN - 200,
    [categoryIndexToShow]
  );

  function updateCategoryIndexes() {
    if (categoryIndexToShow <= OPTIONS.length) {
      setIsTypingLoaderEnabled(true);
      setCategoryIndexToShow((prevIndex) => prevIndex + 1);
      if (categoryIndexToShow >= OPTIONS.length) {
        setIsTypingLoaderEnabled(false);
      }
    }
  }

  const handleOptionSelection = async (selectedOptionIndex) => {
    setIsTypingLoaderEnabled(true);
    const selectedIndexValue = OPTIONS.find((o) => o.id === selectedOptionIndex);
    try {
      // Make the API call
      const response = await Axios.post("/api/store-option", {
        option: { ...selectedIndexValue, domain: domainName },
      });

      // Check if the response status is 200
      if (response.status === 200) {
        // Open a popup
        popup.current = window.open(
          Axios.BASE_SERVER_URL,
          "Google Auth",
          `width=600,height=600, top=${(window.screen.height - 600) / 2}, 
          left=${
            (window.screen.width - 600) / 2
          }`
        );

        // Show loader or message in the popup window
        // if (popup.current) {
        //   popup.current.document.write(
        //     '<div style="text-align:center;margin-top:50px;">Please wait while we authenticate you...</div>'
        //   );
        // }

        // Check if the popup.current is closed or blocked by the browser
        const checkPopupClosed = setInterval(() => {
          if (!popup.current || popup.current.closed || popup.current.closed === undefined) {
            clearInterval(checkPopupClosed);
            setIsTypingLoaderEnabled(false);
            console.log("Popup closed or blocked by the browser");
          }
        }, 1000);
      } else {
        console.error("Received non-200 status from API:", response.status);
        setIsTypingLoaderEnabled(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsTypingLoaderEnabled(false);
    }
  };

  return (
    <div className="seo__options">
      {OPTIONS.slice(0, categoryIndexToShow).map((option, index) => (
        <div
          className={`seo-option ${
            categoryIndexToShow >= index && !animatedCategoryIndexes.includes(index) ? "show" : ""
          }${animatedCategoryIndexes.includes(index) ? "animated" : ""}`}
          onClick={() => handleOptionSelection(index)}
          key={index}
        >
          {option.value}
        </div>
      ))}
    </div>
  );
};

export default OptionsSelector;
