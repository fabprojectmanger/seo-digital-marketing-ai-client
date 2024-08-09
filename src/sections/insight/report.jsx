"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import IconGauge from "../../../public/icons/IconGauge";
import Wrapper from "../../components/wrapper/wrapper";
import Text from "../../components/text/text";
import {TextToHTML} from "../../utils/TextToHtml";
import Image from "next/image";
import AuditSection from "./AuditSection";
const Report = ({ data }) => {
  const [reportData, setReportData] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(false);
  const [accordionActive, setAccordionActive] = useState(0);
  const [tabs, setTabs] = useState("performance");

  useEffect(() => {
    setReportData(data);
  }, [data]);

  const renderDetails = (item) => {
    if (!item?.details) return null;

    switch (item.id) {
      case "render-blocking-resources":
      case "unused-css-rules":
      case "unused-javascript":
      case "legacy-javascript":
      case "total-byte-weight":
      case "uses-long-cache-ttl":
      case "mainthread-work-breakdown":
      case "font-display":
      case "uses-passive-event-listeners":
        return UrlTable(item.details);
      case "uses-responsive-images":
      case "offscreen-images":
      case "uses-optimized-images":
      case "modern-image-formats":
      case "unsized-images":
        return ImageCardTr(item.details);
      case "dom-size":
        return domSize(item.details);
      case "largest-contentful-paint-element":
        return elementTable(item.details);
      default:
        return null;
    }
  };
  const AccessibilityDetails = (item) => {
    if (!item?.details) return null;
    return AccessibilityTable(item?.details);
  };
  const BestPracticesDetails = (item) => {
    if (!item?.details) return null;
    switch (item.id) {
      case "image-aspect-ratio":
        return ImageBestPracties(item?.details);
      default:
        return BestPractices(item?.details);
    }
  };
  const SeoDetails = (item) => {
    if (!item?.details) return null;
    return AccessibilityTable(item?.details);
  };
  const { passedAudits, rejectedAudits, notApplicableAudits } =
    data?.performance || {};
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
      <Wrapper className=" flex justify-between gap-4 max-2xl:flex-col">
        <Wrapper className="flex gap-4 bg-white py-4 px-8 rounded-lg max-lg-tab:flex-wrap max-lg-tab:gap-4 justify-between max-w-[40%]  max-5xl:gap-2 max-5xl:max-w-[50%] max-2xl:max-w-[100%] w-full">
          {["performance", "accessibility", "bestPractices", "seo"].map(
            (key, i) =>
              reportData?.[key]?.score && (
                <React.Fragment key={key}>
                  {i != 0 && (
                    <div className="w-[1px] bg-gray-400 max-lg-tab:hidden"></div>
                  )}
                  <div
                    onClick={() => setTabs(key)}
                    className={`p-4 rounded-lg cursor-pointer max-2xl:min-w-[200px] max-lg-tab:min-w-[auto] max-lg-tab:flex-1 ${
                      tabs === key ? "bg-gray-100" : ""
                    }`}
                  >
                    <MainCard
                      symbol="%"
                      score={(reportData[key].score * 100).toFixed(0)}
                      label={reportData[key].title}
                    />
                  </div>
                </React.Fragment>
              )
          )}
        </Wrapper>
        <Wrapper className="flex gap-8 bg-white p-8 rounded-lg max-lg-tab:flex-wrap max-lg-tab:gap-4 justify-between max-w-[60%] max-5xl:gap-2 max-5xl:max-w-[50%] max-2xl:max-w-[100%] w-full ">
          {[
            "firstContentfulPaint",
            "largestContentfulPaint",
            "totalBlockingTime",
            "cumulativeLayoutShift",
          ].map(
            (key, i) =>
              reportData?.[key] && (
                <React.Fragment key={key}>
                  {i != 0 && (
                    <div className="min-w-[1px] bg-gray-400 max-lg-tab:hidden"></div>
                  )}
                  <div className="max-2xl:min-w-[200px] max-lg-tab:min-w-[auto] max-lg-tab:flex-1">
                    <MainCard
                      key={key}
                      score={reportData[key]}
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    />
                  </div>
                </React.Fragment>
              )
          )}
        </Wrapper>
      </Wrapper>
      <AuditSection
        title="Passed Audits"
        audits={passedAudits}
        accordionKey="passedAudit"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={renderDetails}
        tab={tabs}
        label="performance"
      />
      <AuditSection
        title="Rejected Audits"
        audits={rejectedAudits}
        accordionKey="rejectedAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={renderDetails}
        tab={tabs}
        label="performance"
      />
      <AuditSection
        title="Not Applicable Audits"
        audits={notApplicableAudits}
        accordionKey="notApplicableAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={renderDetails}
        tab={tabs}
        label="performance"
      />
      <AuditSection
        title="Passed Audits"
        audits={data?.accessibility.passedAudits}
        accordionKey="passedAudit"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={AccessibilityDetails}
        tab={tabs}
        label="accessibility"
      />
      <AuditSection
        title="Rejected Audits"
        audits={data?.accessibility.rejectedAudits}
        accordionKey="rejectedAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={AccessibilityDetails}
        tab={tabs}
        label="accessibility"
      />
      <AuditSection
        title="Not Applicable Audits"
        audits={data?.accessibility.notApplicableAudits}
        accordionKey="notApplicableAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={AccessibilityDetails}
        tab={tabs}
        label="accessibility"
      />
      <AuditSection
        title="Passed Audits"
        audits={data?.bestPractices?.passedAudits}
        accordionKey="passedAudit"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={BestPracticesDetails}
        tab={tabs}
        label="bestPractices"
      />
      <AuditSection
        title="Rejected Audits"
        audits={data?.bestPractices.rejectedAudits}
        accordionKey="rejectedAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={BestPracticesDetails}
        tab={tabs}
        label="bestPractices"
      />
      <AuditSection
        title="Not Applicable Audits"
        audits={data?.bestPractices.notApplicableAudits}
        accordionKey="notApplicableAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={BestPracticesDetails}
        tab={tabs}
        label="bestPractices"
      />
      <AuditSection
        title="Passed Audits"
        audits={data?.seo.passedAudits}
        accordionKey="passedAudit"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={SeoDetails}
        tab={tabs}
        label="seo"
      />
      <AuditSection
        title="Rejected Audits"
        audits={data?.seo.rejectedAudits}
        accordionKey="rejectedAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={SeoDetails}
        tab={tabs}
        label="seo"
      />
      <AuditSection
        title="Not Applicable Audits"
        audits={data?.seo.notApplicableAudits}
        accordionKey="notApplicableAudits"
        setAccordionActive={setAccordionActive}
        accordionActive={accordionActive}
        renderDetails={SeoDetails}
        tab={tabs}
        label="seo"
      />
    </Wrapper>
  );
};

