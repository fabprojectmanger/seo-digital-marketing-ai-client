"use client";
import Input from "../../components/input";
import Wrapper from "../../components/wrapper/wrapper";
import React, { useState } from "react";
import IconSubmit from "../../../public/icons/IconSubmit";
import IconReplay from "../../../public/icons/IconReplay";
import ErrorNotification from "../../components/notification/error/ErrorNotification";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Search = ({ value, refresh }) => {
  const [searchValue, setSearchValue] = useState(value || '');
  const { setError, error, setDomain, setPromptMessage, selectedPrimaryOption } = useTheme();
  const route = useRouter();
  const getSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  function isValidDomainString(url) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+(\.[a-z]{2,6})(\/\S*)?$/i;
    return pattern.test(url);
  }
  const submitForm = (e) => {
    e.preventDefault();
    if(selectedPrimaryOption === 'domain'){
      if (!isValidDomainString(searchValue)) {
        setError({
          active: true,
          message: "Please add a valid domain.",
        });
      } else {  
        setDomain(searchValue);
        setPromptMessage(searchValue);
        route.push("/options");
        }
    }
    else{
      setPromptMessage(searchValue);
      route.push("/response");
    }

  };
  return (
    <Wrapper className="">
      <form
        className="relative w-full mt-[14px] max-md-mobile:fixed max-md-mobile:bottom-0 max-md-mobile:left-0 max-md-mobile:bg-opacity-90 max-md-mobile:bg-lightblue-100 max-md-mobile:p-4 max-md-mobile:border-t max-md-mobile:border-dark-100 max-md-mobile:shadow-2xl"
        onSubmit={submitForm}
      >
        <Input
          placeholder={selectedPrimaryOption === 'domain' ? 'Enter your domain name' : 'Enter your writing topic'}
          value={searchValue || ''}
          setInputData={getSearchValue}
          required={true}
          className="max-md-mobile:p-6 p-8 pr-[60px] focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
          name="search"
        />
        {refresh ? (
          <Link
            href="/"
            className="absolute top-[19px] right-[15px] max-md-mobile:top-[30px] max-md-mobile:right-[30px]"
          >
            <IconReplay />
          </Link>
        ) : (
          <button
            className="absolute top-[19px] right-[15px] max-md-mobile:top-[30px] max-md-mobile:right-[30px]"
            type="submit"
          >
            <IconSubmit />
          </button>
        )}
      </form>
      {error?.active && (
        <ErrorNotification active={error?.active} message={error?.message} />
      )}
    </Wrapper>
  );
};

export default Search;
