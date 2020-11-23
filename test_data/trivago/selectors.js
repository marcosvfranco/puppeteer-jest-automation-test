const css = {
    searchOptions: 'button[class="dealform-button dealform-button--guests js-dealform-button-guests"]',
    adultsInput: 'label[for="adults-input"] ~ div > input[class="input room-filters__input"]',
    applyConfigButton: 'button[data-role="applyConfigBtn"]',
    locationInput: 'input[type="search"][role="combobox"]',
    searchButton: 'button[data-qa="search-button"]',
    selectSort: 'select#mf-select-sortby',
    secondHotelOption: "ol > li:nth-child(2) article[data-qa='itemlist-element'] h3[itemprop='name'] span",
    secondHotelLocationLink: "ol > li:nth-child(2) article[data-qa='itemlist-element'] div[data-qa='item-location-details']",
    expandAccommodationDetailsLink: "ol > li:nth-child(2) article[data-qa='itemlist-element'] div.expand-amenities"
};

const xpath = {
};
module.exports = {
    css,
    xpath
};