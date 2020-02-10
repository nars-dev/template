/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    // for node modules that aren't under client/node_modules
    // look in workspace hoisted node_modules or in ../config
    // for the config
    extraNodeModules: new Proxy(
      {
        '<PROJECT_NAME_PLACEHOLDER>-config': path.resolve(__dirname, '../config'),
        'nars-client': path.resolve(__dirname, '../node_modules', 'nars-client'),
      },
      {
        get: (target, name) => {
          return name in target
            ? target[name]
            : path.resolve(__dirname, '../node_modules', `${name}`);
        },
      },
    ),
  },
  watchFolders: [
    path.resolve(__dirname, '../config'),
    path.resolve(__dirname, '../node_modules'),
  ],
};
