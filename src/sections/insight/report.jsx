"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import IconGauge from "../../../public/icons/IconGauge";
import Wrapper from "../../components/wrapper/wrapper";
import Text from "../../components/text/text";
import TextToHTML from "../../utils/TextToHtml";
import Image from "next/image";
import Indicator from "./indicator";
import H1 from "../../components/headings/h1";
import IconDownArrow from "../../../public/icons/IconDownArrow";
const Report = ({ data }) => {
  const [reportData, setReportData] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(false);
  const [accordionActive, setAccordionActive] = useState(0);
  const findObject = (key, value, array) => {
    return array.find((obj) => obj[key] === value);
  };

  useEffect(() => {
    setReportData(data);
    console.log(data);

    // const ar =  findObject("id", "screenshot-thumbnails", data?.performance?.passedAudits)
    // setFeaturedImage(ar?.details[ar?.details.length - 1].data)
  }, [data]);
  return (
    <Wrapper className="">
      <div className="">
        {featuredImage && (
          <Image
            src={featuredImage || ""}
            alt="Image"
            width={500}
            height={348}
            className="border border-dark-100 rounded-md"
          />
        )}
      </div>
      <Wrapper className=" flex justify-between gap-4">
        <Wrapper className="flex gap-8 bg-white p-8 rounded-lg justify-between max-w-[40%] w-full">
          {reportData?.performance?.score && (
            <MainCard
              score={reportData?.performance?.score * 100}
              label={reportData?.performance?.title}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.accessibility?.score && (
            <MainCard
              score={reportData?.accessibility?.score * 100}
              label={reportData?.accessibility?.title}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.bestPractices?.score && (
            <MainCard
              score={reportData?.bestPractices?.score * 100}
              label={reportData?.bestPractices?.title}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.seo?.score && (
            <MainCard
              score={reportData?.seo?.score * 100}
              label={reportData?.seo?.title}
            />
          )}
        </Wrapper>
        <Wrapper className="flex gap-8 bg-white p-8 rounded-lg justify-between max-w-[60%] w-full">
          {reportData?.firstContentfulPaint && (
            <MainCard
              score={reportData?.firstContentfulPaint}
              label={"First Contentful Paint"}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.largestContentfulPaint && (
            <MainCard
              score={reportData?.largestContentfulPaint}
              label={"Largest Contentful Paint"}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.totalBlockingTime && (
            <MainCard
              score={reportData?.totalBlockingTime}
              label={"Total Blocking Time"}
            />
          )}
          <div className="w-[1px] bg-gray-400"></div>
          {reportData?.cumulativeLayoutShift && (
            <MainCard
              score={reportData?.cumulativeLayoutShift}
              label={"Cumulative Layout Shift"}
            />
          )}
        </Wrapper>
      </Wrapper>
      <Wrapper className="accordion-items my-5 space-y-2">
        <Wrapper>
          <H1 className="mb-4">
            Passed audits ({data?.performance?.passedAudits.length})
          </H1>
        </Wrapper>
        {data?.performance?.passedAudits &&
          data?.performance?.passedAudits.map((item, i) => (
            <Wrapper key={i} className="accordion-item bg-white p-4 rounded-md">
              <Wrapper>
                <div
                  onClick={() => {
                    accordionActive?.passedAudit === i
                      ? setAccordionActive((prev) => ({
                          ...prev,
                          passedAudit: -1,
                        }))
                      : setAccordionActive((prev) => ({
                          ...prev,
                          passedAudit: i,
                        }));
                  }}
                  className={`${
                    accordionActive?.passedAudit === i
                      ? "border-b border-lightblue-100 pb-2"
                      : " "
                  }   gap-2 cursor-pointer flex justify-between items-center text-dark-100 text-base font-semibold`}
                >
                  <Wrapper className="gap-2 flex items-center">
                    <Indicator gap={item.score * 100} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: TextToHTML(item?.title),
                      }}
                    ></div>
                  </Wrapper>
                  <IconDownArrow
                    size={20}
                    className={
                      accordionActive?.passedAudit === i
                        ? "rotate-180 transition-transform"
                        : "  transition-transform"
                    }
                  />
                </div>
              </Wrapper>
              <Wrapper
                className={`${
                  accordionActive?.passedAudit === i ? " block" : "hidden"
                } `}
              >
                <div
                  className="py-4"
                  dangerouslySetInnerHTML={{
                    __html: TextToHTML(item?.description),
                  }}
                ></div>
              </Wrapper>
            </Wrapper>
          ))}
      </Wrapper>
      <Wrapper className="accordion-items my-5 space-y-2">
        <Wrapper>
          <H1 className="mb-4">
            Rejected Audits ({data?.performance?.rejectedAudits.length})
          </H1>
        </Wrapper>
        {data?.performance?.rejectedAudits &&
          data?.performance?.rejectedAudits.map((item, i) => (
            <Wrapper key={i} className="accordion-item bg-white p-4 rounded-md">
              <Wrapper>
                <div
                  onClick={() => {
                    accordionActive?.rejectedAudits === i
                      ? setAccordionActive((prev) => ({
                          ...prev,
                          rejectedAudits: -1,
                        }))
                      : setAccordionActive((prev) => ({
                          ...prev,
                          rejectedAudits: i,
                        }));
                  }}
                  className={`${
                    accordionActive?.rejectedAudits === i
                      ? "border-b border-lightblue-100 pb-2"
                      : " "
                  }  gap-2 cursor-pointer flex justify-between items-center text-dark-100 text-base font-semibold`}
                >
                  <Wrapper className="gap-2 flex items-center">
                    <Indicator gap={item.score * 100} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: TextToHTML(item?.title),
                      }}
                    ></div>
                    {item?.displayValue && (
                      <div
                        className="bg-red-300 text-white py-1 px-2 text-sm rounded-md"
                        dangerouslySetInnerHTML={{ __html: item?.displayValue }}
                      ></div>
                    )}
                  </Wrapper>
                  <IconDownArrow
                    size={20}
                    className={
                      accordionActive?.rejectedAudits === i
                        ? "rotate-180 transition-transform"
                        : "  transition-transform"
                    }
                  />
                </div>
              </Wrapper>
              <Wrapper
                className={`${
                  accordionActive?.rejectedAudits === i ? " block" : "hidden"
                } `}
              >
                <div
                  className="py-4"
                  dangerouslySetInnerHTML={{
                    __html: TextToHTML(item?.description),
                  }}
                ></div>
                {(item?.id === "render-blocking-resources" ||
                  item?.id === "unused-css-rules" ||
                  item?.id === "unused-javascript" ||
                  item?.id === "legacy-javascript" ||
                  item?.id === "total-byte-weight" ||
                  item?.id === "uses-long-cache-ttl" ||
                  item?.id === "mainthread-work-breakdown" ||
                  item?.id === "font-display" ||
                  item?.id === "uses-passive-event-listeners") &&
                  item?.details &&
                  UrlTable(item?.details)}
                {(item?.id === "uses-responsive-images" ||
                  item?.id === "offscreen-images" ||
                  item?.id === "uses-optimized-images" ||
                  item?.id === "modern-image-formats" ||
                  item?.id === "unsized-images") &&
                  item?.details &&
                  ImageCardTr(item?.details)}

                {item?.id === "dom-size" && domSize(item?.details)}

                {item?.id === "largest-contentful-paint-element" &&
                  elementTable(item?.details)}
              </Wrapper>
            </Wrapper>
          ))}
      </Wrapper>
      <Wrapper className="accordion-items my-5 space-y-2">
        <Wrapper>
          <H1 className="mb-4">
            Not Applicable Audits (
            {data?.performance?.notApplicableAudits.length})
          </H1>
        </Wrapper>
        {data?.performance?.notApplicableAudits &&
          data?.performance?.notApplicableAudits.map((item, i) => (
            <Wrapper key={i} className="accordion-item bg-white p-4 rounded-md">
              <Wrapper>
                <div
                  onClick={() => {
                    accordionActive?.notApplicableAudits === i
                      ? setAccordionActive((prev) => ({
                          ...prev,
                          notApplicableAudits: -1,
                        }))
                      : setAccordionActive((prev) => ({
                          ...prev,
                          notApplicableAudits: i,
                        }));
                  }}
                  className={`${
                    accordionActive?.notApplicableAudits === i
                      ? "border-b border-lightblue-100 pb-2"
                      : " "
                  }   gap-2 cursor-pointer flex justify-between items-center text-dark-100 text-base font-semibold`}
                >
                  <Wrapper className="gap-2 flex items-center">
                    <Indicator gap={item.score * 100} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: TextToHTML(item?.title),
                      }}
                    ></div>
                  </Wrapper>
                  <IconDownArrow
                    size={20}
                    className={
                      accordionActive?.notApplicableAudits === i
                        ? "rotate-180 transition-transform"
                        : "  transition-transform"
                    }
                  />
                </div>
              </Wrapper>
              <Wrapper
                className={`${
                  accordionActive?.notApplicableAudits === i
                    ? " block"
                    : "hidden"
                } `}
              >
                <div
                  className="py-4"
                  dangerouslySetInnerHTML={{
                    __html: TextToHTML(item?.description),
                  }}
                ></div>
              </Wrapper>
            </Wrapper>
          ))}
      </Wrapper>
    </Wrapper>
  );
};

