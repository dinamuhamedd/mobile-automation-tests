const { remote } = require('webdriverio');

const options = {
    capabilities: {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'emulator-5554',
        app: '/path/to/your/app.apk',
    }
};

(async () => {
    const driver = await remote(options);

    try {
        await driver.$('~username').setValue('testuser');
        await driver.$('//input[@placeholder="Enter your password"]').setValue('password123');
        await driver.$('~loginButton').click();
        const homeScreen = await driver.$('~homeScreen');
        const isDisplayed = await homeScreen.isDisplayed();
        console.assert(isDisplayed, 'User was not redirected to the Home screen.');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.deleteSession();
    }
})();
