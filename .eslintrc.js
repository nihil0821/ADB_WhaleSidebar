module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "comma-dangle": [
            2,
            "always-multiline"
        ],
        "indent": [
            2,
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            0,
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};