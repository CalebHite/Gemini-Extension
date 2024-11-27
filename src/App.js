import React, { useState } from "react";
import { candidateCount, temperature, wordCount, updateValues } from "./gemini";

function App() {
  const [numCandidates, setNumCandidates] = useState(candidateCount);
  const [temp, setTemp] = useState(temperature);
  const [numWords, setNumWords] = useState(wordCount);

  // Handler to update state based on input changes
  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "candCount") {
      setNumCandidates(Number(value));
    } else if (name === "temperature") {
      setTemp(Number(value));
    } else if (name === "wordCount") {
      setNumWords(Number(value));
    }
  }

  // Handler for form submission
  function handleSubmit(event) {
    event.preventDefault();
    updateValues(numCandidates, temp, numWords);
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Gemini Helper Settings</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="candCount">Number of Responses:</label>
          <input
            type="number"
            id="candCount"
            name="candCount"
            value={numCandidates}
            onChange={handleChange}
            min="1"
            step="1"
          />
        </div>
        <br></br>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="temperature">Randomness of Response:</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={temp}
            onChange={handleChange}
            min="0"
            max="1"
            step="0.01"
          />
        </div>
        <br></br>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="wordCount">Word Count:</label>
          <input
            type="number"
            id="wordCount"
            name="wordCount"
            value={numWords}
            onChange={handleChange}
            min="1"
            step="1"
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default App;
