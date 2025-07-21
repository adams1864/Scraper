(function() {
  function waitForApplyButton() {
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        const applyButton = document.querySelector('button[type="submit"], button.apply-now');
        if (applyButton && !applyButton.disabled) {
          clearInterval(checkInterval);
          resolve(applyButton);
        }
      }, 500);
    });
  }

  waitForApplyButton().then(() => {
    const jobData = {
      title: document.querySelector('h1:not([data-test="proposal-submit-button"]), [class*="job-title"]')?.textContent.trim() || 'No title',
      description: document.querySelector('div[class*="description"], [data-test="job-description"]')?.textContent.trim() || 'No description',
      budget: document.querySelector('span[class*="budget"], [data-test="job-budget"]')?.textContent.trim() || 'No budget',
      postedDate: document.querySelector('span[class*="date"], [data-test="job-posted-date"]')?.textContent.trim() || 'No date'
    };
    console.log('Scraped Job Data:', jobData);

    const observer = new MutationObserver(() => {
      const updatedButton = document.querySelector('button[type="submit"], button.apply-now');
      if (updatedButton && !updatedButton.disabled) {
        const updatedData = {
          title: document.querySelector('h1:not([data-test="proposal-submit-button"]), [class*="job-title"]')?.textContent.trim() || 'No title',
          description: document.querySelector('div[class*="description"], [data-test="job-description"]')?.textContent.trim() || 'No description',
          budget: document.querySelector('span[class*="budget"], [data-test="job-budget"]')?.textContent.trim() || 'No budget',
          postedDate: document.querySelector('span[class*="date"], [data-test="job-posted-date"]')?.textContent.trim() || 'No date'
        };
        console.log('Updated Scraped Job Data:', updatedData);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }).catch(err => {
    console.error('Error waiting for Apply Now button:', err);
  });
})();