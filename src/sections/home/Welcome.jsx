"use client";
import H1 from "../../components/headings/h1";
import Wrapper from "../../components/wrapper/wrapper";
import Image from "next/image";
import Icon from "../../assets/images/icon.png";
import Container from "../../components/container/container";
const Welcome = () => {
  return (
    <Container>
      <Wrapper className="flex flex-col items-center justify-center my-20 max-md-mobile:my-10">
        <Image src={Icon.src} alt="SEOGENIE" width={78} height={78} />
        <H1
          as={"tag"}
          className="text-black mt-[15px] text-center max-md-mobile:text-2xl"
        >
          How can i help you
          <b className="text-dark-100 ml-1">
            <i>Today?</i>
          </b>
        </H1>
        
      </Wrapper>
    </Container>
  );
};

export default Welcome;
