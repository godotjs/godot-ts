import { describe, expect, test } from "vitest";
import { buildAction } from "../../src/commands/build";
import { readdirSync } from "node:fs";
import { rimrafSync } from "rimraf";

const allSrc = ["./test/esbuild/src", "test/esbuild/src"];

const allBuildOut = [
  "./test/esbuild/build/.godot/GodotJS",
  "test/esbuild/build/.godot/GodotJS",
];

describe("build", () => {
  for (const src of allSrc) {
    for (const out of allBuildOut) {
      rimrafSync(out);
      test(`simple test ${src} ${out}`, async () => {
        await buildAction({
          src,
          out,
        });
        const files: string[] = readdirSync(out);
        expect(files).toHaveLength(2);
        expect(files[1]).toEqual("test.bundle.js");
        expect(files[0]).toEqual("my-class.js");
      });
    }
  }
});
