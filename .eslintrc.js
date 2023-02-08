require("@rushstack/eslint-patch/modern-module-resolution")

module.exports ={
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-standard"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "plugins": [
  ],
  "rules": {
  }
}
