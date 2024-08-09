"use client";
import "../../response/TextResponse/TextResponse.css";
import "./style.css";
import Wrapper from "../../../components/wrapper/wrapper";
import Container from "../../../components/container/container";
import { useEffect, useState } from "react";
import BackToHome from "../../../components/back-to-home/BackToHome";
import H4 from "../../../components/headings/h4";
import axios from "axios";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import Processing from "../../../components/processing/Processing";
import HireExpret from "../../../components/hire-an-expert/HireExpret";
import { TextToHTMLTag } from "../../../utils/TextToHtml";
import ErrorNotification from "../../../components/notification/error/ErrorNotification";
import Report from "../report";
import Link from "next/link";
import PageSpeedModal from "../../../components/modal/pageSpeedInsightsModal";
import IconLaptop from "../../../../public/icons/IconLaptop";
import IconPhone from "../../../../public/icons/IconPhone";
const Index = () => {
  const [streamedResponse, setStreamedResponse] = useState("");
  const STREAMING_DELAY = 40;
  const [showItem, setShowItem] = useState(false);
  const { domain, setError, error, showForm } = useTheme();
  const [processing, setLoader] = useState(false);
  const [speedReport, setSpeedReport] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [analyticalPayload, setAnalyticalPayload] = useState("");
  const [reportLoader, setReportLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const items = [
    {
      name: "desktop",
    },
    {
      name: "mobile",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 1000);
  }, []);
  useEffect(() => {
    if (reportShow) {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex <= reportShow.length) {
          setStreamedResponse(reportShow.substring(0, currentIndex));
          currentIndex = currentIndex + 9;
        } else {
          clearInterval(timer);
        }
      }, STREAMING_DELAY);

      return () => clearInterval(timer);
    }
  }, [reportShow]);
  const getOption = async (value) => {
    try {
      setSelectedItem(value);
      setSpeedReport(false);
      setLoader({
        message: "Analysing your website...",
      });
      const do_main = domain || localStorage.getItem("domain");
      const res = await axios
        .post("https://seogenieai.com/api/pagespeed", {
          url: do_main.includes("https") ? do_main : "https://" + do_main,
          type: value.toLowerCase(),
        })
        .then(async (response) => {
          setLoader({
            message: "Analyzing Data",
          });
          setLoader(false);
          setSpeedReport(response.data?.pageInsights);
          setAnalyticalPayload(response.data?.report);
        })
        .catch(function (error) {
          setError({
            status: true,
            message: "Something Went Wrong! Try again later.",
          });
        });
    } catch (error) {
      setError({
        status: true,
        message: "Something Went Wrong! Try again later.",
      });
    }
  };
  const viewReport = async () => {
    try {
      setReportLoader(true);
      const url = `https://seogenieai.com/api/chat`;
      const streamResponse = await axios
        .post(url, {
          pageSpeedInsights: true,
          userPrompt: analyticalPayload,
        })
        .then(async (response) => {
          setReportLoader(false);
          if (response.data.includes("body")) {
            let data = response.data.split("<body>");
            setReportShow(data[1]);
          } else if (
            !response.data.includes("<html>") &&
            !response.data.includes("<body>") &&
            !response.data.includes("```html")
          ) {
            let data = TextToHTMLTag(response.data);
            setReportShow(data);
            setReportLoader(false);
          } else {
            setReportShow(response.data);
            setReportLoader(false);
          }
        })
        .catch((error) => {
          setError({
            status: true,
            message: "Something Went Wrong! Try again later.",
          });
        });
    } catch (error) {}
  };

  useEffect(() => {
    getOption("desktop");
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const stickyThreshold = 200; // Adjust this value as needed
      if (window.scrollY > stickyThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
      {processing && !speedReport && (
        <Wrapper className="min-h-[calc(100vh-119px)] flex items-center justify-center">
          <Processing heading={processing?.message} />
        </Wrapper>
      )}
      {reportLoader && (
        <div className="absolute top-[50%] z-50 left-0 right-0 flex items-center justify-center">
          <Processing heading={processing?.message} />
        </div>
      )}
      {speedReport && (
        <Wrapper
          className={`${
            showItem
              ? " translate-x-0 opacity-100"
              : " translate-x-full opacity-0 "
          } duration-300 flex justify-between items-center mb-6`}
        >
          <BackToHome />
          <button
            type="button"
            className="bounceBtn pt-[7px] pb-2 px-[21px] text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100 transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white hover:bg-transparent hover:text-white"
            onClick={viewReport}
          >
            View AI Report
          </button>
        </Wrapper>
      )}
      {speedReport && (
        <Wrapper
          className={`flex justify-center items-center mb-6 transition-all duration-300 ${
            isSticky ? "fixed top-0 left-0 w-full bg-white shadow-md z-50" : ""
          }`}
        >
          {items &&
            items.map((item, i) => (
              <div
                key={i}
                className={`flex row gap-2 px-[31px] py-[18px] relative  group items-center ${
                  selectedItem == item.name
                    ? "bg-dark-100"
                    : "hover:bg-slate-300"
                }`}
              >
                {item.name == "desktop" ? (
                  <IconLaptop
                    className={`w-8 h-8 ${
                      selectedItem == item.name ? "fill-white" : "fill-dark-100"
                    }`}
                  />
                ) : (
                  <IconPhone
                    className={`w-8 h-8 ${
                      selectedItem == item.name ? "fill-white" : "fill-dark-100"
                    }`}
                  />
                )}
                <H4
                  className={`text-dark-100 capitalize ${
                    selectedItem == item.name ? "text-white" : "text-dark-100"
                  }`}
                >
                  {item.name}
                </H4>
                <button
                  onClick={() => getOption(item.name)}
                  className="absolute top-0 left-0 w-full h-full"
                ></button>
              </div>
            ))}
        </Wrapper>
      )}
      {speedReport && (
        <div
          className={`mb-8 overflow-auto ${
            showForm || reportShow || reportLoader ? "opacity-25" : ""
          }`}
        >
          <Report data={speedReport} />
        </div>
      )}
      <HireExpret />
      {reportShow && (
        <div className="absolute top-[15%] left-0 right-0 z-50 w-[100%] items-center px-[16px] justify-center flex ">
          <PageSpeedModal
            props={{ report: reportShow, close: setReportShow }}
          />
        </div>
      )}
      {error && (
        <ErrorNotification active={error?.status} message={error?.message} />
      )}
    </Container>
  );
};

export default Index;
