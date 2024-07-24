"use client";
import React, { useEffect, useState } from "react";
import "../keyword-planner/view/style.css";
import Pagination from "../../components/pagination/pagination";
import Wrapper from "../../components/wrapper/wrapper";
const PageReportTable = ({ values }) => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(0);
  const [allValues, setValues] = useState([]);
  let limit = 10;
  useEffect(() => {
    if (values) {
      setCount(Math.ceil(values.length / limit));
      setValues(values.slice(start * limit, (start + 1) * limit));
    }
  }, [start, values]);
  const handlePageChange = (e) => {
    setStart(e);
  };
  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4">
      <h2 className="text-2xl font-semibold text-dark-100 mb-6">
        Views by Pages
      </h2>
      <div className="keyword-response overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th style={{textAlign:'left'}}>Page Title</th>
              <th>Country</th>
              <th>Screen Page Views</th>
              <th>Users</th>
              <th>New Users</th>
              <th>Sessions</th>
            </tr>
          </thead>
          <tbody>
            {allValues.map((item, i) => (
              <tr key={i}>
                <td>{start > 0 ? i + 1 + limit * start : i + 1}</td>
                <td style={{textAlign:'left'}}>{item[1]}</td>
                <td>{item[3]}</td>
                <td>{item[4]?.screenPageViews}</td>
                <td>{item[5]?.activeUsers}</td>
                <td>{item[6]?.newUsers}</td>
                <td>{item[7]?.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} getIndex={handlePageChange} index={start} />
      </div>
    </Wrapper>
  );
};

export default PageReportTable;
