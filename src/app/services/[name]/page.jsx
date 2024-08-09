"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "../../../sections/coming-soon/coming-soon";
import { useParams } from "next/navigation";
import { ServicesData } from "../serviceJson";
import Wrapper from "../../../components/wrapper/wrapper";
import H1 from "../../../components/headings/h1";
import H2 from "../../../components/headings/h2";
import H3 from "../../../components/headings/h3";
import Container from "../../../components/container/container";
import HireExpret from "../../../components/hire-an-expert/HireExpret";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
const Page = () => {
  const [item, setItem] = useState(null);
  const data = useParams();
  const { showForm } = useTheme();
  console.log(data, "data from params");
  useEffect(() => {
    const selectedItem = ServicesData.find((item) => item.slug == data.name);
    setItem(selectedItem.data);
  }, [data]);

  if (item == null) {
    return <ComingSoon />;
  }
  return (
    <Wrapper>
      <Wrapper
        className={`mb-10 mt-16 max-sm-tab:mt-0 ${
          showForm ? "opacity-25" : ""
        }`}
      >
        <Container>
          <Wrapper className="max-md-tab:max-w-full">
            <H1 as={"tag"} className="text-4xl font-bold tracking-tight hidden">
              {item?.key1_h1}
            </H1>
            <H1 className="!text-4xl !font-bold !leading-tight tracking-tight max-xl:text-4xl max-sm-tab:text-2xl">
              {item?.key1_h1}
            </H1>
            <p className="mt-5 text-lg">
              <span>{item?.key1_desc1}</span>
            </p>
            <H2 className="mt-3 font-semibold">{item?.key1_h2}</H2>
            <p className="mt-5 text-lg">
              <span>{item?.key1_desc2}</span>
            </p>
            <Wrapper>
              {item?.key1_data.map((d) => (
                <Wrapper key={d.key} className="gap-2 my-3">
                  <H3 className="font-semibold">{d.key}</H3>
                  <ul className="list-disc">
                    <li className=" text-lg ml-8">{d.value}</li>
                  </ul>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Container>
        <Container className="mt-[4.5rem]">
          <Wrapper className="max-md-tab:max-w-full">
            <H2 className="!text-4xl !font-semibold !leading-tight tracking-tight max-xl:text-4xl max-sm-tab:text-2xl">
              {item?.key2_h1}
            </H2>
            <p className="mt-5 text-lg">
              <span>{item?.key2_desc1}</span>
            </p>
            <H2 className="mt-3 !font-semibold">{item?.key2_h2}</H2>
            <p className="mt-5 text-lg">
              <span>{item?.key2_desc2}</span>
            </p>
            <Wrapper>
              {item?.key2_data.map((d) => (
                <Wrapper key={d.key} className="gap-2 my-3">
                  <H3 className="font-semibold">{d.key}</H3>
                  <ul className="list-disc">
                    <li className="text-lg ml-8">{d.value}</li>
                  </ul>
                </Wrapper>
              ))}
            </Wrapper>
            <p className="mt-5 text-lg">
              <span>{item?.key2_desc3}</span>
            </p>
          </Wrapper>
        </Container>
        <Container className="mt-[4.5rem]">
          <Wrapper className="max-md-tab:max-w-full">
            <H2 className="!text-4xl font-semibold !leading-tight tracking-tight max-xl:text-4xl max-sm-tab:text-2xl">
              {item?.key3_h1}
            </H2>
            <p className="mt-5 text-lg">
              <span>{item?.key3_desc1}</span>
            </p>
            <Wrapper>
              {item?.key3_data.map((d) => (
                <Wrapper key={d.key} className="gap-2 my-3">
                  <H3 className="font-semibold">{d.key}</H3>
                  <ul className="list-disc">
                    <li className="text-lg ml-8">{d.value}</li>
                  </ul>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Container>
      </Wrapper>
      <HireExpret />
    </Wrapper>
  );
};

export default Page;
