/*global chrome*/


import React, { useEffect, useState } from "react";

function App() {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Selected Text</h1>
      <p>{selectedText || "No text selected yet"}</p>
    </div>
  );
}

export default App;
