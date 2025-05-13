import { ProgramOptionsType } from "../data";

export type OutConfigType = {
  out?: string;
};

export type DryConfigType = {
  dry?: boolean;
};

export type ConfigType = {
  config?: string;
};

export const dryRunOption: ProgramOptionsType = {
  name: "dry",
  description: "Do a dry run with this command - prints/returns output",
  defaultValue: false,
};
