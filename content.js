// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showSummary") {
    showSummaryPopup(message.summary);
  } else if (message.action === "showError") {
    showErrorPopup(message.error);
  }
});

function showSummaryPopup(summary) {
  // Remove any existing popup
  removeExistingPopup();
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'chatgpt-summary-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    max-height: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    overflow: hidden;
    font-family: Arial, sans-serif;
  `;
  
  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    background-color: #4285f4;
    color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Summary';
  title.style.margin = '0';
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  `;
  closeBtn.onclick = removeExistingPopup;
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  popup.appendChild(header);
  
  // Create content
  const content = document.createElement('div');
  content.style.cssText = `
    padding: 15px;
    overflow-y: auto;
    max-height: 330px;
  `;
  content.textContent = summary;
  popup.appendChild(content);
  
  // Add to page
  document.body.appendChild(popup);
  
  // Auto-remove after 30 seconds
  setTimeout(removeExistingPopup, 30000);
}

function showErrorPopup(error) {
  // Remove any existing popup
  removeExistingPopup();
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'chatgpt-summary-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    overflow: hidden;
    font-family: Arial, sans-serif;
  `;
  
  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    background-color: #d93025;
    color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Error';
  title.style.margin = '0';
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  `;
  closeBtn.onclick = removeExistingPopup;
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  popup.appendChild(header);
  
  // Create content
  const content = document.createElement('div');
  content.style.cssText = `
    padding: 15px;
  `;
  content.textContent = error;
  popup.appendChild(content);
  
  // Add to page
  document.body.appendChild(popup);
  
  // Auto-remove after 10 seconds
  setTimeout(removeExistingPopup, 10000);
}

function removeExistingPopup() {
  const existingPopup = document.getElementById('chatgpt-summary-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
}