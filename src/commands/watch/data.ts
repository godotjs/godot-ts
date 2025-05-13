import { ProgramOptionsType } from "../../data";
import {
  ConfigType,
  DryConfigType,
  dryRunOption,
  OutConfigType,
} from "../../utils/shared";

export type WatchConfigType = {
  src?: string;
} & DryConfigType &
  OutConfigType &
  ConfigType;

export const watchOptions: ProgramOptionsType[] = [
  {
    name: "src",
    defaultValue: ".",
    description: "Relative path where *.ts files located",
  },
  {
    name: "out",
    defaultValue: "./.godot/GodotJS",
    description: "Relative path where *.ts files are written",
  },
  dryRunOption,
];
