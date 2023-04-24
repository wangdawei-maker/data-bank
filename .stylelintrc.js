module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-declaration-strict-value',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    // 要求或禁止 url 使用引号
    'function-url-quotes': 'always',
    'at-rule-no-unknown': null,
    'alpha-value-notation': null,
    'selector-attribute-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'color-function-notation': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': null,
    'selector-class-pattern': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
    // 缩进
    indentation: 2,
    'declaration-empty-line-before': 'never', // 要求或禁止在声明语句之前有空行。
    // 指定哪些属性只能使用变量（旧项目迁入请注释此条规则）
    // 'scale-unlimited/declaration-strict-value': '/color$/',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
