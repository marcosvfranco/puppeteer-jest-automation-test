const css = {
    demoLink: 'a[href="https://try.discourse.org"]',
    viewSortButton: 'th[data-sort-order="views"]',
    ascendantSortArrow: 'svg[class="fa d-icon d-icon-chevron-down svg-icon svg-string"]',
};

const xpath = {
    topicTitle: '//th[@data-sort-order="default"]',
    footerMessage: '//div[@class="footer-message ember-view"]'
};
module.exports = {
    css,
    xpath
};