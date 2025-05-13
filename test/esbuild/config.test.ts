import { describe, test, expect } from "vitest";
import { buildAction } from "../../src/commands/build";

const buildResult = JSON.stringify({
  config: {
    dry: true,
    config: "./test/esbuild/.config/godot-ts.json",
    src: "./scripts",
  },
  classOptions: {
    entryPoints: [],
    outExtension: { ".js": ".js" },
    format: "cjs",
    target: "esnext",
    minify: undefined,
    outbase: "./scripts",
    outdir: "scripts",
    sourcemap: undefined,
  },
  bundleOptions: {
    entryPoints: [],
    outExtension: { ".js": ".js" },
    bundle: true,
    minify: true,
    format: "cjs",
    target: "esnext",
    outbase: "./scripts",
    outdir: "scripts",
    sourcemap: undefined,
  },
});

describe("config", () => {
  test("build", async () => {
    const result = await buildAction({
      dry: true,
      config: "./test/esbuild/.config/godot-ts.json",
    });
    delete result.bundleOptions.plugins;
    delete result.classOptions.plugins;
    expect(JSON.stringify(result)).toEqual(buildResult);
  });
});
