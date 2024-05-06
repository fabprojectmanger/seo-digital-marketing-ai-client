import Axios from "./axios.js";

const initiateChat = async (userPrompt) => {
  try {
    const url = `${Axios.BASE_SERVER_URL}/api/chat`;
    const streamResponse = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userPrompt }),
    });
    if (!streamResponse.ok || !streamResponse.body) {
      throw streamResponse.statusText;
    }

    // Here we start prepping for the streaming response
    const reader = streamResponse.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;
    let answer = "";

    while (loopRunner) {
      // Here we start reading the stream, until its done.
      const { value, done } = await reader.read();
      if (done) {
        return { isStreamed: true, answer };
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      answer = answer + decodedChunk;
    }
  } catch (err) {
    console.error(err);
    return { isStreamed: false };
  }
};

const SeoChatAI = {
  initiateChat,
};

export default SeoChatAI;