export default Report;

function bytesToKB(bytes) {
  return (bytes / 1024).toFixed(2);
}
function shortenUrl(url) {
  if (url) { 

    return `<a href="${url}" target="_blank" class="text-sm block max-w-[250px] text-ellipsis overflow-hidden !text-gray-700 hover:underline whitespace-nowrap">${
      url.length > 50 ? url.slice(url.length / 2, url.length) : url
    }</a>`;
  }
}

const MainCard = ({ score, label, symbol }) => {
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
    <Wrapper className="flex flex-col items-center gap-2">
      <IconGauge gap={score} label={symbol} />
      <Text className="text-base text-dark-100 tracking-normal font-semibold mb-2 text-center leading-5 text-[12px]">
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
          {items[0]?.url && <th className="text-left font-normal p-3">Url</th>}
          {items[0]?.totalBytes > 0 && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {(items[0]?.cacheLifetimeMs || items[0]?.cacheLifetimeMs === 0) && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {(items[0]?.wastedBytes || items[0]?.wastedMs) && (
            <th className="text-left font-normal p-3">Potential Savings</th>
          )}
          {items[0]?.groupLabel && (
            <th className="text-left font-normal p-3">Category</th>
          )}
          {items[0]?.groupLabel && (
            <th className="font-normal p-3 text-right">Time spent</th>
          )}
          {items[0]?.source && (
            <th className="font-normal p-3 text-left">Source</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items &&
          items?.map((item, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
              <td className="px-3 py-2">
                {item?.url && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenUrl(item?.url),
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
                {item?.groupLabel && item?.groupLabel}
              </td>
              {item?.duration && (
                <td className="px-3 py-2 text-right">
                  {convertMilliseconds(item.duration)}
                </td>
              )}
              {item?.totalBytes > 0 && (
                <td className="px-3 py-2">{bytesToKB(item.totalBytes)} KiB</td>
              )}
              {(item?.cacheLifetimeMs || item?.cacheLifetimeMs === 0) && (
                <td className="px-3 py-2">
                  {convertMilliseconds(item.cacheLifetimeMs)}
                </td>
              )}
              {(item?.wastedBytes || item?.wastedMs) && (
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
    <table className="w-full border border-lightblue-100 table-fixed">
      <thead>
        <tr className="bg-lightblue-100">
          {items[0]?.url && (
            <th className="text-left font-normal p-3">Image</th>
          )}
          {items[0]?.url && (
            <th className="text-left font-normal p-3">Selector</th>
          )}
          {items[0]?.totalBytes && (
            <th className="text-left font-normal p-3">Transfer Size</th>
          )}
          {items[0]?.wastedBytes && (
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
                  </div>
                </div>
              </td>
              {item?.node?.selector && (
                <td className="px-3 py-2">
                  <div>
                    {item?.node?.selector && (
                      <div className="text-sm break-all">
                        {item?.node?.selector}{" "}
                      </div>
                    )}
                    {item?.node?.snippet && (
                      <div className="text-sm text-blue-400 break-all">
                        {" "}
                        {item?.node?.snippet}
                      </div>
                    )}
                  </div>
                </td>
              )}
              {item?.totalBytes && (
                <td className="px-3 py-2">{bytesToKB(item.totalBytes)} KiB</td>
              )}
              {item?.wastedBytes && (
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
                        <div className="text-sm text-blue-400 break-all">
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
                      <div className="text-sm break-all">
                        {items[0]?.items[0]?.node?.selector}{" "}
                      </div>
                    )}
                    {items[0]?.items[0]?.node?.snippet && (
                      <div className="text-sm text-blue-400 break-all">
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

const AccessibilityTable = (items) => {
  const deatils = items;
  return (
    deatils &&
    deatils.length > 0 && (
      <table className="w-full border border-lightblue-100 table-fixed">
        <thead>
          <tr className="bg-lightblue-100">
            {deatils[0]?.node?.nodeLabel && (
              <th className="text-left font-normal p-3">Label</th>
            )}
            {deatils[0]?.href && (
              <th className="text-left font-normal p-3">Href</th>
            )}
            {deatils[0]?.text && (
              <th className="text-left font-normal p-3">Text</th>
            )}
            {deatils[0]?.node?.selector && (
              <th className="text-left font-normal p-3">Selector</th>
            )}
            {deatils[0]?.node?.snippet && (
              <th className="text-left font-normal p-3">Snippet</th>
            )}
            {deatils[0]?.node?.explanation && (
              <th className="text-left font-normal p-3">Explanation</th>
            )}
          </tr>
        </thead>
        <tbody>
          {deatils &&
            deatils?.map((item, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
                {item?.href && (
                  <td className="px-3 py-2  text-sm font-semibold">
                    <a
                      href={item?.href}
                      className="text-blue-500"
                      target="_blank"
                    >
                      {" "}
                      {item?.href}
                    </a>
                  </td>
                )}
                {item?.text && (
                  <td className="px-3 py-2  text-sm font-semibold">
                    {item?.text}
                  </td>
                )}
                {item?.node?.nodeLabel && (
                  <td className="px-3 py-2  text-sm font-semibold">
                    {item?.node?.nodeLabel}
                  </td>
                )}
                {item?.node?.selector && (
                  <td className="px-3 py-2 text-sm text-dark-100 break-all">
                    <div className="max-h-[150px] overflow-auto">
                      {" "}
                      {item?.node?.selector}
                    </div>
                  </td>
                )}
                {item?.node?.snippet && (
                  <td className="px-3 py-2  text-sm text-blue-500 break-all">
                    <div className="max-h-[150px] overflow-auto">
                      {" "}
                      {item?.node?.snippet}
                    </div>
                  </td>
                )}
                {item?.node?.explanation && (
                  <td className="px-3 py-2 font-semibold">
                    <div className="max-h-[150px] overflow-auto">
                      {item?.node?.explanation}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    )
  );
};

const BestPractices = (items) => {  
  return (
    <table className="w-full border border-lightblue-100 table-fixed">
      <thead>
        <tr className="bg-lightblue-100">
          {items[0]?.scriptUrl && (
            <th className="text-left font-normal p-3">Script Url</th>
          )}
          {items[0]?.sourceMapUrl && (
            <th className="text-left font-normal p-3">Source Map Url</th>
          )}
          {items[0]?.subItems?.items.length > 0 && (
            <th className="text-left font-normal p-3">Errors</th>
          )}
          {items[0]?.sourceLocation?.url && (
            <th className="text-left font-normal p-3">Source Location</th>
          )}
          {items[0]?.source && (
            <th className="text-left font-normal p-3">Source</th>
          )}
          {items[0]?.description && (
            <th className="text-left font-normal p-3">Description</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items && items.length>0 &&
          items?.map((item, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-200" : ""}>
              {item?.scriptUrl && (
                <td
                  className="px-3 py-2  text-sm font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: shortenUrl(item?.scriptUrl),
                  }}
                ></td>
              )}
              {item?.sourceMapUrl && (
                <td className="px-3 py-2  ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: shortenUrl(item?.sourceMapUrl),
                    }}
                    className="text-sm text-red-500 break-all max-h-[150px] overflow-auto"
                  ></div>
                </td>
              )}
              {item?.subItems?.items.length>0 && (
                <td className="px-3 py-2  ">
                  <div className="text-sm text-red-500 break-all max-h-[150px] overflow-auto">
                    {item?.subItems?.items.length > 0 ? (
                      item?.subItems?.items?.map((subItem, i) => (
                        <span className="text-red-600 block" key={i}>
                          {subItem?.error}
                        </span>
                      ))
                    ) : (
                      <span className="text-center">-</span>
                    )}
                  </div>
                </td>
              )}
              {item?.sourceLocation && item?.sourceLocation?.url && (
                <td
                  className="px-3 py-2  text-sm font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: shortenUrl(item?.sourceLocation?.url),
                  }}
                ></td>
              )}
              {item?.source && (
                <td className="px-3 py-2 text-sm text-dark-100 break-all">
                  {item?.source?.url?item?.source?.url:item?.source?.type}
                </td>
              )}
              {item?.description && (
                <td className="px-3 py-2  ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: TextToHTML(item?.description),
                    }}
                    className="text-sm text-red-500 break-all max-h-[150px] overflow-auto"
                  ></div>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const ImageBestPracties = (items) => {
  return (
    <table className="w-full border border-lightblue-100 table-fixed">
      <thead>
        <tr className="bg-lightblue-100">
          {items[0]?.url && (
            <th className="text-left font-normal p-3">Image</th>
          )}
          {items[0]?.node?.nodeLabel && (
            <th className="text-left font-normal p-3">Label</th>
          )}
          {items[0]?.displayedAspectRatio && (
            <th className="text-left font-normal p-3">
              Displayed Aspect Ratio
            </th>
          )}
          {items[0]?.actualAspectRatio && (
            <th className="text-left font-normal p-3">Actual Aspect Ratio</th>
          )}
          {items[0]?.node.selector && (
            <th className="text-left font-normal p-3">Selector</th>
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
                  </div>
                </div>
              </td>
              {item?.node?.nodeLabel && (
                <td className="px-3 py-2">
                  <div className="text-sm">{item?.node?.nodeLabel}</div>
                </td>
              )}
              {item?.displayedAspectRatio && (
                <td className="px-3 py-2">{item?.displayedAspectRatio} KiB</td>
              )}
              {item?.actualAspectRatio && (
                <td className="px-3 py-2">{item?.actualAspectRatio} KiB</td>
              )}
              <td className="px-3 py-2">
                {item?.node?.selector && (
                  <div className="text-sm break-all">
                    {item?.node?.selector}{" "}
                  </div>
                )}
                <div>
                  {item?.node?.snippet && (
                    <div className="text-sm text-blue-400 break-all">
                      {" "}
                      {item?.node?.snippet}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
