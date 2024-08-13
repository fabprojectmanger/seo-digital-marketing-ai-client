"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ComingSoon from "../../../sections/coming-soon/coming-soon";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => <code>{text}</code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.HR]: () => <hr />,
    [BLOCKS.TABLE]: (node, children) => (
      <table>
        <tbody>{children}</tbody>
      </table>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th>{children}</th>,
    [BLOCKS.TABLE_CELL]: (node, children) => <td>{children}</td>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields;
      return (
        <img
          src={file.url}
          alt={title || "Embedded Asset"}
          style={{ maxWidth: "100%" }}
        />
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { title } = node.data.target.fields;
      return <div>{title}</div>;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const { title } = node.data.target.fields;
      return <a href={`/${title}`}>{children}</a>;
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      const { title, file } = node.data.target.fields;
      return (
        <a href={file.url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const { title } = node.data.target.fields;
      return <span>{title}</span>;
    },
  },
};

const page = () => {
  return (
   <ComingSoon/>
  );
};

export default page;
