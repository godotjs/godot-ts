import { describe, expect, test } from "vitest";
import { buildAction } from "../../src/commands/build";
import { readdirSync } from "node:fs";
import { rimrafSync } from "rimraf";

const allSrc = ["./test/esbuild/src", "test/esbuild/src"];

const allOut = [
  "./test/esbuild/scripts",
  "test/esbuild/scripts",
];

describe("build", () => {
  allSrc.forEach((src) => {
    allOut.forEach((out) => {
      rimrafSync(out);
      test(`simple test ${src} ${out}`, async () => {
        await buildAction({
          src,
          out,
        });
        const files: string[] = readdirSync(out);
        expect(files).toHaveLength(2);
        expect(files[0]).toEqual("decorators.bundle.js");
        expect(files[1]).toEqual("my-class.mjs");
      });
    });
  });
});
