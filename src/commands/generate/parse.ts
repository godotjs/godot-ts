import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

export type GDScript = {
  class_name?: string;
  extends?: string;
  functions?: {
    name: string;
    params: {
      name: string;
      type: string;
      defaultValue?: string;
    }[];
    returnType: string;
  }[];
  filePath: string;
};

const gdToTsTypeMap: Record<string, string> = {
  int: "number",
  float: "number",
  byte: "number",
  int32: "number",
  int64: "number",
  float32: "number",
  float64: "number",
  String: "string",
  StringName: "string",
  bool: "boolean",
  void: "void",
  any: "any",
};
export const godotTsMap: string[] = [
  "Object",
  "Node",
  "Node2D",
  "Vector2",
  "Vector2i",
  "Rect2",
  "Rect2i",
  "Vector3",
  "Vector3i",
  "Transform2D",
  "Vector4",
  "Vector4i",
  "Plane",
  "Quaternion",
  "AABB",
  "Basis",
  "Transform3D",
  "Projection",
  "Color",
  "NodePath",
  "RID",
  "Callable",
  "Signal",
  "GDictionary",
  "GArray",
  "PackedByteArray",
  "PackedInt32Array",
  "PackedInt64Array",
  "PackedFloat32Array",
  "PackedFloat64Array",
  "PackedStringArray",
  "PackedVector2Array",
  "PackedVector3Array",
  "PackedColorArray",
  "PackedVector4Array",
];

const convertToTsType = (gdType: string): string => {
  if (godotTsMap.includes(gdType)) {
    return gdType;
  }
  return gdToTsTypeMap[gdType] || "any";
};

const toPascalCase = (str: string): string => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
};

export const parseGDScriptToJson = (filePath: string): GDScript => {
  const gdScriptContent = readFileSync(resolve(filePath), "utf-8");
  const jsonResult: GDScript = { filePath };
  const lines = gdScriptContent.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("#") || trimmedLine === "") continue;

    const classNameMatch = trimmedLine.match(/^class_name\s+(\w+)/);
    if (classNameMatch) {
      jsonResult.class_name = classNameMatch[1];
      continue;
    }

    const extendsMatch = trimmedLine.match(/^extends\s+(\w+)/);
    if (extendsMatch) {
      jsonResult.extends = extendsMatch[1];
      continue;
    }

    const funcMatch = trimmedLine.match(
      /^func\s+(\w+)\((.*)\)(?:\s*->\s*(\w+))?:?$/,
    );
    if (funcMatch) {
      const [, funcName, params, returnType] = funcMatch;

      const parsedParams = params
        .split(",")
        .filter((p) => p.trim() !== "")
        .map((p) => {
          const [nameAndType, defaultValue] = p
            .split("=")
            .map((part) => part.trim());
          const [name, type] = nameAndType
            .split(":")
            .map((part) => part.trim());
          return {
            name,
            type: convertToTsType(type || "any"),
            defaultValue: defaultValue || undefined,
          };
        });

      jsonResult.functions = jsonResult.functions || [];
      jsonResult.functions.push({
        name: funcName,
        params: parsedParams,
        returnType: convertToTsType(returnType || "void"),
      });
    }
  }

  if (!jsonResult.class_name) {
    const fileName = basename(filePath, ".gd");
    jsonResult.class_name = toPascalCase(fileName);
  }

  return jsonResult;
};
