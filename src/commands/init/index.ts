import {
  DECORATORS_FILE,
  EXAMPLE_FILE,
  GODOT_D_FILE,
  GODOT_PROJECT_FILE,
  InitConfigType,
  initOptions,
  PACKAGE_JSON_FILE,
  TS_CONFIG_FILE,
} from "./data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { getGodotProject } from "./create/project.godot";
import { getPackageJson } from "./create/package.json";
import { version } from "package.json";

import {
  DECORATORS_BUNDLE_TS,
  EXAMPLE_TS,
  GODOT_D_TS,
  TSCONFIG_JSON,
} from "./generated";

const generateFiles = ({
  createNewProject,
  name,
  filesToCreate,
}: {
  createNewProject: boolean;
  name: string;
  filesToCreate: Record<string, string>;
}) => {
  let projectDir = `./${name}`;
  if (createNewProject) {
    if (existsSync(projectDir)) {
      throw Error(`${projectDir} exists already`);
    } else {
      mkdirSync(projectDir);
    }
  } else {
    projectDir = ".";
  }

  const srcPath = `${projectDir}/src`;
  if (!existsSync(srcPath)) {
    mkdirSync(srcPath);
  }

  Object.entries(filesToCreate).forEach(([fileName, content]) => {
    try {
      const path = `${projectDir}/${fileName}`;
      if (!existsSync(path)) {
        writeFileSync(path, content, "utf8");
      }
    } catch (e: unknown) {
      console.warn(e);
    }
  });

  console.log("Generated files done, start by running:");
  if (createNewProject) {
    console.log(`cd ${name}`);
  }
  console.log("npm i");
  console.log("npm run dev");
};

export const initAction = async (initConfig: InitConfigType) => {
  const config = await startInquirerProcess<InitConfigType>(
    initConfig,
    initOptions,
  );
  const { name, dry } = config;

  const filesToCreate: Record<string, string> = {};
  const currentDir = readdirSync(".");

  let createNewProject = true;
  if (currentDir.includes(GODOT_PROJECT_FILE)) {
    createNewProject = false;
  } else {
    filesToCreate[GODOT_PROJECT_FILE] = getGodotProject(name);
  }

  filesToCreate[PACKAGE_JSON_FILE] = getPackageJson(name, version);
  filesToCreate[TS_CONFIG_FILE] = String.fromCharCode.apply(
    null,
    TSCONFIG_JSON,
  );
  filesToCreate[EXAMPLE_FILE] = String.fromCharCode.apply(null, EXAMPLE_TS);
  filesToCreate[DECORATORS_FILE] = String.fromCharCode.apply(
    null,
    DECORATORS_BUNDLE_TS,
  );
  filesToCreate[GODOT_D_FILE] = String.fromCharCode.apply(null, GODOT_D_TS);

  if (dry) {
    const result = {
      config,
      createNewProject,
      filesToCreate: Object.keys(filesToCreate),
    };
    console.log(result);
    return result;
  } else {
    generateFiles({ createNewProject, name, filesToCreate });
  }
};
