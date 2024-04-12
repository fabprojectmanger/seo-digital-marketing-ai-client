import "./TextResponse.css";
import { useEffect, useRef, useState } from "react";
import { useSEOContext } from "../../context/SEOContext";
import SeoChatAI from "../../helpers/chat";
import RestartRobot from "../../assets/restart-robot.gif";
import StreamResponse from "../StreamResponse/StreamResponse";

const TextResponse = () => {
  let { googleResponse, restartRequired, aiResponse, setAiResponse, setIsTypingLoaderEnabled } =
    useSEOContext();

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      getChatGPTResponse();
    }
  }, []);

  async function getChatGPTResponse() {
    if (!googleResponse) return;
    setAiResponse("");

    let promptMessage;

    promptMessage = `
    You have been provided with Google Analytics data. 
    Please analyze the data and provide detailed insights in a structured manner. 
    Ensure comprehensive coverage of the each relevant information provided: \n\n
      ${JSON.stringify(googleResponse, null, 2)}\n\n
    Make sure not to reference to the data provided above, in the response for the introductory lines or titles like 'After analyzing the provided Google Analytics data',  this should be taken care of while generating a response
    `;

    if (googleResponse.length > 0) {
      if (googleResponse[0]?.noAnalyticsAccountFound) {
        promptMessage = `Respond with: You do not have an analytics account associated with the provided email.`;
      }
      if (googleResponse[0]?.noMatchFoundForDomain) {
        promptMessage = `Respond with: No data is available for the provided domain in this analytics account. Please verify the domain name and ensure it is correctly linked to the analytics account.`;
      }
    }

    setIsTypingLoaderEnabled(true);
    const response = await SeoChatAI.initiateChat(promptMessage);
    if (response?.isStreamed) {
      setAiResponse(response.answer);
    } else {
      restartRequired.current = true;
    }
    setIsTypingLoaderEnabled(false);
  }

  return (
    <div className="seo__text-response-cont">
      {restartRequired.current ? (
        <div className="seo__text-response-restart">
          <img src={RestartRobot} alt="Restarting robot..." />
          <span>Something went wrong!!</span>
        </div>
      ) : (
        aiResponse && <StreamResponse paragraph={aiResponse} />
      )}
    </div>
  );
};

export default TextResponse;
