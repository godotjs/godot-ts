export const generateUtils = `import { GArray, GDictionary } from "godot";

/**
 * Recursively converts JavaScript objects and arrays to Godot-compatible GDictionary and GArray types
 * @param data Any JavaScript value to convert to a Godot-compatible type
 * @returns The Godot-compatible representation of the input data
 */
export function toGD(data: any): any {
  if (Array.isArray(data)) {
    const gArray = new GArray();
    for (const item of data) {
      gArray.push_back(toGD(item));
    }
    return gArray;
  }

  if (data instanceof GArray || data instanceof GDictionary) {
    return data;
  }

  if (typeof data === "object") {
    const gDict = new GDictionary();
    for (const [key, value] of Object.entries(data as Object)) {
      gDict.set(key, toGD(value));
    }
    return gDict;
  }

  return data;
}

/**
 * Recursively converts arbitrary JavaScript data into a Godot-compatible GDictionary object.
 * @param data The data to be converted
 * @returns A GDictionary containing the converted data
 */
export function toGDictionary<T>(data: T): GDictionary<T> {
  return toGD(data);
}

/**
 * Recursively converts arbitrary JavaScript array into a Godot-compatible GArray object.
 * @param data The data to be converted
 * @returns A GArray containing the converted data
 */
export function toGArray<T>(data: T): GArray<T> {
  return toGD(data);
}

/**
 * Recursively converts Godot GDictionary and GArray types to JavaScript objects and arrays
 * @param data Godot data structure to convert to a JavaScript equivalent
 * @returns The JavaScript representation of the input Godot data
 */
export function fromGD(data: any) {
  if (data instanceof GArray) {
    const jsArray: any[] = [];
    for (let i = 0; i < data.size(); i++) {
      jsArray.push(fromGD(data.get_indexed(i)));
    }
    return jsArray;
  }

  if (data instanceof GDictionary) {
    const jsObject: { [key: string]: any } = {};
    for (const key of data.keys()) {
      jsObject[key.toString()] = fromGD(data.get(key));
    }
    return jsObject;
  }

  return data;
}

/**
 * Recursively converts arbitrary GDictionary data into a JSObject object.
 * @param data The data to be converted
 * @returns A JSObject containing the converted data
 */
export function fromGDictionary<T>(data: GDictionary<T>): T {
  return fromGD(data);
}

/**
 * Recursively converts arbitrary GArray array into a JS array.
 * @param data The data to be converted
 * @returns A JS array containing the converted data
 */
export function fromGArray<T>(data: T): T[] {
  return fromGD(data);
}
`;
