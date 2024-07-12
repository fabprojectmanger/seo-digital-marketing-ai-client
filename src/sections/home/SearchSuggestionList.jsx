"use client";
import React, { useEffect, useState } from "react";
import { SearchSuggestionList } from "../../assets/data/search-suggestion";
import H4 from "../../components/headings/h4";
import Text from "../../components/text/text";
import Wrapper from "../../components/wrapper/wrapper";
import { useTheme } from "../../contexts/theme/ThemeProvider";

const SearchList = () => {
  const { selectedPrimaryOption, setSelectedPrimaryOption } = useTheme();
  const [key, setKey] = useState('');
  useEffect(() => {
    if(key){
    setSelectedPrimaryOption(key)
    }
  }, [key]);
  return (
    <Wrapper className="grid grid-cols-2 gap-x-[45px] gap-y-[14px] max-md-mobile:grid-cols-1">
      {SearchSuggestionList.map((item, i) => (
        <Wrapper
          key={i}
          className={`px-[31px] py-[18px] border-2 border-black border-opacity-30 relative rounded-[10px] ${
            item.key === selectedPrimaryOption ? " bg-white" : ""
          }`}
        >
          <H4 className="text-dark-100">{item.title}</H4>

          <Text className="mt-[4px] text-black">{item.content}</Text>
          <button
            type="button"
            onClick={() => setKey(item.key)}
            className="absolute top-0 left-0 w-full h-full"
          ></button>
        </Wrapper>
      ))}
    </Wrapper>
  );
};

export default SearchList;
