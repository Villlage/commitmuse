// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  testEnvironment: "node",
  setupFiles: [
    "<rootDir>/jest-setup.js"
  ],
  "moduleNameMapper": {
    "styled-components": "<rootDir>/node_modules/styled-components/dist/styled-components.cjs.js",
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
    '\\.{css,sass,scss}$',
  ],
  coveragePathIgnorePatterns: [
    "/src/node_modules/",
    "/src/helpers",
  ],
};
