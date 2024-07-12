"use client";
import React from "react";
import TextResponse from "../TextResponse/TextResponse";
import Container from "../../../components/container/container";
import Search from "../../home/Search";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
const Index = () => {
  const { promptMessage, domain } = useTheme();
  return (
    <Container className='h-full min-h-[calc(100vh-155px)] flex flex-col justify-between pb-8'>
      <TextResponse />
      <Search value={promptMessage || domain} refresh={true} />
    </Container>
  );
};

export default Index;
