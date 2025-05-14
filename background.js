// Set up context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeText",
    title: "Summarize with ChatGPT",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeText") {
    const selectedText = info.selectionText;
    
    // Get API key from storage
    chrome.storage.sync.get(['openai_api_key'], function(result) {
      if (!result.openai_api_key) {
        // No API key found
        chrome.tabs.sendMessage(tab.id, {
          action: "showError",
          error: "API key not set. Please set your OpenAI API key in the extension popup."
        });
        return;
      }
      
      // Send text to OpenAI API
      summarizeWithOpenAI(selectedText, result.openai_api_key, tab.id);
    });
  }
});

async function summarizeWithOpenAI(text, apiKey, tabId) {
  try {
    // Send the request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text concisely."
          },
          {
            role: "user",
            content: `Please summarize the following text in a concise way: "${text}"`
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    const summary = data.choices[0].message.content;
    
    // Create a popup with the summary
    chrome.tabs.sendMessage(tabId, {
      action: "showSummary",
      summary: summary
    });
  } catch (error) {
    console.error('Error:', error);
    chrome.tabs.sendMessage(tabId, {
      action: "showError",
      error: "An error occurred: " + error.message
    });
  }
}