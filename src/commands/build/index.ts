import { build } from "esbuild";
import { BuildConfigType } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";
import { startConfigProcess } from "../../utils/config-process";
import { CONFIG_NAME } from "../../data";

export const buildAction = async (passedConfig: BuildConfigType) => {
  const config = await startConfigProcess(CONFIG_NAME, passedConfig);
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
