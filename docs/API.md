# API - @godot-js/ts

CLI for using GodotJS with TypeScript

## build

Build typescript files

> You can use `build.json` as a config file. 
  By default it tries to search for the configuration otherwise use a correct path by passing `--config=./build.json`.

| long              | short | description                                            | required | defaultValue         |
| :---------------- | :---: | :----------------------------------------------------- | :------: | :------------------- |
| `--src`           |       | Relative path where *.ts files located                 |    `❌`   | `"."`                |
| `--out`           |       | Relative path where *.ts files are written             |    `❌`   | `"./.godot/GodotJS"` |
| `--dry`           |       | Do a dry run with this command - prints/returns output |    `❌`   |                      |
| `--minifyClasses` |       | Minifies GodotJS classes                               |    `❌`   | `true`               |

## init

Creates a new GodotJS project with TypeScript support

> You can use `init.json` as a config file. 
  By default it tries to search for the configuration otherwise use a correct path by passing `--config=./init.json`.

| long            | short | description                                            | required | defaultValue |
| :-------------- | :---: | :----------------------------------------------------- | :------: | :----------- |
| `--name`        |       | The name of your project                               |    `✅`   | `"MyGame"`   |
| `--out`         |       | Relative path where project is written                 |    `❌`   | `"."`        |
| `--forceDelete` |       | Removes project dir if it's already there              |    `❌`   |              |
| `--dry`         |       | Do a dry run with this command - prints/returns output |    `❌`   |              |

## watch

Watch typescript files

> You can use `watch.json` as a config file. 
  By default it tries to search for the configuration otherwise use a correct path by passing `--config=./watch.json`.

| long    | short | description                                            | required | defaultValue         |
| :------ | :---: | :----------------------------------------------------- | :------: | :------------------- |
| `--src` |       | Relative path where *.ts files located                 |    `❌`   | `"."`                |
| `--out` |       | Relative path where *.ts files are written             |    `❌`   | `"./.godot/GodotJS"` |
| `--dry` |       | Do a dry run with this command - prints/returns output |    `❌`   |                      |

