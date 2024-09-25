import { program, Command } from "commander";
import { godotTS } from "./data";

const startProgram = (name: string, description: string) => {
  program.name(name).description(description);

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
        const long =
          option.long ||
          `--${option.name} ${option.array ? "[" : "<"}${option.name}${
            option.array ? "s...]" : ">"
          }`;

        pCommand.option(
          `${short}, ${long}`,
          option.description || "",
          option.defaultValue,
        );
      }
    }

    pCommand.action(command.action);
    program.addCommand(pCommand);
  }

  program.parse();
};

export default startProgram;
