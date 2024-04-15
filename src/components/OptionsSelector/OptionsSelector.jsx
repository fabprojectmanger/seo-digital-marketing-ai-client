import "./OptionsSelector.css";
import { useState, useEffect, useRef } from "react";
import Axios from "../../helpers/axios.js";
import useTimeout from "../../hooks/useTimeout.jsx";
import { useSEOContext } from "../../context/SEOContext";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { DateRangePicker } from "react-date-range";

// Calculate the new startDate, 2 months ago from now
const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

function formatDate(date) {
  let inputDate = date;

  if (!(date instanceof Date)) {
    inputDate = new Date(date);
  }

  if (isNaN(inputDate)) {
    console.error("Invalid date input");
    return;
  }

  const year = inputDate.getFullYear().toString();
  const month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
  const day = ("0" + inputDate.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

let OPTIONS = [
  { id: 0, name: "One day analysis.", oneDayAgo: true },
  { id: 1, name: "One week analysis.", oneWeekAgo: true },
  { id: 2, name: "One month analysis.", oneMonthAgo: true },
  {
    id: 3,
    name: "Compare dates.",
    value: { startDate: formatDate(new Date()), endDate: formatDate(new Date()) },
    compareDates: true,
  },
];

const OptionsSelector = () => {
  let {
    domainName,
    setIsInputDisabled,
    setIsTypingLoaderEnabled,
    googleResponse,
    googleEmail,
    setGoogleEmail,
    setGoogleResponse,
  } = useSEOContext();

  const [categoryIndexToShow, setCategoryIndexToShow] = useState(OPTIONS.length); // Change it to 0 for options to come one at a time
  const [animatedCategoryIndexes, setAnimatedCategoryIndexes] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [activeOptionIndex, setActiveOptionIndex] = useState();
  const [dateSelectionRange, setDateSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  // const [isNextButtonVisible, setIsNextButtonVisible] = useState(true);
  const [isFetchingReport, setIsFetchingReport] = useState(false);

  const popup = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ optionSelected });
    if (optionSelected) {
      localStorage.setItem("selected_option", JSON.stringify(optionSelected));
      // setIsNextButtonVisible(true);
    }
  }, [optionSelected]);

  useEffect(() => {
    setIsInputDisabled(true);
    if (optionSelected) {
      localStorage.setItem("selected_option", JSON.stringify(optionSelected));
    }

    const receiveMessage = async (event) => {
      if (event.origin === Axios.BASE_SERVER_URL && event.data.includes("successful-auth")) {
        console.log("Authentication Successful.");
        // DELIMITER SET ON THE SERVER  SIDE TO AVOID CONFUSION
        let response = event.data.split("/delimiter");
        response = JSON.parse(response[1]);

        debugger;
        const popupCloseDelay = response?.hasMissingScope ? 3000 : 0;
        setTimeout(() => {
          popup.current.close();
        }, popupCloseDelay);

        if (!response?.hasMissingScope) {
          setGoogleEmail(response.email);
          await getAnalyticsReport(response.email);
        }
      }
    };
    window.addEventListener("message", receiveMessage);

    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  useEffect(() => {
    if (googleResponse && googleResponse?.missingScope) {
      setIsTypingLoaderEnabled(false);
      const timeout = setTimeout(() => {
        popup.current.close();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [googleResponse]);

  // Animation may glitch depending on the following delay and delay in the css
  const DELAY_FOR_OPTIONS_SLIDE_IN = 700;

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

  const getAnalyticsReport = async (email) => {
    // Timeout for waiting it to set the local storage with the selected option first
    setTimeout(async () => {
      try {
        const option = JSON.parse(localStorage.getItem("selected_option"));
        if (!email || !email.trim()) return;
        setIsTypingLoaderEnabled(true);
        // setIsNextButtonVisible(false);
        const response = await Axios.post("/api/google/analytics-report", {
          option,
          email,
        });

        if (response.status === 200 && response.data?.success) {
          setIsTypingLoaderEnabled(false);
          setGoogleResponse(response.data.report);
          navigate("/response", { state: { domainName, googleResponse: response.data.report } });
        } else {
          googleConsentPopup();
          // setIsNextButtonVisible(true);
        }
      } catch (error) {
        console.error(`Failed to get the analytics report: ${error}`);
      }
    }, 1000);
  };

  const handleOptionSelection = async (selectedOptionIndex) => {
    if (isFetchingReport) return;
    setIsFetchingReport(true);
    let selectedIndexValue = OPTIONS.find((o) => o.id === selectedOptionIndex);

    selectedIndexValue?.compareDates ? setIsDatePickerVisible(true) : setIsDatePickerVisible(false);
    setActiveOptionIndex(selectedIndexValue.id);
    setOptionSelected({ ...selectedIndexValue, domain: domainName });

    if (!googleEmail) {
      await googleConsentPopup();
    } else {
      await getAnalyticsReport(googleEmail);
    }
  };

  const googleConsentPopup = async () => {
    // Open a popup
    popup.current = window.open(
      Axios.BASE_SERVER_URL,
      "Google Auth",
      `width=600,height=600, top=${(window.screen.height - 600) / 2}, 
      left=${(window.screen.width - 600) / 2}`
    );

    // Show loader or message in the popup window
    if (popup.current && !popup.current.closed) {
      popup.current.document.title = "Google Authentication";
    }

    // Check if the popup.current is closed or blocked by the browser
    const checkPopupClosed = setInterval(() => {
      if (!popup.current || popup.current.closed || popup.current.closed === undefined) {
        clearInterval(checkPopupClosed);
        setIsTypingLoaderEnabled(false);
        console.log("Popup closed or blocked by the browser");
      }
    }, 1000);
  };

  // const handleProceedButton = async () => {
  //   if (!googleEmail) {
  //     await googleConsentPopup();
  //   } else {
  //     await getAnalyticsReport(googleEmail);
  //   }
  // };

  const handleDateRangeChange = (ranges) => {
    setDateSelectionRange(ranges.selection);
    // console.clear();
    const startDate = formatDate(ranges.selection.startDate);
    const endDate = formatDate(ranges.selection.endDate);
    if (optionSelected?.compareDates) {
      setOptionSelected((prevOptions) => {
        return {
          ...prevOptions,
          value: { startDate, endDate },
        };
      });
    }
  };

  return (
    <div className="seo__options-cont">
      <div className="seo__options">
        {OPTIONS.slice(0, categoryIndexToShow).map((option, index) => (
          <div
            className={`seo-option ${
              activeOptionIndex === index ? "selected" : "" // Apply active class if index matches activeOptionIndex
            } ${
              categoryIndexToShow >= index && !animatedCategoryIndexes.includes(index) ? "show" : ""
            }${animatedCategoryIndexes.includes(index) ? "animated" : ""}`}
            onClick={() => handleOptionSelection(index)}
            key={index}
          >
            {option.name}
          </div>
        ))}
      </div>

      <div
        className={`seo__date-picker-option ${
          isDatePickerVisible ? "seo__date-picker-option--visible" : ""
        }`}
      >
        <DateRangePicker
          ranges={[dateSelectionRange]}
          onChange={handleDateRangeChange}
          minDate={twoMonthsAgo}
          maxDate={new Date()}
        />
      </div>

      {/* When all options are animated and one of them is selected */}
      {/* {optionSelected && categoryIndexToShow - 1 === OPTIONS.length && isNextButtonVisible && (
        <div className="seo__options-next" onClick={handleProceedButton}>
          <FaArrowRight />
        </div>
      )} */}
    </div>
  );
};

export default OptionsSelector;
