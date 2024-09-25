import { ProgramOptionsType } from "../../data";
import { watchOptions, WatchTypes } from "../watch/data";

export type BuildTypes = {
  minifyClasses?: boolean;
} & WatchTypes;

export const buildOptions: ProgramOptionsType[] = [
  ...watchOptions,
  {
    name: "minifyClasses",
    short: "mc",
    defaultValue: true,
    description: "Minifies GodotJS classes",
  },
];
