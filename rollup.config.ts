import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash.camelcase";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";

const pkg = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, name: camelCase("sepa-payment-code"), format: "umd", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({
      namedExports: {
        "node_modules/iban/iban.js": [ 'isValid' ],
      },
    }),
    resolve(),
    sourceMaps(),
  ],
};
