import { ProgramOptionsType } from "../data";

export type DryConfigType = {
  dry?: boolean;
};

export const dryRunOption: ProgramOptionsType = {
  name: "dry",
  description: "Do a dry run with this command - prints/returns output",
  defaultValue: false,
};
