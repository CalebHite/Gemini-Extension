/*global chrome*/
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [selectedText, setSelectedText] = useState("");
  const [enteredPrompt, setPrompt] = useState("");
  const [queryResponse, setResponse] = useState("");

  // ADD GEMINI API KEY TO RUN
  const genAI = new GoogleGenerativeAI("");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Answer the question in 200 words or less."
  });

  const makeQuery = async () => {
    try {
      const prompt = `${enteredPrompt}: ${selectedText}`;
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });
  }, []);

  return (
    <div className="app-container">
      <h1>AI Assistant</h1>
      <div className="input-container">
        <input
          className="text-input"
          type="text"
          value={enteredPrompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button className="button" onClick={makeQuery}>
          Search!
        </button>
      </div>
      <div className="output-container">
        <p><strong>Selected Text:</strong> {selectedText || "No text selected yet"}</p>
        <p><strong>Response:</strong> {queryResponse}</p>
      </div>
    </div>
  );
}

export default App;
