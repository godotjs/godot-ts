export const getPackageJson = (
  name: string,
  version: string,
  npmRunAll: string,
  typescript: string,
) =>
  JSON.stringify(
    {
      name: `${name}`,
      version: "0.0.0",
      type: "module",
      scripts: {
        build: "godot-ts build",
        dev: "npm-run-all build -p watch open-editor",
        "open-editor": "godot -e --path .",
        start: "godot",
        watch: "godot-ts watch",
      },
      devDependencies: {
        "@godot-js/ts": `^${version}`,
        "npm-run-all": `${npmRunAll}`,
        typescript: `${typescript}`,
      },
      types: "./godot.d.ts",
    },
    undefined,
    2,
  );
