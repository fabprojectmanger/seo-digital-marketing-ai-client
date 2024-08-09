import Wrapper from "../../components/wrapper/wrapper";
import "./style.css";
import React, { useEffect, useState } from "react";

import Indicator from "./indicator";
import H1 from "../../components/headings/h1";
import IconDownArrow from "../../../public/icons/IconDownArrow";
import { TextToHTML } from "../../utils/TextToHtml";

const AuditSection = ({
  title,
  audits,
  accordionKey,
  setAccordionActive,
  accordionActive,
  renderDetails,
  tab,
  label,
}) =>
  tab === label &&
  audits.length > 0 && (
    <Wrapper className="accordion-items my-5 space-y-2">
      <Wrapper>
        <H1 className="mb-4">
          {title} ({audits.length})
        </H1>
      </Wrapper>
      {audits.map((item, i) => (
        <Wrapper key={i} className="accordion-item bg-white p-4 rounded-md">
          <Wrapper>
            <div
              onClick={() =>
                setAccordionActive((prev) => ({
                  ...prev,
                  [accordionKey]: accordionActive[accordionKey] === i ? -1 : i,
                }))
              }
              className={`${
                accordionActive[accordionKey] === i
                  ? "border-b border-lightblue-100 pb-2"
                  : ""
              } gap-2 cursor-pointer flex justify-between items-center text-dark-100 text-base font-semibold`}
              role="button"
              tabIndex={0}
            >
              <Wrapper className="gap-2 flex items-center">
                <Indicator gap={item.score * 100} />
                <div
                  dangerouslySetInnerHTML={{ __html: TextToHTML(item?.title) }}
                />
              </Wrapper>
              <IconDownArrow
                size={20}
                className={`${
                  accordionActive[accordionKey] === i
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }`}
              />
            </div>
          </Wrapper>
          <Wrapper
            className={`${
              accordionActive[accordionKey] === i ? "block" : "hidden"
            }`}
          >
            {item?.description && (
              <div
                className="py-4"
                dangerouslySetInnerHTML={{
                  __html: TextToHTML(item?.description),
                }}
              />
            )}
            {item?.details && item?.details.length > 0 && renderDetails(item)}
          </Wrapper>
        </Wrapper>
      ))}
    </Wrapper>
  );

export default AuditSection;
