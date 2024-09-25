import { watchOptions } from "./commands/watch/data";
import { watchAction } from "./commands/watch";
import { buildOptions } from "./commands/build/data";
import { buildAction } from "./commands/build";

export type Command = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void | Promise<void>;
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
};

export const godotTS: Command[] = [
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
