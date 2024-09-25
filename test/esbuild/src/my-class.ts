import { signal } from "./decorators.bundle";

export default class MyClass extends godot.Node {
  @signal
  static readonly onReady: string;

  _ready(): void {
    console.log("test");
  }
}
