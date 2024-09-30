import { getProgram } from "./program";
import { programDescription, programName } from "./data";
import { markdownTable } from "markdown-table";
import { writeFileSync } from "node:fs";

const getBooleanValue = (value: unknown): string => {
  if (String(value) === "true") {
    return "✅";
  } else if (String(value) === "false") {
    return "❌";
  }

  return String(value);
};

export const generateApiDocs = (name: string, description: string) => {
  const mProgram = getProgram(name, description);
  let result = `# API - ${mProgram.name()}\n\n`;
  result += `${mProgram.description()}\n\n`;

  mProgram.commands.forEach((command) => {
    result += `## ${command.name()}\n\n`;
    result += `${command.description()}\n\n`;
    const mTable: string[][] = [
      ["long", "short", "description", "required", "defaultValue"],
    ];
    command.options.forEach(
      ({ description, required, short, long, defaultValue }) => {
        mTable.push([
          `\`${long}\``,
          `\`${short}\``,
          description,
          `\`${getBooleanValue(required)}\``,
          `\`${defaultValue}\``,
        ]);
      },
    );
    result += `${markdownTable(mTable, { align: ["l", "c", "l", "c", "l"] })}\n\n`;
  });

  writeFileSync("./docs/API.md", result);
};

generateApiDocs(programName, programDescription);
