"use client";
import "../../response/TextResponse/TextResponse.css";
import "./style.css";
import Wrapper from "../../../components/wrapper/wrapper";
import Container from "../../../components/container/container";
import { useEffect, useState } from "react";
import BackToHome from "../../../components/back-to-home/BackToHome";
import H4 from "../../../components/headings/h4";
import axios from "axios";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import Processing from "../../../components/processing/Processing";
import HireExpret from '../../../components/hire-an-expert/HireExpret'
import { TextToHTML, TextToHTMLTag } from "../../../utils/TextToHtml";
import ErrorNotification from "../../../components/notification/error/ErrorNotification";
import Link from "next/link";
const Index = () => {
    const [streamedResponse, setStreamedResponse] = useState("");
    const STREAMING_DELAY = 40;  
  const [showItem, setShowItem] = useState(false);
  const { domain, setError, error } = useTheme();
  const [processing, setLoader] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const items = [
    {
      name: "Desktop",
    },
    {
      name: "Mobile",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 1000);
  }, []);
  useEffect(() => {
    if (reportShow) {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex <= reportShow.length) {
          setStreamedResponse(reportShow.substring(0, currentIndex));          
          currentIndex = currentIndex + 9;
        } else {
          clearInterval(timer);
        }
      }, STREAMING_DELAY);

      return () => clearInterval(timer);
    }
  }, [reportShow]);
  const getOption = async (value) => {
    try {
      setLoader({
        message:"Fetching Data"
      });
      const do_main = domain || localStorage.getItem("domain");
      const res = await axios
        .post("https://seogenieai.com/api/pagespeed", {
          url: do_main.includes("https") ? do_main : "https://" + do_main,
          type: value.toLowerCase(),
        })
        .then(async (response) => {
            setLoader({
                message:"Analyzing Data"
              });

          const url = `https://seogenieai.com/api/chat`;
          const streamResponse = await axios
            .post(url, {
              pageSpeedInsights: true,
              userPrompt: response.data,
            })
            .then(async (response) => {
              setLoader(false);          
             if(response.data.includes('body')){
                let data = response.data.split('<body>')
                setReportShow(data[1])
             }
            else if(!response.data.includes('<html>') && !response.data.includes('<body>')){
                let data = TextToHTMLTag(response.data);
                setReportShow(data)
             }
             else{
                setReportShow(response.data)
             }
            

            }).catch((error)=>{
                setError({
                    status:true,
                    message:"Something Went Wrong! Try again later."
                })
            });

        })
        .catch(function (error) {
            setError({
                status:true,
                message:"Something Went Wrong! Try again later."
            })
        });
    } catch (error) {
        setError({
            status:true,
            message:"Something Went Wrong! Try again later."
        })
    }
  };
  return (
    <Container>
      
      {processing && !reportShow && (
        <Wrapper className="min-h-[calc(100vh-119px)] flex items-center justify-center">
          <Processing heading={processing?.message} />
        </Wrapper>
      )}
      {reportShow && 
       <Wrapper
       className={`${
         showItem
           ? " translate-x-0 opacity-100"
           : " translate-x-full opacity-0 "
       } duration-300`}
     >
      <Link
      onClick={(e)=>{
        e.preventDefault()
        setReportShow(false)
      }}
    href={'/'}
    className={`text-base uppercase font-semibold mb-6 inline-block`}
  >
    ← {'Back to options'}
  </Link>
     </Wrapper>
}
      {!processing && !reportShow && 
      <Wrapper className="space-y-4 max-w-[340px]">
             <Wrapper
          className={`${
            showItem
              ? " translate-x-0 opacity-100"
              : " translate-x-full opacity-0 "
          } duration-300`}
        >
          <BackToHome />
        </Wrapper>
        {items &&
          items.map((item, i) => (
            <div
              style={{ transitionDelay: i + "00ms" }}
              key={i}
              className={`${
                showItem
                  ? " translate-x-0 opacity-100"
                  : " translate-x-full opacity-0 "
              } duration-300 px-[31px] py-[18px] border-2 border-black border-opacity-30 relative rounded-[10px] hover:bg-dark-100 group transition-all `}
            >
              <H4 className="text-dark-100 group-hover:text-white transition-all duration-300">
                {item.name}
              </H4>

              <button
                onClick={() => getOption(item.name)}
                className="absolute top-0 left-0 w-full h-full"
              ></button>
            </div>
          ))}
      </Wrapper>
}
{reportShow &&   <div className='bg-white p-8 rounded-2xl  mb-8 overflow-auto'>
    <HireExpret />
  <div className={` text-base text-black font-medium leading-7 htmlIncluded`} dangerouslySetInnerHTML={{ __html: streamedResponse }} />
  </div>}
 {error && <ErrorNotification active={error?.status} message={error?.message} /> } 
    </Container>
  );
};

export default Index;
