import { GenerateConfigType } from "./data";
import { glob } from "glob";
import { resolve } from "path";
import { parseGDScriptToJson } from "./parse";
import { generateDTS } from "./generate-types";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { generateGDScriptPathsFile } from "./generate-script";
import { generateUtils } from "./generate-utils";

export const generateAction = async (passedConfig: GenerateConfigType) => {
  const { src, out, absolute } = passedConfig;

  const resolvedSrc = absolute ? resolve(src) : src;
  const resolvedOut = absolute ? resolve(out) : out;

  const gdScriptPaths = await glob(`${resolvedSrc}/**/*.gd`, {
    ignore: [`**/.godot/**`],
  });

  const typingsDir = `${resolvedOut}/typings/gdscript`;
  if (!existsSync(typingsDir)) {
    mkdirSync(typingsDir, { recursive: true });
  }
  const generatedDir = `${resolvedOut}/generated`;
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir, { recursive: true });
  }

  const scripts = gdScriptPaths.map((path) => parseGDScriptToJson(path));
  generateDTS(scripts, `${typingsDir}/gdscript.d.ts`);
  generateGDScriptPathsFile(scripts, `${generatedDir}/gdscript.ts`);
  writeFileSync(`${generatedDir}/utils.ts`, generateUtils);
};
