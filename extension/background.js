/*global chrome*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TEXT_SELECTED") {
      console.log("Selected text:", message.text);
  
      // Do something with the text (store it, send it to the popup, etc.)
      chrome.storage.local.set({ selectedText: message.text });
    }
  });
  