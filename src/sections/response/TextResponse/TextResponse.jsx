"use client";
import "./TextResponse.css";
import { useEffect, useRef, useState } from "react";
import StreamResponse from "../stream-response";
import SeoChatAI from "../../../utils/chat";
import { useTheme } from "../../../contexts/theme/ThemeProvider";
import RestartRobot from '../../../assets/images/restart-robot.gif'
import H4 from "../../../components/headings/h4";
import Wrapper from "../../../components/wrapper/wrapper";
const TextResponse = () => {
  let {
    googleResponse,
    promptMessage,
    restartRequired,
    aiResponse,
    setAiResponse,
    isTypingLoaderEnabled,
    setIsTypingLoaderEnabled,
    setIsInputDisabled,
    setHasFinalizedPrompt,
  } = useTheme();

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      getChatGPTResponse();
    }
  }, []);

  async function getChatGPTResponse() {
    setAiResponse("");
    setIsTypingLoaderEnabled(true);

    let prompt = promptMessage;
    let response;

    if (googleResponse) {
      prompt = `report: \n${JSON.stringify(googleResponse, null, 2)}\n`;

      if (googleResponse.length > 0) {
        if (googleResponse?.noAnalyticsAccountFound) {
          prompt = `Respond with: You do not have an analytics account associated with the provided email.`;
        }
        if (googleResponse?.noMatchFoundForDomain) {
          prompt = `Respond with: No data is available for the provided domain in this analytics account. Please verify the domain name and ensure it is correctly linked to the analytics account.`;
          setHasFinalizedPrompt(false);
          setIsInputDisabled(false);
        }
      }
      response = await SeoChatAI.initiateChat(prompt);
    } else {
      response = await SeoChatAI.initiateChat(prompt, {
        nonHtmlResponse: true,
      });
    }

    if (response?.isStreamed) {
      setAiResponse(response.answer);
    } else {
      restartRequired.current = true;
    }
    setIsTypingLoaderEnabled(false);
  }

  return (
    <div className={`seo__text-response-cont h-full flex flex-col ${!aiResponse && !restartRequired.current ? 'justify-center' : ''} ${restartRequired.current ? ' justify-center' : ''}`}>
      {!aiResponse && !restartRequired.current && (
      <Wrapper className=''>
          <div class={`flex space-x-2 justify-center items-center`}>
              <span class="sr-only">Loading...</span>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div class="h-4 w-4 bg-dark-100 rounded-full animate-bounce"></div>
            </div>
            <H4 className={`text-center !text-2xl uppercase text-dark-100`}>PROCESSING Data</H4>
      </Wrapper>        
      )}
      {restartRequired.current ? (
        <div className="seo__text-response-restart h-full -mt-24">
          <img src={RestartRobot.src} alt="Restarting robot..." />
          <H4 className={`text-center !text-2xl uppercase text-dark-100`}>Something went wrong!!</H4>
        </div>
      ) : (
        aiResponse && <StreamResponse paragraph={aiResponse} />
      )}
    </div>
  );
};

export default TextResponse;
