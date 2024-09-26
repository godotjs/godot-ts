import { build } from "esbuild";
import { BuildConfigType } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";

export const buildAction = async (config: BuildConfigType) => {
  const { minifyClasses, src, out, dry } = config;
  const { classOptions, bundleOptions } = await getESBuildOptions({
    src,
    out,
    minifyClasses,
  });
  if (dry) {
    const result = { config, classOptions, bundleOptions };
    console.log(result);
    return result;
  } else {
    await build(classOptions);
    await build(bundleOptions);
  }
};
