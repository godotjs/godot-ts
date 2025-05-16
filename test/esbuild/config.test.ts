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
  },
  bundleOptions: {
    entryPoints: [],
    outExtension: { ".js": ".js" },
    bundle: true,
    minify: true,
    format: "cjs",
    target: "esnext",
  },
});

describe("config", () => {
  test("build", async () => {
    const result = await buildAction({
      dry: true,
      config: "./test/esbuild/.config/godot-ts.json",
    });
    expect(
      result.classOptions.outbase.replace(/\\/g, "/").endsWith("/scripts"),
    ).toBeTruthy();
    delete result.classOptions.outdir;
    delete result.classOptions.outbase;
    delete result.bundleOptions.outdir;
    delete result.bundleOptions.outbase;
    expect(JSON.stringify(result)).toEqual(buildResult);
  });
});
