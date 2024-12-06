const { remote } = require('webdriverio');

const options = {
    capabilities: {
        browserName: 'chrome',  
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']  
        }
    }
};

(async () => {
    const driver = await remote(options);

    try {
        await driver.url('https://www.shopping.com');  

        const searchInput = await driver.$('input[name="search"]'); 
        await searchInput.setValue('Laptop');
        const searchButton = await driver.$('button[type="submit"]'); 
        await searchButton.click(); 

        const results = await driver.$$('.product'); 
        if (results.length > 0) {
            console.log('Test Passed: At least one product is displayed.');
        } else {
            console.log('Test Failed: No products found.');
        }
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Close the session
        await driver.deleteSession();
    }
})();
