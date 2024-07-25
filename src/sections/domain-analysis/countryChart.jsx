"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Wrapper from "../../components/wrapper/wrapper";

const CountryChart = ({ countryWiseUsers }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (countryWiseUsers) {
      const da = [["Country", "Users"]];
      Object.keys(countryWiseUsers).map((item, i) => {
        const arr = [];
        arr.push(item);
        arr.push(countryWiseUsers[item]);
        da.push(arr);
      });
      setData(da)
    }
  }, [countryWiseUsers]);

  const options = {
    sizeAxis:false,
      colorAxis: { colors: ["#7c95e5", "#5470c6", "#174ea6"] },
    datalessRegionColor: "#dddddd",
    defaultColor: "#5470c6",
  };
  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4  flex-[2]">
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    
    </Wrapper>
  );
};

export default CountryChart;
