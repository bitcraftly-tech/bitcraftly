export interface BuildInfo {
  readonly version: string;
  readonly commit: string;
  readonly buildId: string;
  readonly environment: string;
  readonly nodeVersion: string;
}

export function getBuildInfo(): BuildInfo {
  return {
    version: process.env.npm_package_version ?? '0.1.0',
    commit:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.GITHUB_SHA ??
      process.env.COMMIT_SHA ??
      'unknown',
    buildId: process.env.VERCEL_DEPLOYMENT_ID ?? process.env.BUILD_ID ?? 'local',
    environment: process.env.NODE_ENV ?? 'development',
    nodeVersion: process.version,
  };
}
