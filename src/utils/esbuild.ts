import { readFileSync, writeFileSync } from "node:fs";
import { glob } from "glob";
import { BuildOptions, OnLoadArgs, Plugin } from "esbuild";
import { pathClean, stripRelativePath } from "./path";

const defaultOutdir = "scripts";
const defaultOutbase = "src";

const godotTsPlugin: Plugin = {
  name: "godotTsPlugin",
  setup(build) {
    const absolutePaths: string[] = [];
    build.onLoad({ filter: /\.ts$/ }, (args: OnLoadArgs) => {
      absolutePaths.push(args.path);
      return undefined;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    build.onEnd(async (_) => {
      const { outdir, outbase, outExtension } = build.initialOptions;
      const extension = outExtension?.[".js"] ?? ".js";
      for (const filePath of absolutePaths) {
        const genFilePath = filePath
          // Workaround for windows
          .replaceAll("\\", "/")
          .replace(stripRelativePath(outbase), stripRelativePath(outdir))
          .replace(".ts", extension);
        const content = readFileSync(genFilePath);
        const genContent = `//generatedPath=${filePath}\n${content.toString("utf8")}`;
        writeFileSync(genFilePath, genContent);
      }
    });
  },
};

const options: BuildOptions = {
  format: "esm",
  target: "esnext",
  plugins: [godotTsPlugin],
};

export type ESBuildType = {
  src?: string;
  out?: string;
  minifyClasses?: boolean;
};

export const getESBuildOptions = async ({
  minifyClasses,
  src,
  out,
}: ESBuildType) => {
  const outbase = pathClean(src ?? defaultOutbase);
  const outdir = pathClean(out ?? defaultOutdir);

  const entryPointsClasses = await glob(`${outbase}/**/*.ts`, {
    ignore: [`${outbase}/**/*.bundle.ts`, `${outbase}/**/*.d.ts`],
  });
  const entryPointsBundle = await glob(`${outbase}/**/*.bundle.ts`);
  const classOptions: BuildOptions = {
    entryPoints: entryPointsClasses,
    outExtension: { ".js": ".mjs" },
    ...options,
    minify: minifyClasses,
    outbase,
    outdir,
  };

  const bundleOptions: BuildOptions = {
    entryPoints: entryPointsBundle,
    outExtension: { ".js": ".js" },
    bundle: true,
    minify: true,
    ...options,
    outbase,
    outdir,
  };
  return { bundleOptions, classOptions };
};
