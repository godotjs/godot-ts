# GodotTS

Tool for using [GodotJS](https://github.com/godotjs/javascript) with TypeScript.

## Contents

- [Use](#use)
- [API](#api)

## Use

1. [Download the editor](https://github.com/godotjs/javascript/releases)
2. Rename the downloaded file to `godot` and [add Godot to your path](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html#path)
3. Open a terminal
4. Test if you can use Godot via CLI and run `godot --version`
5. Run `npx -y @godot-js/godot-ts init` - new project will be crated at your current terminal path
6. Follow the prompts
7. After Godot editor opens click on `Project/Reload current project` to see all generated files

## API

### Help

```shell
@godot-js/godot-ts --help
```

### Init

Creates a new GodotJS project with TypeScript support

```shell
@godot-js/godot-ts init
```

### Build

Build `*.ts` files once and minified

```shell
@godot-js/godot-ts build
```

### Watch

Watching for changes in `*.ts` files and rebuilding on need

```shell
@godot-js/godot-ts watch
```
