export const pathClean = (path: string): string => {
  // Windows workaround
  let fixPath = path.replaceAll("\\", "/");

  if (fixPath.endsWith("/")) {
    fixPath = fixPath.slice(0, fixPath.length - 1);
  }

  return fixPath;
};

export const stripRelativePath = (path?: string): string => {
  if (!path) {
    return "";
  }

  if (path.startsWith(".")) {
    return path.slice(1, path.length);
  }

  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
};
