const { Browser } = require('../atom/utils/browserManager');
const { css, xpath } = require('../test_data//discourse/selectors');
const { safeClick } = require('../atom/elementActions');
const { getCategorySize } = require('../atom/test_functions/discourse_functions');
let console = require('console');    

let browser;
let initPage;
let page;

const timeout = 100000;

describe('Testing Discouse website', () => {
    beforeAll(async () => {
        jest.setTimeout(timeout);
        const chrome = await new Browser();
        ({ browser, page } = await chrome.getBrowser({ headless: true}));
        initPage = page;
    });
    afterAll(async () => {
        await browser.close();
    });

    test('Accessing Demo page', async () => {
        await initPage.goto('https://www.discourse.org');
        const pageTarget = initPage.target();

        await safeClick(initPage, css.demoLink);
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);

        page = await newTarget.page();
        await page.waitForXPath(xpath.topicTitle, { visible: true }, 5000);
    });

    test('Scrolling down Demo page', async () => {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight; // eslint-disable-line no-undef
                    window.scrollBy(0, distance); // eslint-disable-line no-undef
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        await page.waitForXPath(xpath.footerMessage, { visible: true });
    });

    test('Getting Topic information', async () => {
        let closedTopics = await page.evaluate(`
            $("span[title='This topic is closed; it no longer accepts new replies']").parent("div").parent("span").text();
        `);
        
        console.log('The current closed topics are:', closedTopics);

        let categorySize;
        categorySize = await page.evaluate (`
            $("tr[class='topic-list-item category-uncategorized ember-view']").length;
        `);

        console.log(`Category uncategorized has ${categorySize} items`);

        const category = [
            'general',
            'discourse',
            'videos',
            'gaming',
            'movies',
            'tech',
            'sports',
            'school',
            'pics',
            'music',
            'pet',
        ];

        let dataPromisesArray = [];
        category.forEach(async element => {
            dataPromisesArray.push(
                getCategorySize(element, page)
            );
        });

        await Promise.all(dataPromisesArray);

        await safeClick(page, css.viewSortButton);
        await page.waitForSelector(css.ascendantSortArrow, { visible: true, timeout: 2000 });

        const views = await page.evaluate(`
            $('table[class="topic-list ember-view"] > tbody > tr:first-child >td[class="num views heatmap-low"] >span').text()
        `);

        console.log(`Most viewed topic has: ${views} views\n`);
    });
});
