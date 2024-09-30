# API - @godot-js/ts

CLI for using GodotJS with TypeScript

## init

Creates a new GodotJS project with TypeScript support

| long            | short | description                                            | required | defaultValue |
| :-------------- | :---: | :----------------------------------------------------- | :------: | :----------- |
| `--name`        |  `-n` | The name of your project                               |    `✅`   | `MyGame`     |
| `--out`         |  `-o` | Relative path where project is written                 |    `✅`   | `.`          |
| `--forceDelete` |  `-f` | Removes project dir if it's already there              |    `❌`   | `false`      |
| `--dry`         |  `-d` | Do a dry run with this command - prints/returns output |    `❌`   | `false`      |

## build

Build typescript files

| long              | short | description                                            | required | defaultValue             |
| :---------------- | :---: | :----------------------------------------------------- | :------: | :----------------------- |
| `--src`           |  `-s` | Relative path where *.ts files located                 |    `✅`   | `./src`                  |
| `--out`           |  `-o` | Relative path where *.ts files are written             |    `✅`   | `./scripts/js/generated` |
| `--dry`           |  `-d` | Do a dry run with this command - prints/returns output |    `❌`   | `false`                  |
| `--minifyClasses` | `-mc` | Minifies GodotJS classes                               |    `❌`   | `true`                   |

## watch

Watch typescript files

| long    | short | description                                            | required | defaultValue             |
| :------ | :---: | :----------------------------------------------------- | :------: | :----------------------- |
| `--src` |  `-s` | Relative path where *.ts files located                 |    `✅`   | `./src`                  |
| `--out` |  `-o` | Relative path where *.ts files are written             |    `✅`   | `./scripts/js/generated` |
| `--dry` |  `-d` | Do a dry run with this command - prints/returns output |    `❌`   | `false`                  |

