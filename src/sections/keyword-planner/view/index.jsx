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
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "./style.css";
import Processing from "../../../components/processing/Processing";
import Link from "next/link";
const Index = () => {
  const [formData, setFormData] = useState("");
  const [showItem, setShowItem] = useState(false);
  const { setError, error, setDomain } = useTheme();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonTable, setJsonTable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState(false);
  const getFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      keyWordsContent: true,
    }));
  };
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 200);
  }, []);

  const isValidDomainString = (url) => {
    const pattern =
      /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+(\.[a-z]{2,6})(\/\S*)?$/i;
    return pattern.test(url);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidDomainString(formData?.domain)) {
      setError({
        active: true,
        message: "Please add a valid domain.",
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
  return (
    <Wrapper>
      <Container>
        {jsonTable && (
          <Link
            href="#"
            onClick={() => setJsonTable(false)}
            className={`text-base uppercase font-semibold mb-6 inline-block ${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300`}
          >
            ← Search another keyword
          </Link>
        )}
        {!processing && !jsonTable && (
          <form
            onSubmit={(e) => submitForm(e)}
            className="max-w-[800px] mx-auto mt-16 mb-16"
          >
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
                  required={true}
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
              <label className="mb-3 mt-5 block ">
                Please tell us more about your website business model in Keyword{" "}
              </label>
              <Wrapper>
                <Input
                  placeholder={"Shoes"}
                  value={formData?.userPrompt || ""}
                  setInputData={getFormData}
                  required={true}
                  className="max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                  name="userPrompt"
                />
                <Text className="mt-2">
                  Example if you business model is Shoes, then you can add shoes
                  as Keyword
                </Text>
              </Wrapper>
              <Wrapper
                className={`${countryid > 0 ? "active-val " : ""} ${
                  showItem
                    ? " translate-x-0 opacity-100"
                    : " translate-x-full opacity-0 "
                } duration-300 delay-200 flex gap-4 max-md-mobile:flex-col max-md-mobile:gap-0`}
              >
                <Wrapper>
                  <label className="mb-3 mt-5 block ">Country</label>
                  <CountrySelect
                    onInput={(e) => {
                      setFormData((prev) => ({ ...prev, country: e.name }));
                    }}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, country: e.name }));
                      setCountryid(e.id);
                    }}
                    placeHolder="Select Country"
                  />
                </Wrapper>
                <Wrapper>
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
                <Wrapper>
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
          <Wrapper className="bg-white p-10 mb-10 overflow-auto keyword-response rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: jsonTable }}></div>
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
