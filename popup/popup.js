document.addEventListener('DOMContentLoaded', function() {
  // Load saved API key
  chrome.storage.sync.get(['openai_api_key'], function(result) {
    if (result.openai_api_key) {
      document.getElementById('apiKeyInput').value = result.openai_api_key;
      document.getElementById('status').textContent = 'API key is set';
      document.getElementById('status').style.color = 'green';
    }
  });
  
  // Save API key
  document.getElementById('saveApiKey').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    
    if (apiKey) {
      chrome.storage.sync.set({openai_api_key: apiKey}, function() {
        document.getElementById('status').textContent = 'API key saved!';
        document.getElementById('status').style.color = 'green';
        
        setTimeout(() => {
          document.getElementById('status').textContent = 'API key is set';
        }, 2000);
      });
    } else {
      document.getElementById('status').textContent = 'Please enter a valid API key';
      document.getElementById('status').style.color = 'red';
    }
  });
});