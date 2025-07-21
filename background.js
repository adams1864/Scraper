
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes("https://www.upwork.com/nx/proposals/job/")) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    });
  }
}, { url: [{ urlMatches: 'https://www.upwork.com/nx/proposals/job/*' }] });