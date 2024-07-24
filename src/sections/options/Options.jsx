"use client";
import Cookies from "js-cookie";
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
import Link from "next/link";
import BackToHome from '../../components/back-to-home/BackToHome';
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
    setUserName,
  } = useTheme();
  const [optionSelected, setOptionSelected] = useState("");
  const [loader, setLoader] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [compareRange, setCompareRange] = useState(false);
  const [googleError, setGoogleError] = useState(false);
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
      if (selectedIndex !== 3 && selectedIndex !== 999) {
        setOptionSelected({ ...option });
        setCompareRange(false);
        googleAnaltyics();
      }
    } else {
      login();
      if (selectedIndex === 999) {
        setOptionSelected({ ...option });
        setCompareRange(true);
      }
      if (selectedIndex !== 3 && selectedIndex !== 999) {
        setOptionSelected({ ...option });
        setCompareRange(false);
      }
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
        const res = await axios
          .post("https://seogenieai.com/api/google/analytics-report", {
            option: option,
            email: email ? email : googleEmail,
          })
          .catch(function (error) {
            setLoader(false);
            console.log(error);
            setGoogleError(true);
          });
        if (res) {
          setGoogleResponse(res.data.report);
          if (res?.data?.success) {
            if (res?.data?.report?.noMatchFoundForDomain) {
              setError({
                active: true,
                message:
                  "The domain is not associated with this email address.",
              });
            } else {
              router.push("/domain-analysis");
            }
          } else {
            if (res?.data?.message === "Failed to validate the tokens.") {
              setError({
                active: true,
                message: "Your token is expired.",
              });
              setGoogleEmail("");
              Cookies.remove("google_email");
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

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      const result = userInfo.data;
      setUserName(userInfo.data?.name);
      const submitData = {
        email: result.email,
        googleToken: tokenResponse,
      };
      try {
        const res = await axios.post("/apis/auth", {
          ...submitData,
        });

        if (res.status === 200) {
          setGoogleEmail(result.email);
          setUserLoggedIn(true);
          if (!optionSelected?.compareDates) {
            googleAnaltyics(result.email);
          }
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
    scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics",
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  });
  return (
    <Container>
      {!loader && !googleError && (
        <Wrapper className="space-y-4 max-w-[340px]">
    <Wrapper className={`${
      showItem
        ? " translate-x-0 opacity-100"
        : " translate-x-full opacity-0 "
    } duration-300`}><BackToHome /></Wrapper> 
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
      {googleError && (
        <Wrapper
          className={`h-[calc(100vh-250px)] flex items-center justify-center`}
        >
          <Wrapper className="flex flex-col items-center gap-1 w-full">
            <Wrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="64px"
                viewBox="0 -960 960 960"
                width="64px"
                fill="#EA3323"
              >
                <path d="M479.98-280q14.02 0 23.52-9.48t9.5-23.5q0-14.02-9.48-23.52t-23.5-9.5q-14.02 0-23.52 9.48t-9.5 23.5q0 14.02 9.48 23.52t23.5 9.5ZM453-433h60v-253h-60v253Zm27.27 353q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
              </svg>
            </Wrapper>
            <Text
              className={`text-center !text-2xl max-w-[340px] mx-auto transition-all duration-300 delay-300`}
            >
              Your Google ID is not intergrated with Analytics ID.
            </Text>
            <Link
              href="/"
              className={`text-base uppercase font-semibold inline-block mt-6 ${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300`}
            >
              ← Back to home
            </Link>
          </Wrapper>
        </Wrapper>
      )}
      {loader.active && (
        <Wrapper
          className={`h-[calc(100vh-250px)] flex items-center justify-center`}
        >
          <Wrapper>
            <div
              className={`${
                loader.animate
                  ? " translate-y-0 opacity-100"
                  : " translate-y-4 opacity-0"
              } transition-all duration-300 flex space-x-2 justify-center items-center`}
            >
              <span className="sr-only">Loading...</span>
              <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-4 w-4 bg-dark-100 rounded-full animate-bounce"></div>
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