export default Report;

function bytesToKB(bytes) {
  return (bytes / 1024).toFixed(2);
}
function shortenUrl(url) {
  if (url) {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;
    const path = urlObject.pathname;
    const searchParams = urlObject?.search;
    const pathParts = path.split("/");
    const assetPath = pathParts.slice(0, -1).join("/");
    const assetFile = pathParts[pathParts.length - 1].split("?")[0];
    const version = searchParams.includes("=")
      ? searchParams.split("=")[1].slice(0, 7)
      : "";
    const thUrl = `${assetPath}/${assetFile}?v=${version}`;
    return `<a href="${url}" target="_blank" class="text-sm !text-gray-700 hover:underline">…${thUrl.slice(
      url.length - 50,
      thUrl.length
    )}…</a> <span class="text-gray-500 text-xs">(${domain})</span></span>`;
  }
}

const MainCard = ({ score, label }) => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let i = number;
    if (i < score) {
      setTimeout(() => {
        ++i;
        setNumber(i);
      }, 15);
    }
  }, [number, score]);
  return (
    <Wrapper className='flex flex-col items-center gap-2'>    
      <IconGauge gap={score} />
      <Text className="text-base text-dark-100 tracking-normal font-semibold mb-2">
        {label}
      </Text>
    </Wrapper>
  );
};

