import { ProgramOptionsType } from "../../data";
import { WatchConfigType, watchOptions } from "../watch/data";

export type BuildConfigType = {
  minifyClasses?: boolean;
} & WatchConfigType;

export const buildOptions: ProgramOptionsType[] = [
  ...watchOptions,
  {
    name: "minifyClasses",
    short: "mc",
    defaultValue: true,
    description: "Minifies GodotJS classes",
  },
];
