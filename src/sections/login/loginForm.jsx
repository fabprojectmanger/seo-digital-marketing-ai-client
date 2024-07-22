import React from "react";
import Wrapper from "../../components/wrapper/wrapper";
import Container from "../../components/container/container";
import H1 from "../../components/headings/h1";
import Text from "../../components/text/text";
import Link from "next/link";
import Image from "next/image";
const LoginhtmlForm = ({ className }) => {
  return (
    <Wrapper className={" min-h-[calc(100vh-119px)] flex items-center justify-center" + (className || "")}>
      <Container>
        <Wrapper className="flex items-center gap-x-[100px]">
          <Wrapper className="flex-1">
            <H1 className='!text-4xl tracking-tight font-semibold'>Sign in to your account</H1>
            <Text className='mt-3'>
              Don’t have an account yet?
              <Link
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
              >
                Sign up
              </Link>
            </Text>
            <form className="mt-4 max-w-[550px]">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-base font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border min-h-16 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="mt-2">
                <label
                  for="password"
                  className="block mb-2 text-base font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 min-h-16 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full mt-3 text-white bg-dark-100 min-h-16 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <Wrapper>
                <Wrapper></Wrapper>
              </Wrapper>
            </form>
          </Wrapper>
          <Wrapper className="flex-1">
            <Image 
            src='/assets/images/login.png'
            width={800}
            height={800}
            quality={100}
            alt="Login Image"
            />
          </Wrapper>
        </Wrapper>
      </Container>
    </Wrapper>
  );
};

export default LoginhtmlForm;
