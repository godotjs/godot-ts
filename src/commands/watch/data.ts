import { ProgramOptionsType } from "../../data";
import { DryConfigType, dryRunOption } from "../../utils/shared";

export type WatchConfigType = {
  src?: string;
  out?: string;
} & DryConfigType;

export const watchOptions: ProgramOptionsType[] = [
  {
    name: "src",
    defaultValue: "./src",
    description: "Relative path where *.ts files located",
  },
  {
    name: "out",
    defaultValue: "./scripts/js/generated",
    description: "Relative path where *.ts files are written",
  },
  dryRunOption,
];
