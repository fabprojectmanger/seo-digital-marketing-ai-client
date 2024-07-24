"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import Wrapper from "../../../components/wrapper/wrapper";
import Container from "../../../components/container/container";
import { useRouter } from "next/navigation";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

const Index = () => {
  const router = useRouter();
  const { googleResponse } = useTheme();
  const [newUserGroupingValues, setNewUserGroupingValues] = useState({
    direct: 0,
    search: 0,
    social: 0,
    referral: 0,
    paid: 0,
  }); 
  const [snapshotHeaderValues, setSnapshotHeaderValues] = useState({
    activeUsers: 0,
    averageEngagementTime: '0m 00s',
    newUsers: 0,
    totalRevenue: '$0.00',
  });
  useEffect(() => {
    if (googleResponse) {
      setNewUserGroupingValues({
        direct: googleResponse?.newUserGroupingValues["Direct"] || 0,
        search: googleResponse?.newUserGroupingValues["Organic Search"] || 0,
        social: googleResponse?.newUserGroupingValues["Organic Social"] || 0,
        referral: googleResponse?.newUserGroupingValues["Referral"] || 0,
        paid: googleResponse?.newUserGroupingValues["Paid Search"] || 0,
      });
      setSnapshotHeaderValues(
        {
            activeUsers: googleResponse?.snapshotHeaderValues?.activeUsers || 0,
            averageEngagementTime: googleResponse?.snapshotHeaderValues?.averageEngagementTime || '0m 00s',
            newUsers: googleResponse?.snapshotHeaderValues?.newUsers || 0,
            totalRevenue: googleResponse?.snapshotHeaderValues?.totalRevenue || '$0.00',
          }
      )
    } else {
    //   router.push("/");
    }
  }, [googleResponse]);
  const barOption = {
    xAxis: {
      max: "dataMax",
    },
    yAxis: {
      type: "category",
      data: [
        "Direct",
        "Organic Search",
        "Organic Social",
        "Referral",
        "Paid Search",
      ],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        name: "X",
        type: "bar",
        data: [
          newUserGroupingValues?.direct,
          newUserGroupingValues?.search,
          newUserGroupingValues?.social,
          newUserGroupingValues?.referral,
          newUserGroupingValues?.paid,
        ],
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        },
      },
    ],
    legend: {
      show: true,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
  const lineOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  return (
    <Wrapper>
      <Container>
        <Wrapper className='flex gap-4 mb-4'>
            <Wrapper className='bg-white rounded-lg flex-1 py-10'>
            <span className="block text-center text-base text-dark-100">Active Users</span>
            <span className="block text-center text-5xl font-bold text-dark-100"> {snapshotHeaderValues?.activeUsers}</span>
            </Wrapper>
            <Wrapper className='bg-white rounded-lg flex-1 py-10'>
            <span className="block text-center text-base text-dark-100"> New Users</span>
            <span className="block text-center text-5xl font-bold text-dark-100"> {snapshotHeaderValues?.newUsers}</span>
            </Wrapper>
            <Wrapper className='bg-white rounded-lg flex-1 py-10'>
            <span className="block text-center text-base text-dark-100">Average Engagement Time</span>
            <span className="block text-center text-5xl font-bold text-dark-100"> {snapshotHeaderValues?.averageEngagementTime}</span>
            </Wrapper>
            <Wrapper className='bg-white rounded-lg flex-1 py-10'>
            <span className="block text-center text-base text-dark-100"> Total Revenue</span>
            <span className="block text-center text-5xl font-bold text-dark-100"> {snapshotHeaderValues?.totalRevenue}</span>
            </Wrapper>
        </Wrapper>
        <Wrapper className="bg-white p-6 rounded-lg border-dark-100">
          <h2>WHERE DO YOUR NEW USERS COME FROM?</h2>
          <Wrapper className="bar-chart">
            <ReactEChartsCore
              echarts={echarts}
              option={lineOption}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4">
          <h2>WHERE DO YOUR NEW USERS COME FROM?</h2>
          <Wrapper className="bar-chart">
            <ReactEChartsCore
              echarts={echarts}
              option={barOption}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </Wrapper>
        </Wrapper>
      </Container>
    </Wrapper>
  );
};

export default Index;
