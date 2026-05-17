import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["stripe-test-cards.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
});
