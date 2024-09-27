import { describe, expect, test } from "vitest";
import { readdirSync } from "node:fs";
import { initAction } from "../../src/commands/init";

const gameName = "game";

const allOut = ["./test/init", "test/init"];

const expectedFiles = [
  "node_modules",
  "src",
  ".gitignore",
  "godot.d.ts",
  "package.json",
  "project.godot",
  "tsconfig.json",
];

describe("init", () => {
  allOut.forEach((out) => {
    test(`test ${out}`, async () => {
      await initAction({
        name: gameName,
        out,
        forceDelete: true,
      });
      const files: string[] = readdirSync(`${out}/${gameName}`);
      expect(files).toHaveLength(7);
      expectedFiles.forEach((file) => {
        expect(files).toContain(file);
      });
    });
  });
});
