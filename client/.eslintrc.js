module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "camelcase": "off",
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-unused-vars": "off",
    "react/jsx-pascal-case": ["off"],
    "no-useless-escape": ["off"],
    "no-mixed-operators": ["off"],
    "jsx-a11y/anchor-is-valid": 0,
    "no-restricted-globals": 'off',
    "react-hooks/exhaustive-deps": 0,
  },
  "overrides": [
    {
      "files": ["**/*.ts?(x)"],
      "rules": {
        "react-hooks/exhaustive-deps": 0,
      }
    }
  ]
}
