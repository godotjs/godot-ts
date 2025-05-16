import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { GDScript } from "./parse";
import { godotTsMap } from "./parse";

export const generateDTS = (gdScripts: GDScript[], outputPath: string) => {
  const usedTypes = new Set<string>();

  for (const script of gdScripts) {
    if (script.extends && godotTsMap.includes(script.extends)) {
      usedTypes.add(script.extends);
    }

    if (!script.functions) continue;

    for (const { returnType, params } of script.functions) {
      if (godotTsMap.includes(returnType)) {
        usedTypes.add(returnType);
      }
      for (const { type } of params) {
        if (godotTsMap.includes(type)) {
          usedTypes.add(type);
        }
      }
    }
  }

  let dtsContent = "declare module 'gdscript' {\n\n";

  if (usedTypes.size > 0) {
    dtsContent += `import { ${[...usedTypes].join(", ")} } from "godot";\n\n`;
  }

  for (const script of gdScripts) {
    if (!script.class_name) {
      throw new Error("GDScript object must have a class_name.");
    }

    dtsContent += `declare class ${script.class_name}`;
    if (script.extends) {
      dtsContent += ` extends ${script.extends}`;
    }
    dtsContent += ` {\n`;

    for (const { name, returnType, params } of script.functions) {
      dtsContent += `  call(fn: "${name}"${params.length ? ", " : ""}${params.map(({ name, type }) => `${name}: ${type}`).join(",")}): ${returnType};\n`;
    }

    dtsContent += `}\n\n`;
  }

  dtsContent += `}\n`;

  const resolvedPath = resolve(outputPath);
  writeFileSync(resolvedPath, dtsContent, "utf-8");
};
