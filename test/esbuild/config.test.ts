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
    outbase: "./scripts",
    outdir: "./.godot/GodotJS",
  },
  bundleOptions: {
    entryPoints: [],
    outExtension: { ".js": ".js" },
    bundle: true,
    minify: true,
    format: "cjs",
    target: "esnext",
    outbase: "./scripts",
    outdir: "./.godot/GodotJS",
  },
});

describe("config", () => {
  test("build", async () => {
    const result = await buildAction({
      dry: true,
      config: "./test/esbuild/.config/godot-ts.json",
    });
    expect(JSON.stringify(result)).toEqual(buildResult);
  });
});
