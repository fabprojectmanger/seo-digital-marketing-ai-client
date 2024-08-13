"use client";
import React from "react";
import Container from "../../components/container/container";
import Wrapper from "../../components/wrapper/wrapper";
import Link from "next/link";
import Image from "next/image";
import SiteLogo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="py-6 max-md-tab:py-8">
      <Wrapper>
        <Container className={""}>
          <Wrapper className=" bg-white rounded-xl">
            <Wrapper className=" p-4 flex items-center justify-between">
            <footer class="flex flex-row flex-wrap items-center justify-center w-full text-center border-t gap-y-6 gap-x-12 border-blue-gray-50 md:justify-between">
            <Wrapper className="min-w-[171px] max-lg:flex-1 max-md-tab:flex max-md-tab:justify-center">
            <Link href="/">
              <Image
                src={SiteLogo.src}
                alt="SEOGENIE"
                width={171}
                height={36}
              />
            </Link>
          </Wrapper>
              <ul class="flex flex-wrap items-center justify-center gap-y-2 gap-x-8">
                <li>
                  <Link 
                    href="/about-us"
                    class="block font-sans text-[12px] md:text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="contact-us"
                    class="block font-sans text-[12px] md:text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    class="block font-sans text-[12px] md:text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="/terms-of-conditions"
                    class="block font-sans text-[12px] md:text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-of-services"
                    class="block font-sans text-[12px] md:text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
                  >
                    Terms of Services
                  </a>
                </li>
              </ul>
            </footer>
            </Wrapper>
            <Wrapper className="flex p-2 items-center justify-center rounded-b-xl bg-[#00668c]">
              <span className="text-white text-center">Designed and Developed by <Link className="underline" href="https://devopmind.com" target="blank">Developer OP Mind</Link></span>
            </Wrapper>
          </Wrapper>
        </Container>
      </Wrapper>
    </footer>
  );
};
export default Footer;
