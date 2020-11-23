
async function safeClick (page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

module.exports = {
    safeClick
};