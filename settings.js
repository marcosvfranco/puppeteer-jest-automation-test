const settings = {
    'puppeteerLaunch': {
        'headless': false,
        'slowMo': 50,
        'defaultViewport': {
            'width': 1360,
            'height': 780
        },
        'args': ['--ignore-certificate-errors', '--disable-features=site-per-process', '--start-maximized']
    }
};

module.exports = {
    settings
};