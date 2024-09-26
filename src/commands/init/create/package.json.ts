export const getPackageJson = (name: string, version: string) =>
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
        "npm-run-all": "^4.1.5",
        typescript: "^5.6.2",
      },
      types: "./godot.d.ts",
    },
    undefined,
    2,
  );
