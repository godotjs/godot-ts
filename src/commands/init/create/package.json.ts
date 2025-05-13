export const getPackageJson = (
  name: string,
  version: string,
  npmRunAll: string,
  typescript: string,
  typesNode: string,
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
        start: "npm run build && godot",
        watch: "godot-ts watch",
      },
      devDependencies: {
        "@godot-js/godot-ts": `^${version}`,
        "@types/node": `${typesNode}`,
        "npm-run-all2": `${npmRunAll}`,
        typescript: `${typescript}`,
      },
      "godot-ts": {
        src: ".",
        out: "./.godot/GodotJS",
        minifyClasses: true,
      },
    },
    undefined,
    2,
  );
