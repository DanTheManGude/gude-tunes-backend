import childProcess from "child_process";

export const revision = () => {
  const version =
    process.env.npm_package_version || "No package version available";

  var hash;
  try {
    hash =
      process.env.SOURCE_VERSION ||
      childProcess.execSync("git rev-parse HEAD").toString().trim();
  } catch (e) {
    hash = "Cannot find latest git hash";
  }

  return { version, hash };
};
