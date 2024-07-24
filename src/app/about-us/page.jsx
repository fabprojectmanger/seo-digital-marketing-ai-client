import React from "react";
import ComingSoon from "../../sections/coming-soon/coming-soon";
import Wrapper from "../../components/wrapper/wrapper";
import Container from "../../components/container/container";
import H1 from "../../components/headings/h1";
import Image from "next/image";
import Text from "../../components/text/text";
export const metadata = {
  title: "About Us - SeoGenieAI | Best SEO Tools for Small Businesses",
  description:
    "Learn about SeoGenieAI, the best SEO content writing and keyword research tool for small businesses, designed to enhance your online presence and drive success.",
  openGraph: {
    title: "About Us - SeoGenieAI | Best SEO Tools for Small Businesses",
    description:
      "Learn about SeoGenieAI, the best SEO content writing and keyword research tool for small businesses, designed to enhance your online presence and drive success.",
  },
  keywords: [
    "SEO Content Writing Tools",
    "Best SEO Tools for Small Businesses",
    "Best SEO Keyword Research Tool",
    "Long Tail Keyword Research Tool",
  ],
};
const page = () => {
  return (
    <Wrapper>
      <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
        <Container className=" items-center flex justify-between max-md-tab:flex-col-reverse">
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
              All-in-One Best SEO Tools for Small Businesses and SEO Content
              Writing Tools
            </H1>
            <p className="mt-5 text-lg">
              <strong>Crafted by Devopmind, </strong>
              <span>
                Seogenieai is a revolutionary tool designed to empower
                businesses and content creators with the ultimate website
                analysis and content writing tool. We understand the
                ever-evolving digital landscape and the constant struggle to
                stay ahead of the curve. Seogenieai is your one-stop solution
                for crafting high-quality content that resonates with your
                audience and ranks organically in search engines.
              </span>
            </p>
          </Wrapper>
          <Wrapper className="max-w-[40%] max-md-tab:max-w-full">
            <Image
              alt="Image"
              src="/assets/images/SEO Analysis.png"
              width={800}
              quality={100}
              height={800}
            />
          </Wrapper>
        </Container>
        <Image
          className="absolute top-0 right-0 max-w-[40%] z-[-1]"
          src="/assets/images/graphic.png"
          alt="Graphic"
          height={960}
          width={1414.88}
        />
      </Wrapper>
      <Wrapper className="border-y border-dark-100 py-16">
        <Container>
          <Wrapper className="">
            <Wrapper className="flex justify-between max-sm-tab:flex-col gap-5">
              <Wrapper className="flex-1">
                <h2 className="text-4xl leading-[29.08px] tracking-[-0.01em] font-semibold">
                  What We Offer:
                </h2>
              </Wrapper>
              <Wrapper className="space-y-8 flex-[2]">
                <Wrapper>
                  <Wrapper className="text-xl font-semibold mb-2 relative">
                    1. In-depth Website Analysis:
                  </Wrapper>
                  <Text className="text-base leading-tight">
                    Gain valuable insights into your website&apos;s performance with
                    our <strong>Best SEO Tools for Small Businesses. </strong>
                    We delve deep into technical SEO, content quality, and
                    on-page optimization, to provide actionable data to
                    strengthen your online presence.
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Wrapper className="text-xl font-semibold mb-2  relative">
                    2. AI-Powered Content Writing:
                  </Wrapper>
                  <Text className="text-base leading-tight">
                    Let our cutting-edge
                    <strong> SEO Content Writing Tools</strong>
                    assistant take the heavy lifting off your shoulders.
                    Generate high-quality content ideas, overcome writer&apos;s
                    block, and create compelling and informative pieces that
                    captivate your target audience.
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Wrapper className="text-xl font-semibold mb-2 relative">
                    3. Keyword Research:
                  </Wrapper>
                  <Text className="text-base leading-tight">
                    Discover the most relevant keywords to target your ideal
                    audience with the
                    <strong> Best SEO Keyword Research Tool </strong>. Identify
                    high-performing keywords, analyze search intent, and
                    optimize your content for maximum visibility.
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Wrapper className="text-xl font-semibold mb-2 relative">
                    4. Seamless Integration:
                  </Wrapper>
                  <Text className="text-base leading-tight">
                    Seogenieai seamlessly integrates with your existing
                    workflow, making content creation a breeze. Our
                    user-friendly interface allows you to effortlessly analyze
                    your website, generate content ideas, and refine your
                    writing within a single platform.
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Wrapper className='flex py-16 max-md-tab:flex-col max-md-tab:gap-16'>
            <Wrapper className='pr-12 max-md-tab:pr-0'>
              <Wrapper className="text-2xl font-semibold mb-2 relative text-center">
                The Devopmind Difference:
              </Wrapper>
              <Text className="text-base leading-snug text-center">
                Developed by the experts behind Devopmind, Seogenieai is built
                upon a foundation of innovation and expertise. We are a team of
                passionate developers and SEO professionals dedicated to
                providing cutting-edge solutions that empower your online
                success.
              </Text>
            </Wrapper>
            <Wrapper className='pl-12 max-md-tab:pl-0'>
              <Wrapper className="text-2xl font-semibold mb-2 relative text-center">
                Join the Seogenieai Revolution:
              </Wrapper>
              <Text className="text-base leading-snug text-center">
                Stop struggling with website analysis and content creation! Let
                Seogenieai be your partner in achieving online dominance. With
                our powerful tools and intuitive interface, you can create
                high-performing content that drives traffic, boosts engagement,
                and propels your website to the top of search engine results.
              </Text>
            </Wrapper>
          </Wrapper>
        </Container>
      </Wrapper>
    </Wrapper>
  );
};

export default page;
