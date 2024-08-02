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
import PageReportTable from '../pageReportTable'
import MostPopular from '../mostPopular'
import TopFivePages from "../TopFivePages";
import BackToHome from "../../../components/back-to-home/BackToHome";
import HireExpret from "../../../components/hire-an-expert/HireExpret";
const Index = () => {
  const router = useRouter();
  const { googleResponse, dataOption } = useTheme();
  const [newUserGroupingValues, setNewUserGroupingValues] = useState({
    direct: 0,
    search: 0,
    social: 0,
    referral: 0,
    paid: 0,
  });
  const [sessionGroupingValues, setSessionGroupingValues] = useState(false);
  const [countryWiseUsers, setCountryWiseUsers] = useState(false);
  const [titleWiseVisitCountValues,setTitleWiseVisitCountValues] = useState(false)
  const [pageReportPerPageCountValues, setPageReportPerPageCountValues] = useState(false);  
  const [counrtyWiseVisitCountValues, setCounrtyWiseVisitCountValues] = useState(false);
  const [snapshotHeaderValues, setSnapshotHeaderValues] = useState({
    activeUsers: 0,
    averageEngagementTime: "0m 00s",
    newUsers: 0,
    totalRevenue: "$0.00",
  });

  useEffect(() => {
    if (googleResponse) {
      setCountryWiseUsers(googleResponse?.countryWiseUsers);
      setTitleWiseVisitCountValues(googleResponse?.titleWiseVisitCountValues)
      setPageReportPerPageCountValues(googleResponse?.pageReportPerPageCountValues)
      setCounrtyWiseVisitCountValues(googleResponse?.counrtyWiseVisitCountValues)
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
    } else {
        router.push("/");
    }
  }, [googleResponse]);


  return (
    <Wrapper>
      <Container>
      <BackToHome heading='Back to options' link='/options'/>
        <Wrapper>    
          {dataOption?.name &&     
          <h1 className="text-4xl max-md-tab:text-2xl font-semibold tracking-normal text-dark-100 mb-6">{dataOption?.name} 
          {dataOption?.domain &&   <a href={dataOption?.domain}><span className="font-bold">({dataOption?.domain})</span></a>}
            </h1>
}
        </Wrapper>
        <Wrapper>
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
          <NewUserGroupingChart newUserGroupingValues={newUserGroupingValues} />
          <SessionGrouping
            sessionGroupingValues={sessionGroupingValues}
            heading="What are your top campaigns?"
            keyHead='Session primary channel group'
            valueHead='Sessions'
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
            keyHead='Country'
            valueHead='Users'
          />

        </Wrapper>
        <h2 className="text-2xl font-semibold text-dark-100 my-2 mt-6">
          Data by Pages
        </h2>
        <Wrapper>
       <PageReportTable values={pageReportPerPageCountValues} />
       <Wrapper className="flex gap-4 justify-between  mb-16 max-md-tab:flex-col">
        <TopFivePages values={titleWiseVisitCountValues} />
       <MostPopular values={titleWiseVisitCountValues} keyHead='Page Title' valueHead='Users' heading='Most Visited Pages'  />
       </Wrapper>
        </Wrapper>
        </Wrapper>
      </Container>
      <HireExpret />
    </Wrapper>
  );
};

export default Index;
