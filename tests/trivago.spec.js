const { Browser } = require('../atom/utils/browserManager');
const { css } = require('../test_data/trivago/selectors');
let console = require('console');    

let browser;
let page;

const timeout = 100000;

describe('Testing Trivago website', () => {
    let hotelName, hasStars, starsNumber, partnerName, acomodationPrice;
    
    beforeAll(async () => {
        jest.setTimeout(timeout);
        const chrome = await new Browser();
        ({ browser, page } = await chrome.getBrowser({ headless: true}));
        page.setDefaultTimeout(10000);
    });
    afterAll(async () => {
        // getting screenshot to register for some debugging if the test breaks
        await page.screenshot({path: 'ss.png'});
        await browser.close();
    });

    test('Accessing Trivago page', async () => {
        await page.goto('http://www.trivago.com.br/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.5.1.min.js'});
    });

    test('Doing Search', async () => {
        // selecting room for 1 person
        await safeClick(page, css.searchOptions);
        await safeClick(page, css.adultsInput);
        await page.keyboard.press('Delete');
        await page.keyboard.press('1');
        await safeClick(page, css.applyConfigButton);

        // inserting location
        await safeClick(page, css.locationInput);
        await page.keyboard.type('Natal');
        await safeClick(page, css.searchButton);
    });

    test('Sorting by distance', async () => {
        await page.waitForSelector(css.selectSort);
        await page.select(css.selectSort, '3');
        await page.waitForSelector(css.secondHotelOption);    
    });

    test('Getting Hotel information', async () => {
        hotelName = await page.evaluate(`
            $("ol > li:nth-child(2) article[data-qa='itemlist-element'] h3[itemprop='name'] span").text()
        `);

        hasStars = await page.evaluate(`
            $("ol > li:nth-child(2) article[data-qa='itemlist-element'] div.stars-wrp")
        `);

        if (hasStars) {
            starsNumber = await page.evaluate(`
                $("ol > li:nth-child(2) article[data-qa='itemlist-element'] div.stars-wrp span").length
            `); 
        } else {
            starsNumber = 'Informação não disponível';
        }

        partnerName = await page.evaluate(`
            $("ol > li:nth-child(2) article[data-qa='itemlist-element'] span[data-qa='recommended-price-partner']").text()
        `);

        acomodationPrice = await page.evaluate(`
            $("ol > li:nth-child(2) article[data-qa='itemlist-element'] strong[data-qa='recommended-price']").text()
        `);

        console.log(`
            Informações do hotel desejado \n
            Nome: ${hotelName} Estrelas: ${starsNumber}\n
            Oferta da Empresa: ${partnerName} Preço: ${acomodationPrice}
        `);
    });

    test.skip('Getting Accommodation info', async () => {
        // opening location details
        await page.click(css.secondHotelLocationLink);

        // opening accommodation details
        await safeClick(page, css.expandAccommodationDetailsLink);

        const roomDetails = await page.evaluate(() => { // eslint-disable-line no-unused-vars
            $("ol > li:nth-child(2) article[data-qa='itemlist-element']").forEach(element => { // eslint-disable-line no-undef
                if (element.textContent == "Comodidades do quarto") {
                    return element;
                }
            });
        });
    });

});

async function safeClick (page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}
