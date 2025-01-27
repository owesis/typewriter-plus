import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", // Use 'module' for ESM syntax
      globals: {
        ...globals.browser,  // Include common globals for browsers
        module: "readonly",  // Define 'module' for CommonJS
        define: "readonly",  // Define 'define' for AMD
      },
    },
  },
  pluginJs.configs.recommended, // ESLint's recommended settings for JavaScript
];
