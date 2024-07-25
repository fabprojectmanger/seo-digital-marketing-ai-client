"use client";
import Wrapper from "../../components/wrapper/wrapper";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "New users",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};
const TopFivePages = ({ values }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (values) {
      console.log(values);
      const array = [
        [
          "Page Title",
          "Users",   
        ],
      ];
      const sortedValues = values.sort((a, b) => {
        return b[5].sessions - a[5].sessions;
    });
    sortedValues.map((item, i) => {
      if(i < 5){
        array.push([
          item[1].length > 25 ? item[1].slice(0,25) + "..." : item[1] ,
          parseFloat(item[7].sessions),

       ]);
      }
      });
      setData(array);
    }
  }, [values]);

  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4 flex-[2]">
      <h2 className="text-2xl font-semibold text-dark-100 mb-2">
        Top 5 Visited Pages By Sessions
      </h2>
      <Wrapper className="bar-chart">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default TopFivePages;
