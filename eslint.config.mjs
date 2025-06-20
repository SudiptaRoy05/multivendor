import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
module.exports = {
  rules: {
    "no-console": "off", // disable built-in rule
    "@typescript-eslint/no-explicit-any": "off", // disable TS rule
  },
};
export default eslintConfig;
