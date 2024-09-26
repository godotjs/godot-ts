import { context } from "esbuild";
import { WatchConfigType } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";

export const watchAction = async (config: WatchConfigType) => {
  const { src, out, dry } = config;
  const { classOptions, bundleOptions } = await getESBuildOptions({ src, out });

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
