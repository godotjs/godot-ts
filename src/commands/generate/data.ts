import { ProgramOptionsType } from "../../data";
import { ConfigType, OutConfigType } from "../../utils/shared";

export type GenerateConfigType = {
  src?: string;
  absolute?: boolean
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
  {
    name: "absolute",
    defaultValue: true,
    description: "If the paths used for generating types should be absolute or relative",
  },
];
