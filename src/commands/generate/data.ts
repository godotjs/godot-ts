import { ProgramOptionsType } from "../../data";
import { ConfigType, OutConfigType } from "../../utils/shared";

export type GenerateConfigType = {
  src?: string;
} & OutConfigType &
  ConfigType;

export const generateOptions: ProgramOptionsType[] = [
  {
    name: "src",
    defaultValue: ".",
    description: "Relative path where script files located",
  },
  {
    name: "out",
    defaultValue: ".",
    description: "Relative path where generated files are written",
  },
];
