// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "camelcase": "off",
   "comma-dangle": "off",
   "comma-spacing": "off",
   "eqeqeq": "off",
   "handle-callback-err": "off",
   "indent": "off",
   "key-spacing": "off",
   "keyword-spacing": "off",
   "no-multi-spaces": "off",
   "no-undef": "off",
   "no-unused-vars": "off",
   "object-curly-spacing": "off",
   "quotes": "off",
   "semi": "off",
   "space-before-function-paren": "off",
   "space-before-blocks": "off",
   "space-in-parens": "off",
   "spaced-comment": "off",
   "space-infix-ops": "off",
   "no-dupe-keys": "off",
   "no-fallthrough": "off",
   "no-spaced-func": "off",
   "no-multiple-empty-lines": "off",
   "no-trailing-spaces": "off",
   "padded-blocks": "off",
   "arrow-spacing": "off",
   // 'vue/no-unused-vars': 'error'
   "vue/no-unused-vars": "off",
   "vue/require-v-for-key": "off"
  }
}
