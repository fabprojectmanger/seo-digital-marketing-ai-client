"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import SessionGrouping from "../sessionGrouping";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import Wrapper from "../../../components/wrapper/wrapper";
import Container from "../../../components/container/container";
import { useRouter } from "next/navigation";
import NewUserGroupingChart from "../newUserGroupingChart";
import CountryChart from "../countryChart";
import PageReportTable from "../pageReportTable";
import MostPopular from "../mostPopular";
import TopFivePages from "../TopFivePages";
import BackToHome from "../../../components/back-to-home/BackToHome";
import HireExpret from "../../../components/hire-an-expert/HireExpret";
import Link from "next/link";
import PageSpeedInsightsModal from "../../../components/modal/pageSpeedInsightsModal";
import Processing from "../../../components/processing/Processing";
import GoogleConsoleComponent from "../googleConsoleCompoenent";
import LineChart from "../lineChart";
const Index = () => {
  const router = useRouter();
  const { googleResponse, dataOption, showForm, setError } = useTheme();
  const [selectedDates, setSelectedDates] = useState("");
  const [newUserGroupingValues, setNewUserGroupingValues] = useState({
    direct: 0,
    search: 0,
    social: 0,
    referral: 0,
    paid: 0,
  });
  const [sessionGroupingValues, setSessionGroupingValues] = useState(false);
  const [countryWiseUsers, setCountryWiseUsers] = useState(false);
  const [titleWiseVisitCountValues, setTitleWiseVisitCountValues] =
    useState(false);
  const [pageReportPerPageCountValues, setPageReportPerPageCountValues] =
    useState(false);
  const [counrtyWiseVisitCountValues, setCounrtyWiseVisitCountValues] =
    useState(false);
  const [snapshotHeaderValues, setSnapshotHeaderValues] = useState({
    activeUsers: 0,
    averageEngagementTime: "0m 00s",
    newUsers: 0,
    totalRevenue: "$0.00",
  });
  const [reportLoader, setReportLoader] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [googleConsoleSearch,setGoogleConsoleSearch] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDates = localStorage.getItem("selected_option");
      if (storedDates) {
        setSelectedDates(JSON.parse(storedDates));
      }
    }
  }, []);
  useEffect(() => {
    if (showForm || reportShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm,reportShow]);
  useEffect(() => {
    if (googleResponse) {
      console.log(googleResponse, "log inside index.js");
      if (googleResponse.noAnalyticsAccountFound) {
        setError({
          active: true,
          message:
            "You do not have an analytics account associated with the provided email.",
        });
        router.push("/");
      } else {
        setCountryWiseUsers(googleResponse?.countryWiseUsers);
        setTitleWiseVisitCountValues(googleResponse?.titleWiseVisitCountValues);
        setPageReportPerPageCountValues(
          googleResponse?.pageReportPerPageCountValues
        );
        setCounrtyWiseVisitCountValues(
          googleResponse?.counrtyWiseVisitCountValues
        );
        setSessionGroupingValues(googleResponse?.sessionGroupingValues);
        setNewUserGroupingValues({
          direct: googleResponse?.newUserGroupingValues["Direct"] || 0,
          search: googleResponse?.newUserGroupingValues["Organic Search"] || 0,
          social: googleResponse?.newUserGroupingValues["Organic Social"] || 0,
          referral: googleResponse?.newUserGroupingValues["Referral"] || 0,
          paid: googleResponse?.newUserGroupingValues["Paid Search"] || 0,
        });
        setSnapshotHeaderValues({
          activeUsers: googleResponse?.snapshotHeaderValues?.activeUsers || 0,
          averageEngagementTime:
            googleResponse?.snapshotHeaderValues?.averageEngagementTime ||
            "0m 00s",
          newUsers: googleResponse?.snapshotHeaderValues?.newUsers || 0,
          totalRevenue:
            googleResponse?.snapshotHeaderValues?.totalRevenue || "$0.00",
        });
        setGoogleConsoleSearch(googleResponse?.searchConsoleData)
      }
    } else {
      router.push("/");
    }
  }, [googleResponse]);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },[reportShow])
  const viewReport = async () => {
    try {
      setReportLoader(true);
      const url = `http://localhost:1112/chat`;
      const streamResponse = await fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analyticsReport: true,
          userPrompt: {report:googleResponse},
        }),
      });
      if (!streamResponse.ok || !streamResponse.body) {
        throw streamResponse.statusText;
      }
      const reader = streamResponse.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      let answer = "";
      while (loopRunner) {
        setReportLoader(false);
        const { value, done } = await reader.read();
        if (done) {
          return { isStreamed: true, answer };
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        answer = answer + decodedChunk;
        if (answer) {
          // setTryLoader(false);
          setReportShow(answer);
          // setProcessing(false);
          // setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setReportLoader(false);
      return { isStreamed: false };
    }
  };
console.log(googleConsoleSearch,"***********88");

  return (
    <Wrapper>
      <Container>
        <BackToHome heading="Back to options" link="/options" />
        {reportLoader && (
          <div className="absolute top-[50%] z-50 left-0 right-0 flex items-center justify-center">
            <Processing heading={"Report Loading"} />
          </div>
        )}
        <div className="flex w-full justify-end">
        <button
          type="button"
          className="bounceBtn pt-[7px] pb-2 px-[21px] text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100 transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white hover:bg-transparent hover:text-white"
          onClick={viewReport}
          disabled={reportLoader}
        >
          View AI Report
        </button>
        </div>
        <Wrapper>
          {dataOption?.name && (
            <h1 className="text-4xl max-md-tab:text-2xl font-semibold tracking-normal text-dark-100 mb-6">
              {dataOption.value
                ? `Start Date:${selectedDates?.value?.startDate} End Date:${selectedDates?.value?.endDate}`
                : dataOption.name}
              {dataOption?.domain && (
                <Link
                  target="_blank"
                  href={
                    dataOption?.domain.includes("https")
                      ? dataOption?.domain
                      : "https://" + dataOption?.domain
                  }
                >
                  <span className="font-bold">
                    ({dataOption?.domain.toUpperCase()})
                  </span>
                </Link>
              )}
            </h1>
          )}
        </Wrapper>
        <Wrapper className={`${showForm|| reportShow || reportLoader ? "opacity-25" : ""}`}>
          <Wrapper className="flex gap-4 mb-4 max-md-tab:grid">
            <Wrapper className="bg-white rounded-lg flex-1 py-10">
              <span className="block text-center text-base text-dark-100 font-semibold">
                Users
              </span>
              <span className="block text-center text-5xl font-bold text-dark-100">
                {snapshotHeaderValues?.activeUsers}
              </span>
            </Wrapper>
            <Wrapper className="bg-white rounded-lg flex-1 py-10">
              <span className="block text-center text-base text-dark-100 font-semibold">
                New Users
              </span>
              <span className="block text-center text-5xl font-bold text-dark-100">
                {snapshotHeaderValues?.newUsers}
              </span>
            </Wrapper>
            <Wrapper className="bg-white rounded-lg flex-1 py-10">
              <span className="block text-center text-base text-dark-100 font-semibold">
                Average Engagement Time
              </span>
              <span className="block text-center text-5xl font-bold text-dark-100">
                {snapshotHeaderValues?.averageEngagementTime}
              </span>
            </Wrapper>
            <Wrapper className="bg-white rounded-lg flex-1 py-10">
              <span className="block text-center text-base text-dark-100 font-semibold">
                Total Revenue
              </span>
              <span className="block text-center text-5xl font-bold text-dark-100">
                {snapshotHeaderValues?.totalRevenue}
              </span>
            </Wrapper>
          </Wrapper>
          <Wrapper className="flex gap-4 justify-between max-md-tab:flex-col">
            <NewUserGroupingChart
              newUserGroupingValues={newUserGroupingValues}
            />
            <SessionGrouping
              sessionGroupingValues={sessionGroupingValues}
              heading="What are your top campaigns?"
              keyHead="Session primary channel group"
              valueHead="Sessions"
            />
          </Wrapper>
          <h2 className="text-2xl font-semibold text-dark-100 my-2 mt-6">
            Data by Country
          </h2>
          <Wrapper className="flex gap-4 justify-between max-md-tab:flex-col">
            <CountryChart countryWiseUsers={countryWiseUsers} />
            <SessionGrouping
              sessionGroupingValues={countryWiseUsers}
              heading="Users by Country"
              keyHead="Country"
              valueHead="Users"
            />
          </Wrapper>
          <h2 className="text-2xl font-semibold text-dark-100 my-2 mt-6">
            Data by Pages
          </h2>
          <Wrapper>
            <PageReportTable values={pageReportPerPageCountValues} />
            <Wrapper className="flex gap-4 justify-between  mb-16 max-md-tab:flex-col">
              <TopFivePages values={titleWiseVisitCountValues} />
              <MostPopular
                values={titleWiseVisitCountValues}
                keyHead="Page Title"
                valueHead="Users"
                heading="Most Visited Pages"
              />
            </Wrapper>
          </Wrapper>
          {googleConsoleSearch && googleConsoleSearch.query.length>0 && 
          <>
          <h2 className="text-2xl font-semibold text-dark-100 my-2 mt-6">
            Performance
          </h2>
          <Wrapper>
            <GoogleConsoleComponent values={googleConsoleSearch}/>
            <LineChart values={googleConsoleSearch}/>
          </Wrapper>
          </>
          }
        </Wrapper>
      </Container>
      <HireExpret />
      {reportShow && (
        <div className="h-screen absolute top-[50%] -translate-y-[50%] left-0 right-0 z-50 w-[100%] items-center px-[16px] justify-center flex ">
          <PageSpeedInsightsModal
            props={{ report: reportShow, close: setReportShow }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Index;
