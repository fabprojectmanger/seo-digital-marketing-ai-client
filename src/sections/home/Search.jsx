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
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Search = ({ value, refresh }) => {
  const path = usePathname();
  const [searchValue, setSearchValue] = useState(value || "");
  const {
    setGoogleEmail,
    setUserLoggedIn,
    googleEmail,
    setUserName,
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
          if(googleEmail){
            route.push("/options");
          }else {
            login()
          }
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
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      const result = userInfo.data;
      setUserName(userInfo.data?.name);
      const submitData = {
        email: result.email,
        googleToken: tokenResponse,
      };
      try {
        const res = await axios.post("/apis/auth", {
          ...submitData,
        });

        if (res.status === 200) {
          setGoogleEmail(result.email);
          setUserLoggedIn(true);
          route.push("/options");
        }
      } catch (error) {
        setError({
          active: true,
          message: "Oops! Something is wrong. Try again later.",
        });
      }
    },
    scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics",
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  });
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
