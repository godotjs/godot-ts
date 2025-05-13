import { Node } from "godot";
import { test } from "./test.bundle";

export default class MyClass extends Node {
  _ready(): void {
    console.log("test");
    test();
  }
}
