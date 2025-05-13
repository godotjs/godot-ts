import {
  EXAMPLE_FILE,
  GITIGNORE,
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
import { version, devDependencies } from "package.json";

import {
  _GITIGNORE,
  EXAMPLE_TS,
  TSCONFIG_JSON,
} from "./generated";
import { rimrafSync } from "rimraf";

const writeIgnoreFolders = (projectDir: string) => {
  const srcPath = `${projectDir}/src`;
  if (!existsSync(srcPath)) {
    mkdirSync(srcPath);
  }
  const nodeModulesPath = `${projectDir}/node_modules`;
  if (!existsSync(nodeModulesPath)) {
    mkdirSync(nodeModulesPath);
  }
  const gdIgnoreNodeModulesPath = `${nodeModulesPath}/.gdignore`;
  if (!existsSync(gdIgnoreNodeModulesPath)) {
    writeFileSync(gdIgnoreNodeModulesPath, "");
  }
};

const generateFiles = ({
  createNewProject,
  name,
  root,
  forceDelete,
  filesToCreate,
}: {
  createNewProject: boolean;
  name: string;
  root: string;
  forceDelete: boolean;
  filesToCreate: Record<string, string>;
}) => {
  let projectDir = `${root}/${name}`;
  if (createNewProject) {
    if (existsSync(projectDir)) {
      if (forceDelete) {
        rimrafSync(projectDir);
        mkdirSync(projectDir);
      } else {
        throw Error(`${projectDir} exists already`);
      }
    } else {
      mkdirSync(projectDir);
    }
  } else {
    projectDir = ".";
  }

  writeIgnoreFolders(projectDir);

  for (const [fileName, content] of Object.entries(filesToCreate)) {
    try {
      const path = `${projectDir}/${fileName}`;
      if (!existsSync(path)) {
        writeFileSync(path, content, "utf8");
      }
    } catch (e: unknown) {
      console.warn(e);
    }
  }

  console.log("Generated files done, start by running:");
  if (createNewProject) {
    console.log(`cd ${name}`);
  }
  console.log("npm i");
  console.log("npm run dev");
};

const byteArrayAsString = (array: number[]): string =>
  String.fromCharCode.apply(null, array);

export const initAction = async (initConfig: InitConfigType) => {
  const config = await startInquirerProcess<InitConfigType>(
    initConfig,
    initOptions,
  );
  const { name, dry, out, forceDelete } = config;

  const filesToCreate: Record<string, string> = {};
  const root = out.endsWith("/") ? out.slice(0, out.length - 1) : out;
  const currentDir = readdirSync(root);

  let createNewProject = true;
  if (currentDir.includes(GODOT_PROJECT_FILE)) {
    createNewProject = false;
  } else {
    filesToCreate[GODOT_PROJECT_FILE] = getGodotProject(name);
  }

  filesToCreate[PACKAGE_JSON_FILE] = getPackageJson(
    name,
    version,
    devDependencies["npm-run-all2"],
    devDependencies.typescript,
  );
  filesToCreate[TS_CONFIG_FILE] = byteArrayAsString(TSCONFIG_JSON);
  filesToCreate[EXAMPLE_FILE] = byteArrayAsString(EXAMPLE_TS);
  filesToCreate[GITIGNORE] = byteArrayAsString(_GITIGNORE);

  if (dry) {
    const result = {
      config,
      createNewProject,
      filesToCreate: Object.keys(filesToCreate),
    };
    console.log(result);
    return result;
  } else {
    generateFiles({ createNewProject, name, root, forceDelete, filesToCreate });
  }
};
