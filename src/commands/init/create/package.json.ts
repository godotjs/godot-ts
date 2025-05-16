export const getPackageJson = (
  name: string,
  version: string,
  npmRunAll: string,
  typescript: string,
  typesNode: string,
  nodemon: string,
) =>
  JSON.stringify(
    {
      name: `${name}`,
      version: "0.0.0",
      type: "module",
      scripts: {
        build: "godot-ts build",
        dev: "npm-run-all build generate -p watch watch-generate open-editor",
        generate: "godot-ts generate",
        "open-editor": "godot -e --path .",
        start: "npm run build && godot",
        watch: "godot-ts watch",
        "watch-generate": ' nodemon --exec "godot-ts generate" -e gd',
      },
      devDependencies: {
        "@godot-js/godot-ts": `^${version}`,
        "@types/node": `${typesNode}`,
        nodemon: `${nodemon}`,
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
