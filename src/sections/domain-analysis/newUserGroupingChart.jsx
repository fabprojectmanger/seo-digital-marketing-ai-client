"use client";
import Wrapper from "../../components/wrapper/wrapper";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "New users",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};
const NewUserGroupingChart = ({ newUserGroupingValues }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (newUserGroupingValues) {
      console.log(newUserGroupingValues);
      const array = [[
        "Element",
        "Density",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ]];
      Object.keys(newUserGroupingValues).map((item, i) => {
array.push([item.toUpperCase(), newUserGroupingValues[item], "#7b94e5", null])
      })
      setData(array)
    }
  }, [newUserGroupingValues]);

  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4 flex-[2]">
      <h2 className="text-2xl font-semibold text-dark-100 mb-2">
        Where do your new users come from?
      </h2>
      <Wrapper className="bar-chart">
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default NewUserGroupingChart;
