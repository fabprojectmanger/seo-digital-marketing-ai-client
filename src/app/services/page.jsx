import React from "react";
import ComingSoon from "../../sections/coming-soon/coming-soon";
import Wrapper from "../../components/wrapper/wrapper";
import Container from "../../components/container/container";
import H1 from "../../components/headings/h1";
import ServiceComponent from './serviceComponent'
import {ServicesData} from './serviceJson'

const page = () => {
  return (
    <Wrapper>
      <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
        <Container className=" items-center flex justify-center max-md-tab:flex-col-reverse">
          <Wrapper className="max-w-[50%] max-md-tab:max-w-full">
            <H1
              as={"tag"}
              className="text-4xl font-semibold tracking-tight hidden"
            >
              Seogenieai: Your All-in-One Best SEO Tools for Small Businesses
              and SEO Content Writing Tools
            </H1>
            <H1 className="!text-5xl font-semibold !leading-tight tracking-tight max-xl:text-4xl max-sm-tab:text-2xl">
              <span className="text-dark-100 font-bold">Seogenieai:</span> Your
              Partnering with you on your Digital Journey
            </H1>
            <p className="mt-5 text-lg">
              {/* <strong>Crafted by Devopmind, </strong> */}
              <span>
                From inception, to execution, to sustainment... we can help. Are
                you just beginning your digital journey? Are you moving through
                a digital transition? Do you simply need an extra hand in
                sustaining what you&apos;ve already got? We&apos;ve got you.
              </span>
            </p>
          </Wrapper>
        </Container>
      </Wrapper>
      <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
        <Container className=" items-center flex justify-center">
          <Wrapper className="">
            <Wrapper className="flex justify-between max-sm-tab:flex-col gap-5 my-8">
              <Wrapper className="flex-1">
                <h2 className="text-4xl leading-[29.08px] tracking-[-0.01em] font-semibold text-center">
                  What Services We Offer
                </h2>
              </Wrapper>
            </Wrapper>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {ServicesData.map((item)=>(
              <ServiceComponent key={item.id} props={item}/>
            ))}
              </div>

          </Wrapper>
        </Container>
      </Wrapper>
    </Wrapper>
  );
};

export default page;
