import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  // Базовая конфигурация
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser, // Используем vue-eslint-parser для всех файлов
      parserOptions: {
        parser: tsParser, // Встроенный парсер для TypeScript
        sourceType: "module",
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescriptEslint,
      prettier,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "vue/multi-word-component-names": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // Конфигурация для Vue 3
  {
    ...vue.configs["vue3-recommended"],
  },

  // Конфигурация для TypeScript
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },
];
