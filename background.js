function updateAddress(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(address) {  
  });
}
 
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) { 
  if (change.status == "complete") {
    updateAddress(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) { 
  selectedId = tabId;
  updateAddress(tabId);
});
 
