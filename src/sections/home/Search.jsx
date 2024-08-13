"use client";
import Input from "../../components/input";
import Wrapper from "../../components/wrapper/wrapper";
import React, { useEffect, useState } from "react";
import IconSubmit from "../../../public/icons/IconSubmit";
import IconReplay from "../../../public/icons/IconReplay";
import ErrorNotification from "../../components/notification/error/ErrorNotification";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const Search = ({ value, refresh }) => {
  const path = usePathname();
  const [searchValue, setSearchValue] = useState(value || "");
  const {
    setError,
    error,
    setDomain,
    setPromptMessage,
    selectedPrimaryOption,
    searchEnabled,
    setSearchEnabled,
    setIsInputDisabled,
    isInputDisabled,
  } = useTheme();
  useEffect(() => {
    if (searchEnabled != 0) {
      setSearchValue("");
      setIsInputDisabled(false);
    }
  }, [searchEnabled]);
  useEffect(() => {
    if (path === "/") {
      setIsInputDisabled(false);
    }
  }, [path]);
  const route = useRouter();
  const getSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  function isValidDomainString(url) {
    const pattern =
      /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+(\.[a-z]{2,6})(\/\S*)?$/i;
    return pattern.test(url);
  }
  const submitForm = (e) => {
    e.preventDefault();
    if (
      selectedPrimaryOption === "domain" ||
      selectedPrimaryOption === "insight"
    ) {
      if (!isValidDomainString(searchValue)) {
        setError({
          active: true,
          message: "Please add a valid domain.",
        });
      } else {
        setIsInputDisabled(true);
        setDomain(searchValue);
        setPromptMessage(searchValue);
        setSearchEnabled(0);
        if (selectedPrimaryOption === "domain") {
          route.push("/options");
        }
        if (selectedPrimaryOption === "insight") {
          route.push("/insight");
        }
      }
    } else {
      setIsInputDisabled(true);
      setPromptMessage(searchValue);
      setSearchEnabled(0);
      route.push("/response");
    }
  };
  return (
    <Wrapper className="">
      <form
        className="relative w-full mt-[14px] "
        onSubmit={submitForm}
      >
        <Input
          disabled={isInputDisabled}
          placeholder={
            selectedPrimaryOption === "domain" ||
            selectedPrimaryOption === "insight"
              ? "Enter your domain name (www.example.com)"
              : "Enter your writing topic"
          }
          value={searchValue || ""}
          setInputData={getSearchValue}
          required={true}
          className="max-md-mobile:p-6 p-8 pr-[60px] focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] max-mb:text-[12px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
          name="search"
        />
        {refresh ? (
          <Link
            href="/"
            className="absolute top-[19px] right-[15px] max-mb-mobile:top-[15px] max-mb-mobile:right-[15px]"
          >
            <IconReplay className={"w-[42px] h-[43px] max-mb:w-[25px] max-mb:h-[25px]"}/>
          </Link>
        ) : (
          <button
            className="absolute top-[19px] right-[15px] max-mb-mobile:top-[25px] max-mb-mobile:right-[15px]"
            type="submit"
          >
            <IconSubmit className={"w-[42px] h-[43px] max-mb:w-[25px] max-mb:h-[25px]"}/>
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
