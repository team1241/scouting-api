// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: "double", // or 'double'
    semi: true,
  },
  rules: {
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "no-console": "warn",
  },
});
