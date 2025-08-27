import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores  } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  // Ignored files & folders
  globalIgnores([
    'node_modules',
  ]),
  // Linting rules
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    plugins: {
      js,
      import: importPlugin,
    },
    extends: [
      "js/recommended",
    ],
    rules: {
      // Airbnb Rules
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "consistent-return": "error",
      "eqeqeq": ["error", "always"],
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/order": ["error", { "groups": ["builtin", "external", "internal"] }],
      "no-console": "warn",
      "no-underscore-dangle": "off",
      "object-curly-spacing": ["error", "always"],
      "prefer-const": "error",
      "semi": ["error", "always"],
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      }],
      "eol-last": ["error", "always"],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);
