// TODO: Go to editor and generate current godot.d.ts file

declare module godot {
  type GodotClass = new () => godot.Object;

  class Object {}

  class Node extends godot.Object {
    _ready(): void;
  }

  namespace Node {}
}
