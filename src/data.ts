import { watchOptions } from "./commands/watch/data";
import { watchAction } from "./commands/watch";
import { buildOptions } from "./commands/build/data";
import { buildAction } from "./commands/build";
import { initOptions } from "./commands/init/data";
import { initAction } from "./commands/init";

export const programName = "@godot-js/ts";
export const programDescription = "CLI for using GodotJS with TypeScript";

export type Command = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void | Promise<any>;
  description?: string;
  options?: ProgramOptionsType[];
};

export type ProgramOptionsType = {
  name: string;
  short?: string;
  long?: string;
  array?: boolean;
  required?: boolean;
  description?: string;
  defaultValue?: string | boolean | string[];
  inquirer?: {
    input?: { message: string };
  };
};

export const godotTS: Command[] = [
  {
    name: "init",
    description: "Creates a new GodotJS project with TypeScript support",
    options: initOptions,
    action: initAction,
  },
  {
    name: "build",
    description: "Build typescript files",
    options: buildOptions,
    action: buildAction,
  },
  {
    name: "watch",
    description: "Watch typescript files",
    options: watchOptions,
    action: watchAction,
  },
];
