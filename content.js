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
    // 2-second delay for dynamic content
    setTimeout(() => {
      const budgetItems = document.querySelectorAll('li[data-v-56979428]');
      let budget = 'No budget';
      let budgetType = 'No budget type';

      budgetItems.forEach(item => {
        const amount = item.querySelector('strong[data-v-56979428]');
        const type = item.querySelector('small.text-light-on-inverse');
        if (amount && amount.textContent.trim().includes('$')) {
          budget = amount.textContent.trim(); // Only take if it contains a dollar sign
        }
        if (type && ['Fixed-price', 'Hourly'].includes(type.textContent.trim())) {
          budgetType = type.textContent.trim(); // Only take known contract types
        }
      });

      const jobData = {
        jobTitle: document.querySelector('h3.mb-6x.h5')?.textContent.trim() || 'No job title',
        skillAndExpertise: Array.from(document.querySelectorAll('ul.list-inline.mb-0 li')).map(li => li.textContent.trim()).join(', ') || 'No skills',
        description: document.querySelector('div.description.text-body-sm span.air3-truncation')?.textContent.trim() || 'No description',
        budget: budget,
        budgetType: budgetType
      };
      console.log('Scraped Job Data:', jobData);
    }, 2000); // 2-second delay
  }).catch(err => {
    console.error('Error waiting for Apply Now button:', err);
  });
})();