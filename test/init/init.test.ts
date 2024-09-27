import { describe, expect, test } from "vitest";
import { readdirSync } from "node:fs";
import { initAction } from "../../src/commands/init";

const out = "./test/init";
const gameName = "game";

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
  test("test", async () => {
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
