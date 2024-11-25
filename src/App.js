/*global chrome*/
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


function App() {
  const [selectedText, setSelectedText] = useState("");
  const [enteredPrompt, setPrompt] = useState("");
  const [queryResponse, setResponse] = useState("");
  
  // do NOT leave api key when pushing to github
  const genAI = new GoogleGenerativeAI("AIzaSyChASsVBWmAfZjm3AscwnEmFqrlFWv87NY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const makeQuery = async () => {
    try{
      const prompt = enteredPrompt + ": " + selectedText;

      const result = await model.generateContent(prompt);
      setResponse(result.response.text());

    } catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        value={enteredPrompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter Prompt: "
      />
      <input
        type="button"
        onClick={() => {
          makeQuery();
        }}
        value="Test"
      />
      <p>Selected Text: {selectedText || "No text selected yet"}</p>
      
      <p>{queryResponse}</p>
    </div>
  );
}

export default App;
