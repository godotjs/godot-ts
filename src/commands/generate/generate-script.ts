import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { GDScript } from "./parse";

const getResourcePath = (filePath: string) => {
  return `"res://${filePath.replace(/\\/g, "/")}"`;
};

export const generateGDScriptPathsFile = (
  gdScripts: GDScript[],
  outputPath: string,
) => {
  const imports = gdScripts.map(({ class_name }) => class_name).join(",");
  const pathTypes = gdScripts
    .map(({ filePath }) => getResourcePath(filePath))
    .join("\n| ");
  const classTypes = gdScripts.map(({ class_name }) => class_name).join("\n| ");

  const fileContent = `import { ResourceLoader } from "godot";
  import { ${imports} } from "gdscript";
  
  type GDScriptPaths = ${pathTypes} | string;

  type GDScriptClasses = ${classTypes} | unknown;
  
  /**
 * Instantiate a GDScript class with \`.new()\`.
 * @param path Local path to the GDScript file.
 */
  export function instantiate_gdscript<T extends GDScriptClasses>(
  path: GDScriptPaths ,
): T {
  return ResourceLoader.load(path).call("new") as T;
  }
  `;

  const resolvedPath = resolve(outputPath);
  writeFileSync(resolvedPath, fileContent, "utf-8");
};
