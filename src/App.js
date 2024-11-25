/*global chrome*/


import React, { useEffect, useState } from "react";

function App() {
  const [selectedText, setSelectedText] = useState("");
  const [enteredPrompt, setPrompt] = useState("");

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
          alert(enteredPrompt);
        }}
        value="Test"
      />
      <p>Selected Text: {selectedText || "No text selected yet"}</p>
    </div>
  );
}

export default App;
