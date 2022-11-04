module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  globals: {
    JSX: true,
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: ["./tsconfig.json"],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".json"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "directory": "./tsconfig.json"
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".json"]
      }
    }
  },
  rules: {
    "@next/next/no-img-element": "off",
    "node/no-missing-import": "off",
    "import/no-unresolved": "error",
    "no-unused-vars": "off",
    "max-len": [
      "error",
      { code: 120 },
    ],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ]
  },
};
