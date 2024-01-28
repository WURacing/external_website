module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    rules: {
        "vue/require-default-prop": "off",
        // 'vue/no-unused-vars': 'error'
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [["@", "./src"]],
            },
        },
    },
};