const UrlTable = (items) => {
  return (
    <table className="w-full border border-lightblue-100">
      <thead>
        <tr className="bg-lightblue-100">
          {items[0].url && <th className="text-left font-normal p-3">Url</th>}
          {items[0].totalBytes > 0 && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {(items[0].cacheLifetimeMs || items[0].cacheLifetimeMs === 0) && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {(items[0].wastedBytes || items[0].wastedMs) && (
            <th className="text-left font-normal p-3">Potential Savings</th>
          )}
          {items[0].groupLabel && (
            <th className="text-left font-normal p-3">Category</th>
          )}
          {items[0].groupLabel && (
            <th className="font-normal p-3 text-right">Time spent</th>
          )}
          {items[0].source && (
            <th className="font-normal p-3 text-left">Source</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items &&
          items?.map((item, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
              <td className="px-3 py-2">
                {item.url && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenUrl(item.url),
                    }}
                  ></div>
                )}
                {item?.source?.url && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenUrl(item?.source?.url),
                    }}
                  ></div>
                )}
                {item?.subItems && (
                  <div className="pl-5">
                    {item?.subItems?.items.map((subitem, i) => (
                      <div key={i} className="flex gap-16 items-center">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: shortenUrl(subitem?.location?.url),
                          }}
                        ></div>
                        <span className="text-[#616161] text-sm tracking-wide font-semibold">
                          {subitem?.signal}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {item.groupLabel && item.groupLabel}
              </td>
              {item.duration && (
                <td className="px-3 py-2 text-right">
                  {convertMilliseconds(item.duration)}
                </td>
              )}
              {item.totalBytes > 0 && (
                <td className="px-3 py-2">{bytesToKB(item.totalBytes)} KiB</td>
              )}
              {(item.cacheLifetimeMs || item.cacheLifetimeMs === 0) && (
                <td className="px-3 py-2">
                  {convertMilliseconds(item.cacheLifetimeMs)}
                </td>
              )}
              {(item.wastedBytes || item.wastedMs) && (
                <td className="px-3 py-2">
                  {item.wastedMs ? convertMilliseconds(item.wastedMs) : ""}
                  {item.wastedBytes ? bytesToKB(item.wastedBytes) + "KiB" : ""}
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const ImageCardTr = (items) => {
  return (
    <table className="w-full border border-lightblue-100">
      <thead>
        <tr className="bg-lightblue-100">
        {items[0]?.url && <th className="text-left font-normal p-3">Url</th> }
          {items[0].totalBytes && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {items[0].wastedBytes && (
            <th className="text-left font-normal p-3">Potential Savings</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map((item, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
              <td className="px-3 py-2">
                <div className="flex gap-8 items-center justify-between">
                  <div className="flex gap-3 items-center max-w-[40%] w-full">
                    {item?.url && (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="min-w-[100px] block"
                      >
                        <Image
                          src={item?.url}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      </a>
                    )}
                    <div>
                      {item?.node?.selector && (
                        <div className="text-sm">{item?.node?.selector} </div>
                      )}
                      {item?.node?.snippet && (
                        <div className="text-sm text-blue-400">
                          {" "}
                          {item?.node?.snippet}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenUrl(item.url),
                    }}
                  ></div>
                </div>
              </td>
              {item.totalBytes && (
                <td className="px-3 py-2">{bytesToKB(item.totalBytes)} KiB</td>
              )}
              {item.wastedBytes && (
                <td className="px-3 py-2">{bytesToKB(item.wastedBytes)} KiB</td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

function convertMilliseconds(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const remainingMsAfterDays = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(remainingMsAfterDays / (60 * 60 * 1000));
  const remainingMsAfterHours = remainingMsAfterDays % (60 * 60 * 1000);
  const minutes = Math.floor(remainingMsAfterHours / (60 * 1000));
  const remainingMsAfterMinutes = remainingMsAfterHours % (60 * 1000);
  const seconds = Math.floor(remainingMsAfterMinutes / 1000);
  if (ms <= 1000) {
    return `${ms.toFixed(1)}ms`;
  } else {
    return `${days ? days + "d" : ""} ${hours ? hours + "h" : ""} ${
      minutes ? minutes + "m" : ""
    } ${seconds ? seconds + "s" : ""}`;
  }
}

const domSize = (items) => {
  return (
    <table className="w-full border border-lightblue-100">
      <thead>
        <tr className="bg-lightblue-100">
          <th className="text-left font-normal p-3">Statistic</th>
          {items[1].node && (
            <th className="text-left font-normal p-3">Element</th>
          )}
          {items[1].value && (
            <th className="text-left font-normal p-3">Value</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items &&
          items?.map((item, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
              <td className="px-3 py-2">{item?.statistic && item.statistic}</td>
              {item.node ? (
                <td className="px-3 py-2">
                  <div className="flex gap-3 items-center max-w-[40%] w-full">
                    <div>
                      {item?.node?.nodeLabel && (
                        <div className="text-sm">{item?.node?.nodeLabel} </div>
                      )}
                      {item?.node?.snippet && (
                        <div className="text-sm text-blue-400">
                          {" "}
                          {item?.node?.snippet}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              ) : (
                <td></td>
              )}
              {item.value.value && (
                <td className="px-3 py-2">{item.value.value}</td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const elementTable = (items) => {
  return (
    <Wrapper>
      <table className="w-full border border-lightblue-100">
        <thead>
          <tr className="bg-lightblue-100">
            <th className="text-left font-normal p-3">
              {items[0].headings[0].label}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="px-3 py-2">
              <div className="flex gap-8 items-center justify-between">
                <div className="flex gap-3 items-center max-w-[40%] w-full">
                  {items[0]?.items[0].node && (
                    <div
                      className="min-w-[100px]"
                      dangerouslySetInnerHTML={{
                        __html: items[0]?.items[0].node.snippet,
                      }}
                    ></div>
                  )}
                  <div>
                    {items[0]?.items[0].node?.selector && (
                      <div className="text-sm">
                        {items[0]?.items[0]?.node?.selector}{" "}
                      </div>
                    )}
                    {items[0]?.items[0]?.node?.snippet && (
                      <div className="text-sm text-blue-400">
                        {" "}
                        {items[0]?.items[0]?.node?.snippet}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border border-lightblue-100 mt-4">
        <thead>
          <tr className="bg-lightblue-100">
            {items[1].headings &&
              items[1].headings.map((item, i) => (
                <th key={i} className="text-left font-normal p-3">
                  {item.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {items[1].items &&
            items[1].items.map((item, i) => (
              <tr key={i} className="">
                <td className="px-3 py-2">{item?.phase}</td>
                <td className="px-3 py-2">{item?.percent}</td>
                <td className="px-3 py-2">
                  {convertMilliseconds(item?.timing)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
