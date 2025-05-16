export const generateUtils = `import { GArray, GDictionary } from "godot";

/**
 * Recursively converts JavaScript objects and arrays to Godot-compatible GDictionary and GArray types
 * @param data Any JavaScript value to convert to a Godot-compatible type
 * @returns The Godot-compatible representation of the input data
 */
export function toGD(data: any) {
  // Handle null/undefined
  if (data === null || data === undefined) {
    return null;
  }
  
  // Handle primitive types (pass through)
  if (typeof data !== 'object') {
    return data;
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    const gArray = new GArray();
    for (const item of data) {
      gArray.push_back(toGD(item));
    }
    return gArray;
  }
  
  // Handle objects
  if (data instanceof GArray || data instanceof GDictionary) {
    // Already a Godot type, return as is
    return data;
  }
  
  // Convert object to GDictionary
  const gDict = new GDictionary();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      gDict.set_keyed(key, toGD(data[key]));
    }
  }
  return gDict;
}

/**
 * Recursively converts Godot GDictionary and GArray types to JavaScript objects and arrays
 * @param data Godot data structure to convert to a JavaScript equivalent
 * @returns The JavaScript representation of the input Godot data
 */
export function fromGD<T = any>(data: any): T {
  // Handle null/undefined
  if (data === null || data === undefined) {
    return null as T;
  }
  
  // Handle GArray
  if (data instanceof GArray) {
    const jsArray: any[] = [];
    for (let i = 0; i < data.size(); i++) {
      jsArray.push(fromGD(data.get_indexed(i)));
    }
    return jsArray as T;
  }
  
  // Handle GDictionary
  if (data instanceof GDictionary) {
    const jsObject: Record<string | number, any> = {};
    const keys = data.keys();
    
    for (let i = 0; i < keys.size(); i++) {
      const key = keys.get_indexed(i);
      jsObject[key] = fromGD(data.get_keyed(key));
    }
    
    return jsObject as T;
  }
  
  // Handle primitive types and anything else (pass through)
  return data as T;
}`;
