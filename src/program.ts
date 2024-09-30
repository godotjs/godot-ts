import { Command, program } from "commander";
import { godotTS } from "./data";

export const getProgram = (name: string, description: string) => {
  const mProgram = program.name(name).description(description);

  for (const command of godotTS) {
    const pCommand = new Command(command.name);
    pCommand.description();

    if (command.description) {
      pCommand.description(command.description);
    }

    if (command.options) {
      for (const option of command.options) {
        const short =
          (option.short &&
            (option.short?.startsWith("-")
              ? option.short
              : `-${option.short}`)) ||
          `-${option.name.charAt(0)}`;

        const isBoolean = typeof option.defaultValue == "boolean";
        const pre = option.array ? "[" : isBoolean ? "" : "<";
        const post = option.array ? "s...]" : isBoolean ? "" : ">";

        const long =
          option.long || `--${option.name} ${pre}${option.name}${post}`;

        pCommand.option(
          `${short}, ${long}`,
          option.description || "",
          option.defaultValue,
        );
      }
    }

    pCommand.action(command.action);
    mProgram.addCommand(pCommand);
  }

  return mProgram;
};

export const startProgram = (name: string, description: string) => {
  getProgram(name, description).parse();
};
