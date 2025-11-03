import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      // Code style
      semi: "error",
      quotes: ["error", "double"],

      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      // Turn off base rules that conflict with TypeScript
      "no-undef": "off",
      "no-unused-vars": "off",
      // Relax empty block rule to avoid false positives in TS/Next
      "no-empty": "off",

      // React specific
      "react-hooks/exhaustive-deps": "warn",

      // General rules
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      // 'jsx-a11y/anchor-is-valid': 'error',
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
