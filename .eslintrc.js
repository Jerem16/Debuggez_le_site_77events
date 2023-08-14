module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "2022", // À ajuster en fonction de votre version cible d'ECMAScript
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/jsx-props-no-spreading": "off",
        "react/function-component-definition": "off",
    },
};
