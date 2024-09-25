import { describe, expect, test } from "vitest";
import { buildAction } from "../../src/commands/build";
import { readdirSync } from "node:fs";

const src = "./test/esbuild/src";
const out = "./test/esbuild/scripts";

describe("build", () => {
  test("simple test", async () => {
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
