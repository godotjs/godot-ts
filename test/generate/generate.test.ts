import { describe, expect, test } from "vitest";
import { readdirSync } from "node:fs";
import { generateAction } from "../../src/commands/generate";

const src = "./test/generate";

describe("generate", () => {
  test(`test`, async () => {
    await generateAction({ src, out: src });
    const files: string[] = readdirSync(`${src}`);
    expect(files).toHaveLength(4);
  });
});
