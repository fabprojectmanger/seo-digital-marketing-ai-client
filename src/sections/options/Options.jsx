"use client";
import React, { useEffect, useState } from "react";
import { DOMAIN_OPTIONS } from "../../assets/data/db";
import Wrapper from "../../components/wrapper/wrapper";
import H4 from "../../components/headings/h4";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Container from "../../components/container/container";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import { formatDate } from "../../utils/date";
import { useRouter } from "next/navigation";
import IconsArrowForward from "../../../public/icons/IconsArrowForward";
import Text from "../../components/text/text";
import ErrorNotification from "../../components/notification/error/ErrorNotification";
const Options = () => {
  const router = useRouter();
  const {
    setUserLoggedIn,
    googleEmail,
    setGoogleEmail,
    domain,
    error,
    setError,
    setGoogleResponse,
  } = useTheme();
  const [optionSelected, setOptionSelected] = useState("");
  const [loader, setLoader] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [compareRange, setCompareRange] = useState(false);
  const [dateSelectionRange, setDateSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 1000);
  }, []);
  useEffect(() => {
    if (optionSelected) {
        localStorage.setItem("selected_option", JSON.stringify(optionSelected));
    }
  }, [optionSelected]);

  const getOption = (selectedIndex) => {
    const index = selectedIndex === 999 ? 3 : selectedIndex;
    const option = DOMAIN_OPTIONS[index];
    option.domain = domain;
    if (googleEmail) {
      if (selectedIndex === 999) {
        setOptionSelected({ ...option });
        setCompareRange(true);
      }   
      if (selectedIndex === 3) {
        googleAnaltyics();
      }
      if (selectedIndex !== 3 &&  selectedIndex !== 999) {
        setOptionSelected({ ...option });
        setCompareRange(false);
        googleAnaltyics();
      }
    } else {
      login();
    }
  };

  const handleDateRangeChange = (ranges) => {
    setDateSelectionRange(ranges.selection);
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
  const googleAnaltyics = async (email) => {
    setLoader({
      active: true,
    });
    setTimeout(() => {
      setLoader({
        active: true,
        animate: true,
      });
    }, 100);

    try {
      setTimeout(async () => {        
        const option = JSON.parse(localStorage.getItem("selected_option"));
        option.domain = localStorage.getItem("domain");
        const res = await axios.post(
          "https://seogenieai.com/api/google/analytics-report",
          {
            option: option,
            email: email?email:googleEmail
          }
        );
        if (res) {
          console.log("res", res);
          setGoogleResponse(res.data.report);
          if (res?.data?.success) {
            router.push("/response");
          } else {
            if (res?.data?.message === "Failed to validate the tokens.") {
              setError({
                active: true,
                message: "Your token is expired.",
              });
            } else {
              setError({
                active: true,
                message: "Somthing went wrong! Try again later.",
              });
            }
          }

          setLoader(false);
        }
      }, 2000);
    } catch (error) {
      setLoader(false);
      setError({
        active: true,
        message: "Please add a valid domain.",
      });
      console.log(error);
    }
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      console.log(tokenResponse, "&&&&&&&&");
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      console.log(tokenResponse, userInfo);
      const result = userInfo.data;

      const submitData = {
        email: result.email,
        googleToken: tokenResponse,
      };
      try {
        const res = await axios.post("/apis/auth", {
          ...submitData,
        });
        console.log(res, "");
        if (res.status === 200) {
          setGoogleEmail(result.email);
          setUserLoggedIn(true);
          googleAnaltyics(result.email);
        } else {
          setError({
            active: true,
            message: "Oops! Something is wrong. Try again later.",
          });
        }
      } catch (error) {
        setError({
          active: true,
          message: "Oops! Something is wrong. Try again later.",
        });
      }
    },
  });
  return (
    <Container>
      {!loader && (
        <Wrapper className="space-y-4 max-w-[340px]">
          {DOMAIN_OPTIONS.map((item, i) => (
            <div
              style={{ transitionDelay: i + "00ms" }}
              key={i}
              className={`${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 px-[31px] py-[18px] border-2 border-black border-opacity-30 relative rounded-[10px] hover:bg-dark-100 group transition-all `}
            >
              <H4 className="text-dark-100 group-hover:text-white transition-all duration-300">
                {item.name}
              </H4>

              <button
                onClick={() => getOption(i === 3 ? 999 : i)}
                className="absolute top-0 left-0 w-full h-full"
              ></button>
            </div>
          ))}
          {compareRange && (
            <DateRangePicker
              ranges={[dateSelectionRange]}
              onChange={handleDateRangeChange}
              minDate={twoMonthsAgo}
              maxDate={new Date()}
            />
          )}
          {compareRange && (
            <button
              onClick={() => getOption(3)}
              className="w-[42px] h-[42px] rounded-[10px] bg-dark-100 flex justify-center items-center"
            >
              <IconsArrowForward />
            </button>
          )}
        </Wrapper>
      )}
      {loader.active && (
        <Wrapper
          className={`h-[calc(100vh-250px)] flex items-center justify-center`}
        >
          <Wrapper>
            <div
              class={`${
                loader.animate
                  ? " translate-y-0 opacity-100"
                  : " translate-y-4 opacity-0"
              } transition-all duration-300 flex space-x-2 justify-center items-center`}
            >
              <span class="sr-only">Loading...</span>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce"></div>
            </div>
            <H4
              className={`text-center !text-2xl ${
                loader.animate
                  ? " translate-y-0 opacity-100"
                  : " translate-y-4 opacity-0"
              } duration-300 transition-all delay-150`}
            >
              PROCESSING
            </H4>
            <Text
              className={`text-center !text-xl max-w-[240px] mx-auto ${
                loader.animate
                  ? " translate-y-0 opacity-100"
                  : " translate-y-4 opacity-0"
              } transition-all duration-300 delay-300`}
            >
              Please wait while we set things up for you!
            </Text>
          </Wrapper>
        </Wrapper>
      )}
      {error?.active && (
        <ErrorNotification active={error?.active} message={error?.message} />
      )}
    </Container>
  );
};

export default Options;