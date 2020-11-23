module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
        'jest' :true,
    },
    'extends': ['eslint:recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    "parser": "babel-eslint",
};