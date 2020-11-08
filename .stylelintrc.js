module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'max-nesting-depth': 3,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'rule-empty-line-before': [
      'always',
      {
        'ignore': [
          'after-comment',
          'first-nested',
        ],
      },
    ],
    'declaration-colon-space-after': 'always-single-line',
    'order/properties-alphabetical-order': null,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'prettier/prettier': [
      true,
      {
        'singleQuote': true,
        'tabWidth': 2,
      },
    ],
    'selector-class-pattern': null,
    'selector-no-qualifying-type': [
      true,
      {
        'ignore': [
          'attribute',
          'class',
          'id',
        ],
      },
    ],
},
};
