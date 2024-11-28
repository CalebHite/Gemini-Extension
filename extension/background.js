/*global chrome*/

import { GoogleGenerativeAI } from "@google/generative-ai";

async function getResult(model, prompt) {
    const result = await model.generateContent(prompt).response.text();
    return result
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendPrompt") {
    const genAI = new GoogleGenerativeAI("AIzaSyChASsVBWmAfZjm3AscwnEmFqrlFWv87NY");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "Answer the question in 100 words or less."
    })

    const result = `You sent: ${message.prompt}`;

    // Send a response back to the content script
    sendResponse({ result: getResult(model, message.prompt) });
  }
  return true; // Keeps the message channel open for asynchronous responses
});
