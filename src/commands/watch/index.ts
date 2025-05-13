import { context } from "esbuild";
import { WatchConfigType } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";
import { startConfigProcess } from "../../utils/config-process";
import { CONFIG_NAME } from "../../data";

export const watchAction = async (passedConfig: WatchConfigType) => {
  const config = await startConfigProcess(CONFIG_NAME, passedConfig);
  const { src, out, dry } = config;

  const { classOptions, bundleOptions } = await getESBuildOptions({
    src,
    out,
    sourcemap: true,
    minifyClasses: false,
  });

  if (dry) {
    const result = { config, classOptions, bundleOptions };
    console.log(result);
    return result;
  } else {
    const classContext = await context(classOptions);
    const bundleContext = await context(bundleOptions);
    await Promise.all([bundleContext.watch(), classContext.watch()]);
    console.log("Watching...");
  }
};
