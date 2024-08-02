"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper/wrapper";
import Container from "../../../components/container/container";
import Input from "../../../components/input";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import ErrorNotification from "../../../components/notification/error/ErrorNotification";
import Text from "../../../components/text/text";
import H1 from "../../../components/headings/h1";
import { TextToHTML } from "../../../utils/TextToHtml";
import HireExpret from '../../../components/hire-an-expert/HireExpret'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "./style.css";
import Processing from "../../../components/processing/Processing";
import Link from "next/link";
import BackToHome from "../../../components/back-to-home/BackToHome";
const Index = () => {
  const [formData, setFormData] = useState({
    userPrompt: "",
    keyWordsContent: true,
    userPromptValue: "",
  });
  const [tryFormData, setTryFormData] = useState({
    userPrompt: "",
    keyWordsContent: true,
  });
  const [showItem, setShowItem] = useState(false);
  const { setError, error, setDomain } = useTheme();
  const [countryid, setCountryid] = useState(0);
  const [countryObject, setCountryObject] = useState("");
  const [stateid, setStateid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonTable, setJsonTable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState(false);
  const [commaSperateValues, setCommaSperateValues] = useState([]);
  const [keywordLengthError, setKeywordLengthError] = useState(false);
  const [keywordCode, setKeywordCode] = useState("");
  const [lengthVal, setLengthVal] = useState(0);
  const [tryLoader, setTryLoader] = useState(false);
  useEffect(() => {
    const values = formData.userPrompt
      ? formData?.userPrompt + "," + keywordCode
      : keywordCode;
    setFormData((prev) => ({
      ...prev,
      userPrompt: values,
    }));
  }, [keywordCode]);
  const getKeywordLengthError = (e) => {
    const checkLength = formData.userPrompt;
    const length = checkLength.length + e.target.value.length;
    setLengthVal(length);
    if (commaSperateValues.length === 0) {
      setFormData((prev) => ({
        ...prev,
        userPrompt: e.target.value,
      }));
    }
    if (length > 80) {
      setKeywordLengthError({
        active: true,
        message: "The keyword may not be greater then 80 character.",
      });
    } else {
      setKeywordLengthError({
        active: false,
      });
    }
    if (length < 81) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.replace(",", ""),
      }));
    }
  };
  const commaSperate = (e) => {
    if (
      (e.keyCode == 188 || e.keyCode == 13) &&
      formData?.userPromptValue != "" &&
      lengthVal < 81
    ) {
      if (
        commaSperateValues &&
        !commaSperateValues.includes(formData?.userPromptValue)
      ) {
        if (commaSperateValues.includes(formData?.userPromptValue)) {
          setKeywordLengthError({
            active: false,
          });
        }
        setKeywordCode(formData?.userPromptValue);
        const values = commaSperateValues || [];
        values.push(formData?.userPromptValue);
        setCommaSperateValues(values);
        setFormData((prev) => ({
          ...prev,
          userPromptValue: "",
        }));
      } else {
        setTimeout(() => {
          setKeywordLengthError({
            active: true,
            message:
              "This keyword is already in list. Please add another keyword.",
          });
        }, 200);
      }
    }
  };
  const removeKeyword = (value) => {
    const values = commaSperateValues.filter(function (item) {
      return item !== value;
    });
    const arr = formData.userPrompt.split(",");
    setTimeout(() => {
      const val = arr.filter(function (item) {
        return item !== value;
      });
      setFormData((prev) => ({
        ...prev,
        userPrompt: val.toString(),
      }));
      if (val.length < 81) {
        setKeywordLengthError({
          active: false,
        });
      }
    }, 200);
    setCommaSperateValues(values);
  };
  const getFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      keyWordsContent: true,
      userPrompt: "",
    }));
  };
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 200);
  }, []);
  useEffect(() => {
    if (countryObject) {
      setCountryid(countryObject.id);
    }
  }, [countryObject]);
  const isValidDomainString = (url) => {
    const pattern =
      /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+(\.[a-z]{2,6})(\/\S*)?$/i;
    return pattern.test(url);
  };
  const getTryFormData = (e) => {
    setTryFormData((prev) => ({
      ...prev,
      keyWordsContent: true,
      userPrompt: e.target.value,
    }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (formData?.domain && !isValidDomainString(formData?.domain)) {
      setError({
        active: true,
        message: "Please add a valid domain.",
      });
    } else if (formData?.userPrompt === "") {
      setKeywordLengthError({
        active: true,
        message: "Please add a keyword.",
      });
    } else if (keywordLengthError.length > 80) {
      setError({
        active: true,
        message: "The keyword may not be greater then 80 character.",
      });
    } else {
      setLoading(true);
      setProcessing(true);
      setDomain(formData?.domain);
      try {
        const url = `https://seogenieai.com/api/chat`;
        const streamResponse = await fetch(url, {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        });
        if (!streamResponse.ok || !streamResponse.body) {
          throw streamResponse.statusText;
        }

        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;
        let answer = "";

        while (loopRunner) {
          const { value, done } = await reader.read();
          if (done) {
            return { isStreamed: true, answer };
          }
          const decodedChunk = decoder.decode(value, { stream: true });
          answer = answer + decodedChunk;
          if (answer) {
            setJsonTable(answer);
            setProcessing(false);
            setLoading(false);
          }
        }
      } catch (err) {
        setProcessing(false);
        setLoading(false);
        console.error(err);
        return { isStreamed: false };
      }
    }
  };
  const submitTryForm = async (e) => {
    e.preventDefault();

    if (tryFormData?.userPrompt === "") {
      setError({
        active: true,
        message: "Please add a keyword.",
      });
    } else if (tryFormData?.userPrompt.length > 80) {
      setError({
        active: true,
        message: "The keyword may not be greater then 80 character.",
      });
    } else {
      setLoading(true);
      setTryLoader(true);
      try {
        const url = `https://seogenieai.com/api/chat`;
        const streamResponse = await fetch(url, {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...tryFormData }),
        });
        if (!streamResponse.ok || !streamResponse.body) {
          throw streamResponse.statusText;
        }

        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;
        let answer = "";

        while (loopRunner) {
          const { value, done } = await reader.read();
          if (done) {
            return { isStreamed: true, answer };
          }
          const decodedChunk = decoder.decode(value, { stream: true });
          answer = answer + decodedChunk;
          if (answer) {
            setTryLoader(false);
            setJsonTable(answer);
            setProcessing(false);
            setLoading(false);
          }
        }
      } catch (err) {
        setProcessing(false);
        setLoading(false);
        console.error(err);
        return { isStreamed: false };
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        {jsonTable && (
          <Wrapper className="flex justify-between items-center mb-6 max-md-tab:flex-col max-md-tab:gap-3">
              <HireExpret />
            <Link
              href="#"
              onClick={() => setJsonTable(false)}
              className={`text-base uppercase font-semibold  inline-block ${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300`}
            >
              ← Search another keyword
            </Link>
            <Wrapper>
              <form
                onSubmit={(e) => submitTryForm(e)}
                className="flex items-center gap-2 max-md-mobile:flex-wrap max-md-mobile:justify-center"
              >
                <H1 className="whitespace-nowrap uppercase text-base font-semibold">
                  Try a keyword:
                </H1>
                <Wrapper className='flex gap-4 w-full'>
                <Input
                  placeholder={"Shoe"}
                  value={tryFormData?.userPrompt || ""}
                  setInputData={getTryFormData}
                  required={true}
                  className="p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                  name="userPrompt"
                />
                <button
                  type="submit"
                  className={`${
                    loading
                      ? "cursor-not-allowed pointer-events-none opacity-50"
                      : ""
                  }}mt-0 text-center block min-h-[57px] min-w-[57px] flex justify-center items-center text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100  transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#e8eaed"
                  >
                    <path d="M762.69-160.92 524.46-399.16q-30 22.77-65.79 35.27-35.79 12.5-73.87 12.5-93.58 0-159.11-65.51-65.53-65.51-65.53-159.04 0-93.52 65.51-159.1 65.51-65.57 159.04-65.57 93.52 0 159.1 65.53 65.57 65.53 65.57 159.11 0 39.23-12.88 75.02-12.89 35.8-34.89 64.64l238.23 238.23-37.15 37.16ZM384.77-403.38q72.31 0 122.46-50.16 50.16-50.15 50.16-122.46t-50.16-122.46q-50.15-50.16-122.46-50.16t-122.46 50.16Q212.15-648.31 212.15-576t50.16 122.46q50.15 50.16 122.46 50.16Z" />
                  </svg>
                </button>
                </Wrapper>
              </form>
            </Wrapper>
          </Wrapper>
        )}
        {!processing && !jsonTable && (
          <form
            onSubmit={(e) => submitForm(e)}
            className="max-w-[800px] mx-auto mt-16 mb-16"
          >
            <Wrapper
              className={` ${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 flex justify-center`}
            >
              <BackToHome />
            </Wrapper>
            <H1
              className={` ${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 !text-4xl text-center mb-8 font-semibold tracking-normal`}
            >
              Google Keyword planner
            </H1>
            <Wrapper
              className={`${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300`}
            >
              <label className="mb-3 block ">
                Please enter your Website URL
              </label>
              <Wrapper>
                <Input
                  placeholder={"www.example.com"}
                  value={formData?.domain || ""}
                  setInputData={getFormData}
                  required={false}
                  className="max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                  name="domain"
                />
              </Wrapper>
            </Wrapper>
            <Wrapper
              className={`${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 delay-75 relative z-10`}
            >
              {keywordLengthError.active && (
                <Wrapper className="text-base text-white flex gap-1 items-center bg-red-400 p-4 rounded-xl mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="M480-290.77q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm-30-146.15h60v-240h-60v240ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                  {keywordLengthError.message}
                </Wrapper>
              )}
              <label className="mb-3 mt-5 block ">
                Please tell us more about your website business model in Keyword{" "}
              </label>
              <Wrapper className="relative">
                <Wrapper
                  className={`${
                    keywordLengthError.active ? "!border-red-700" : ""
                  } flex items-end gap-1 flex-wrap max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]`}
                >
                  {commaSperateValues &&
                    commaSperateValues.map((item, i) => (
                      <span
                        className="text-white flex items-center gap-1 py-1 px-2 rounded bg-dark-100 empty:hidden"
                        key={i}
                      >
                        {item}
                        <button
                          onClick={() => removeKeyword(item)}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#e8eaed"
                          >
                            <path d="M291-253.85 253.85-291l189-189-189-189L291-706.15l189 189 189-189L706.15-669l-189 189 189 189L669-253.85l-189-189-189 189Z" />
                          </svg>
                        </button>
                      </span>
                    ))}

                  <Input
                    wrapperClassName="!w-auto flex-1 inline-block"
                    onKeyDown={commaSperate}
                    placeholder={"Shoes"}
                    value={formData?.userPromptValue || ""}
                    onInput={getKeywordLengthError}
                    className={`placeholder:opacity-80 min-h-7  placeholder:text-black w-full bg-transparent border-opacity-30  text-base font-normal text-black leading-[15.96px] tracking-[0.02em]`}
                    name="userPromptValue"
                  />
                </Wrapper>
                <Text className="mt-2 leading-normal">
                  Example if you business model is Shoes, then you can add shoes
                  as Keyword.
                  <b>
                    {" "}
                    Multiple keywords can be added, separated by commas (,).
                  </b>
                </Text>
              </Wrapper>
              <Wrapper
                className={`${countryid > 0 ? "active-val " : ""} ${
                  showItem
                    ? " translate-x-0 opacity-100"
                    : " translate-x-full opacity-0 "
                } duration-300 delay-200 flex gap-4 w-full max-md-mobile:flex-col justify-between max-md-mobile:gap-0`}
              >
                <Wrapper className="flex-1">
                  <label className="mb-3 mt-5 block ">Country</label>
                  <CountrySelect
                    required={true}
                    defaultValue={countryObject}
                    onInput={(e) => {
                      setFormData((prev) => ({ ...prev, country: e.name }));
                    }}
                    onChange={(e) => {
                      setCountryObject(e);
                      setFormData((prev) => ({ ...prev, country: e.name }));
                      setCountryid(e.id);
                    }}
                    placeHolder="Select Country"
                  />
                </Wrapper>
                <Wrapper className="flex-1">
                  <label className="mb-3 mt-5 block ">State</label>
                  <StateSelect
                    countryid={countryid}
                    onInput={(e) => {
                      setFormData((prev) => ({ ...prev, state: e.name }));
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, state: e.name }));
                      setStateid(e.id);
                    }}
                    placeHolder="Select State"
                  />
                </Wrapper>
                <Wrapper className="flex-1">
                  <label className="mb-3 mt-5 block ">City</label>
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    onInput={(e) => {
                      setFormData((prev) => ({ ...prev, city: e.name }));
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, city: e.name }));
                    }}
                    placeHolder="Select City"
                  />
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              className={`${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 delay-300`}
            >
              <button
                type="submit"
                className={`${
                  loading
                    ? "cursor-not-allowed pointer-events-none opacity-50"
                    : ""
                } max-md-mobile:p-6 p-4 pr-[30px} w-full mt-6 text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100  transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white hover:bg-transparent hover:text-dark-100`}
              >
                {loading ? "Searching Keywords" : "Search Keywords"}
              </button>
            </Wrapper>
          </form>
        )}
        {processing && (
          <Wrapper className="min-h-[calc(100vh-119px)] flex items-center justify-center">
            <Processing />
          </Wrapper>
        )}
        {jsonTable && (
          <Wrapper className="bg-white p-10 mb-10 overflow-auto keyword-response relative rounded-xl">
         <div className={tryLoader ? " animate-pulse pointer-events-none" : ""}>
              <div className={tryLoader ? " opacity-50 html-div" : " html-div"} dangerouslySetInnerHTML={{ __html: jsonTable }}></div>
              </div>
            {tryLoader && (
              <Wrapper className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <Processing />
              </Wrapper>
            )}
          </Wrapper>
        )}
      </Container>
      {error?.active && (
        <ErrorNotification active={error?.active} message={error?.message} />
      )}
    </Wrapper>
  );
};

export default Index;
