import { build } from "esbuild";
import { BuildTypes } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";

export const buildAction = async ({ minifyClasses, src, out }: BuildTypes) => {
  const { classOptions, bundleOptions } = await getESBuildOptions({
    src,
    out,
    minifyClasses,
  });
  await build(classOptions);
  await build(bundleOptions);
};
