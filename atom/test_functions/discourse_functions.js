async function getCategorySize (categoryName, page) {
    let categorySize;
    categorySize = await page.evaluate(`
        $("span[class='category-name']:contains(${categoryName})").length
    `);

    console.log(`Category ${categoryName} has ${categorySize} items`);
}

module.exports = {
    getCategorySize
};