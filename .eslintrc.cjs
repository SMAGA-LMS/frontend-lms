module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  plugins: ["react-hooks", "@typescript-eslint"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/jsx-uses-react": "off", // Disable this rule for React 17+
    "react/react-in-jsx-scope": "off", // Disable this rule for React 17+
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
  },
};
