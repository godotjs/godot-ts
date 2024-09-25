import { ProgramOptionsType } from "../../data";

export type WatchTypes = {
  src?: string;
  out?: string;
};

export const watchOptions: ProgramOptionsType[] = [
  {
    name: "src",
    defaultValue: "./src",
    description: "Relative path where *.ts files located",
  },
  {
    name: "out",
    defaultValue: "./scripts",
    description: "Relative path where *.ts files are written",
  },
];
