import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoader } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import path from "path";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): Configuration {

    const {paths, mode, isDev} = options;

    return {
        mode: mode,
          entry: paths.entry,
          output: {
              filename: '[name].[contenthash].js',
              path: paths.build,
              clean: true,
            },
            plugins: buildPlugins(options),
            module: {
              rules: buildLoader(options)
            },
            resolve: buildResolvers(),
            devtool: isDev ? 'inline-source-map' : undefined,
            devServer: isDev ?  buildDevServer(options) : undefined,
      }
}