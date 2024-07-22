"use client";
import React, { useEffect, useState } from "react";
import { SearchSuggestionList } from "../../assets/data/search-suggestion";
import H4 from "../../components/headings/h4";
import Text from "../../components/text/text";
import Wrapper from "../../components/wrapper/wrapper";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import Link from "next/link";

const SearchList = () => {
  const { selectedPrimaryOption, setSelectedPrimaryOption, setGoogleResponse, setSearchEnabled } = useTheme();
  const [key, setKey] = useState('');
  useEffect(() => {
    if(key){
    setSelectedPrimaryOption(key)
    setGoogleResponse('');
    setSearchEnabled(Math.random())
    }
  }, [key]);
  return (
    <Wrapper className="grid grid-cols-3 gap-x-[14px] gap-y-[14px] max-md-mobile:grid-cols-1">
      {SearchSuggestionList.map((item, i) => (
        <Wrapper
          key={i}
          className={`px-[31px] py-[18px] border-2 border-black border-opacity-30 relative rounded-[10px] ${
            item.key === selectedPrimaryOption ? " bg-white" : ""
          }`}
        >
          <H4 className="text-dark-100">{item.title}</H4>

          <Text className="mt-[4px] text-black">{item.content}</Text>
          {item.link !== '/' ? <Link href='/keyword-planner' className="absolute top-0 left-0 w-full h-full"></Link> : 
          <button
            type="button"
            onClick={() => setKey(item.key)}
            className="absolute top-0 left-0 w-full h-full"
          ></button>
}
        </Wrapper>
      ))}
    </Wrapper>
  );
};

export default SearchList;
