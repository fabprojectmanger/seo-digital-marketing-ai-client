"use client";
import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";

const MostPopular = ({ values, heading, keyHead, valueHead }) => {
    const [length, setLength] = useState(0);
    const [sum, setSum] = useState(0);
  const [limit, setLimit] = useState(0);
  const [show, setShow] = useState(false);
useEffect(()=>{
    if(values){
        let sum = 0;
        let length = 0;
    values.map((item, i) => {
        sum += parseFloat(item[5].activeUsers);
        setSum(sum);
        setLength(++length)
      });
    }
},[values])
 
  useEffect(() => {
    if (show) {
      setLimit(length);
    } else {
      setLimit(8);
    }
  }, [show]);

  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4 flex-[1]">
      <h2 className="text-2xl font-semibold text-dark-100 mb-2 empty:hi">
        {heading}
      </h2>
      <ul>
        <li className="relative flex justify-between border-b border-lightblue-100 py-2">
          <span> {keyHead} </span>
          <span>{valueHead}</span>
        </li>
        {values &&
         values.map((item, i) =>
            i < limit ? (
              <li
                key={i}
                className="relative flex justify-between border-b border-lightblue-100 py-2"
              >
                <span className="font-semibold">{item[1].slice(0,30)}{item[1].length > 30 && '...' }</span>
                <span>{item[5].activeUsers}</span>
                <span
                  style={{
                    width: `${(parseFloat(item[5].activeUsers) / sum) * 100}%`,
                  }}
                  className="absolute -bottom-[1px] left-0 bg-dark-100 h-[2px] transition-all duration-300"
                ></span>
              </li>
            ) : null
          )}
      </ul>
      {length > 7 && (
        <button
          className="mx-auto block mt-4 underline underline-offset-4"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Show less" : "Show all"}
        </button>
      )}
    </Wrapper>
  );
};

export default MostPopular;
