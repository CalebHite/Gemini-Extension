/*global chrome*/

// Create the draggable and resizable container
const container = document.createElement("div");
container.style.position = "fixed";
container.style.top = "2rem";
container.style.left = "2rem";
container.style.width = "25rem";
container.style.height = "12rem";
container.style.backgroundColor = "rgba(50, 50, 50, 0.9)";
container.style.color = "white";
container.style.padding = "0 1rem 1rem";
container.style.borderRadius = "0.5rem";
container.style.boxShadow = "0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)";
container.style.zIndex = "9999";
container.style.cursor = "grab";
container.style.resize = "both";
container.style.overflow = "hidden";
container.style.display = "flex";
container.style.flexDirection = "column";

// Create a header for the container
const header = document.createElement("div");
header.style.width = "100%";
header.style.height = "2rem";
header.style.display = "flex";
header.style.justifyContent = "flex-start";
header.style.alignItems = "center";
header.style.cursor = "grab";

// Minimize button
const minimizeButton = document.createElement("p");
minimizeButton.textContent = "-";
minimizeButton.style.background = "none";
minimizeButton.style.border = "none";
minimizeButton.style.fontSize = "1.5rem";
minimizeButton.style.cursor = "pointer";
minimizeButton.style.marginLeft = "0.5rem";

// Maximize button
const maximizeButton = document.createElement("p");
maximizeButton.textContent = "+";
maximizeButton.style.margin = "0";
maximizeButton.style.height = "100%";
maximizeButton.style.background = "none";
maximizeButton.style.border = "none";
maximizeButton.style.fontSize = "1.5rem";
maximizeButton.style.cursor = "grab";
maximizeButton.style.display = "none"; // Hidden by default

// Inner elements container
const innerContainer = document.createElement("div");
innerContainer.style.display = "flex";
innerContainer.style.flexDirection = "column";
innerContainer.style.alignItems = "center";
innerContainer.style.justifyContent = "center";
innerContainer.style.width = "100%";
innerContainer.style.height = "100%";

// Create the prompt input field
const promptInput = document.createElement("input");
promptInput.type = "text";
promptInput.placeholder = "Enter your prompt...";
promptInput.style.width = "90%";
promptInput.style.padding = "0.5rem";
promptInput.style.marginBottom = "1rem";
promptInput.style.borderRadius = "0.25rem";
promptInput.style.border = "0.063rem solid #ccc";

// Create the selected text display
const selectedTextDisplay = document.createElement("p");
selectedTextDisplay.textContent = "Selected text will appear here.";
selectedTextDisplay.style.marginBottom = "1rem";
selectedTextDisplay.style.fontSize = "0.875rem";
selectedTextDisplay.style.color = "#ddd";
selectedTextDisplay.style.textAlign = "center";

// Create the search button
const searchButton = document.createElement("input");
searchButton.type = "button";
searchButton.value = "Search";
searchButton.style.padding = "0.5rem";
searchButton.style.width = "90%";
searchButton.style.backgroundColor = "#007BFF";
searchButton.style.color = "white";
searchButton.style.border = "none";
searchButton.style.borderRadius = "0.25rem";
searchButton.style.cursor = "pointer";
searchButton.style.fontSize = "0.875rem";
searchButton.addEventListener("mouseover", () => {
  searchButton.style.backgroundColor = "#0056b3";
});
searchButton.addEventListener("mouseout", () => {
  searchButton.style.backgroundColor = "#007BFF";
});

// Create the response output
const responseOutput = document.createElement("p");
responseOutput.textContent = "Response will appear here.";
responseOutput.style.marginTop = "1rem";
responseOutput.style.fontSize = "0.875rem";
responseOutput.style.color = "#ddd";
responseOutput.style.textAlign = "center";

// Add elements to the inner container
innerContainer.appendChild(promptInput);
innerContainer.appendChild(selectedTextDisplay);
innerContainer.appendChild(searchButton);
innerContainer.appendChild(responseOutput);

// Add the header and innerContainer to the container
header.appendChild(minimizeButton);
container.appendChild(header);
container.appendChild(innerContainer);
container.appendChild(maximizeButton);

// Add the container to the body
document.body.appendChild(container);

// Add minimize/maximize/drag functionality to the container
let isMinimized = false;
let isDragging = false;
let startX, startY, offsetX, offsetY;

// Start dragging
container.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;

  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  offsetX = e.clientX - container.offsetLeft;
  offsetY = e.clientY - container.offsetTop;
  container.style.cursor = "grabbing";

  // Disable text selection when dragging
  document.body.style.userSelect = "none"; 
});

// Drag the container
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  container.style.left = `${(e.clientX - offsetX)}px`;
  container.style.top = `${(e.clientY - offsetY)}px`;
});

// Stop dragging
document.addEventListener("mouseup", () => {
  isDragging = false;
  container.style.cursor = "grab";
  
  // Re-enable text selection once dragging stops
  document.body.style.userSelect = "auto"; 
});

// Toggle minimize and maximize functionality
minimizeButton.addEventListener("click", (e) => {
  let endX = e.clientX;
  let endY = e.clientY;
  let diffX = endX - startX;
  let diffY = endY - startY;
  if (diffX != 0 && diffY != 0) return;

  if (isDragging) return;
  isMinimized = true;
  container.style.height = "2rem"; // Shrink to only show the header
  container.style.width = "2rem"; // Small square size
  container.style.padding = "0"; // Remove padding
  container.style.resize = "none"; // Disable resizing
  innerContainer.style.display = "none"; // Hide inner elements
  header.style.display = "none"; // Hide minimize button
  maximizeButton.style.display = "flex"; // Show maximize button
  maximizeButton.style.display = "flex"; // Show maximize button
  maximizeButton.style.alignItems = "center"; // Center button
  maximizeButton.style.justifyContent = "center"; // Center button
  
  // Position container at the top-right corner
  container.style.left = "2rem"; // Align to the left
  container.style.top = "2rem";   // Adjust top position if needed
  container.style.transition = "none";
});

maximizeButton.addEventListener("click", (e) => {
  let endX = e.clientX;
  let endY = e.clientY;
  let diffX = endX - startX;
  let diffY = endY - startY;

  if (diffX != 0 && diffY != 0) return;
  if (isDragging) return;

  isMinimized = false;
  container.style.width = "25rem"; // Restore full width
  container.style.height = "12rem"; // Restore full height
  container.style.padding = "0 1rem 1rem"; // Restore padding
  container.style.resize = "both"; // Enable resizing
  innerContainer.style.display = "flex"; // Show inner elements
  header.style.display = "flex"; // Show minimize button
  maximizeButton.style.display = "none"; // Hide maximize button
  
  // Use transform-origin for expanding from the top-right corner
  container.style.transition = "width 0.3s ease, height 0.3s ease";
});

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText) {
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
  }
  });
  