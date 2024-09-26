import { ProgramOptionsType } from "../../data";
import { DryConfigType, dryRunOption } from "../../utils/shared";

export type InitConfigType = {
  name: string;
} & DryConfigType;

export const initOptions: ProgramOptionsType[] = [
  {
    name: "name",
    defaultValue: "MyGame",
    description: "The name of your project",
    required: true,
    inquirer: {
      input: { message: "Enter the name of your Game" },
    },
  },
  dryRunOption,
];

export const DECORATORS_FILE = "src/decorators.bundle.ts";
export const EXAMPLE_FILE = "src/example.ts";
export const GODOT_D_FILE = "godot.d.ts";
export const TS_CONFIG_FILE = "tsconfig.json";
export const PACKAGE_JSON_FILE = "package.json";
export const GODOT_PROJECT_FILE: string = "project.godot";

