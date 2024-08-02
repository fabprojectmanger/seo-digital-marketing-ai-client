"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import Container from "../../components/container/container";
import H1 from "../../components/headings/h1";
import Input from "../../components/input";
import axios from "axios";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import SuccessNotification from '../../components/notification/success/SuccessNotification'
// import ComingSoon from '../../sections/coming-soon/coming-soon'

const Page = () => {
  const {setError, setSuccess,success} = useTheme();
  const [showItem, setShowItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true)
    const resp = await axios.post("https://seogenieai.com/api/send-email",formData).then(response=>{
      setLoading(false)
      setFormData({
        name: "",
        email: "",
        message: "",
        subject:""
      })
       
      setSuccess({
        status:true,
        message:response.data
      })
     }).catch(error=>{
      setLoading(false)
      setError({
        status:true,
        message:'Something went wrong. Try again later.'
      })
    });


  };
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 200);
  }, []);
  return (
    <Wrapper>
      <Container>
        <form
          onSubmit={handleSubmit}
          className="max-w-[800px] mx-auto mt-16 mb-16"
        >
          <H1
            className={` ${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300 !text-4xl text-center mb-8 font-semibold tracking-normal`}
          >
            Contact Us
          </H1>
          <Wrapper
            className={`${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300 delay-100`}
          >
            <label className="mb-3 block ">Enter your Name</label>
            <Wrapper>
              <Input
                type='text'
                placeholder={"Name"}
                value={formData?.name || ""}
                // setInputData={getFormData}
                required={true}
                className="max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                name="name"
                setInputData={handleChange}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            className={`${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300 delay-200`}
          >
            <label className="mb-3 mt-5 block ">Enter your Email</label>
            <Wrapper>
              <Input
                type='email'
                placeholder={"Email"}
                value={formData?.email || ""}
                // setInputData={getFormData}
                required={true}
                className="max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                name="email"
                setInputData={handleChange}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            className={`${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300  delay-300`}
          >
            <label className="mb-3 mt-5 block ">Enter your Subject</label>
            <Wrapper>
              <Input
              type='text'
                placeholder={"Subject"}
                value={formData?.subject || ""}
                // setInputData={getFormData}
                required={true}
                className="max-md-mobile:p-6 p-4 pr-[60px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
                name="subject"
                setInputData={handleChange}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            className={`${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300  delay-[400ms]`}
          >
            <label className="mb-3 mt-5 block ">Enter your Message</label>
            <Wrapper>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="max-md-mobile:p-6 p-4 pr-[60px] h-[150px] placeholder:opacity-80 focus:border-dark-100  border-2 border-black placeholder:text-black w-full bg-transparent border-opacity-30  rounded-[10px] text-base font-normal text-black leading-[15.96px] tracking-[0.02em]"
              ></textarea>
              
            </Wrapper>
          </Wrapper>
          <Wrapper
            className={`${
              showItem
                ? " translate-x-0 opacity-100"
                : " translate-x-full opacity-0 "
            } duration-300 delay-500`}
          >
            <button
              type="submit"
              className={`${
                loading
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : ""
              } max-md-mobile:p-6 p-4 pr-[30px} w-full mt-6 text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100  transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white hover:bg-transparent hover:text-dark-100`}
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </Wrapper>
        </form>
      </Container>
      <SuccessNotification active={success?.status} message={success?.message} />
    </Wrapper>
  );
};

export default Page;
