
class Browser {
    constructor(){
        
        const { settings } = require('../../settings');
        this.settings = settings;

        this.puppeteer = require('puppeteer');
    }

    async getBrowser() {
        const browser = await this.puppeteer.launch(this.settings.puppeteerLaunch);
        const page = await browser.newPage();
        const browserObj = {
            browser,
            page
        };
        return browserObj;
    }
}

module.exports = {
    Browser
};