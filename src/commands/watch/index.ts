import { context } from "esbuild";
import { WatchTypes } from "./data";
import { getESBuildOptions } from "../../utils/esbuild";

export const watchAction = async ({ src, out }: WatchTypes) => {
  const { classOptions, bundleOptions } = await getESBuildOptions({ src, out });
  const classContext = await context(classOptions);
  const bundleContext = await context(bundleOptions);
  await Promise.all([bundleContext.watch(), classContext.watch()]);
  console.log("Watching...");
};
