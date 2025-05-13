import { glob } from "glob";
import { BuildOptions } from "esbuild";
import { pathClean } from "./path";

const defaultOutdir = "./.godot/GodotJS";
const defaultOutbase = ".";

const options: BuildOptions = {
  format: "cjs",
  target: "esnext",
};

export type ESBuildType = {
  src?: string;
  out?: string;
  minifyClasses?: boolean;
  sourcemap?: boolean;
};

export const getESBuildOptions = async ({
  minifyClasses,
  src,
  out,
  sourcemap,
}: ESBuildType) => {
  const outbase = pathClean(src ?? defaultOutbase);
  const outdir = pathClean(out ?? defaultOutdir);

  const entryPointsClasses = await glob(`${outbase}/**/*.ts`, {
    ignore: [`${outbase}/**/*.bundle.ts`, `**/*.d.ts`, `**/node_modules/**`],
  });
  const entryPointsBundle = await glob(`${outbase}/**/*.bundle.ts`, {
    ignore: [`**/*.d.ts`, `**/node_modules/**`],
  });
  const classOptions: BuildOptions = {
    entryPoints: entryPointsClasses,
    outExtension: { ".js": ".js" },
    ...options,
    minify: minifyClasses,
    outbase,
    outdir,
    sourcemap,
  };

  const bundleOptions: BuildOptions = {
    entryPoints: entryPointsBundle,
    outExtension: { ".js": ".js" },
    bundle: true,
    minify: true,
    ...options,
    outbase,
    outdir,
    sourcemap,
  };
  return { bundleOptions, classOptions };
};
