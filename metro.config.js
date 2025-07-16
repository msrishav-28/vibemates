const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add support for path aliases
config.resolver.alias = {
  '@': './src',
  '@components': './src/components',
  '@screens': './src/screens',
  '@navigation': './src/navigation',
  '@theme': './src/theme',
  '@utils': './src/utils',
  '@hooks': './src/hooks',
  '@store': './src/store',
  '@types': './src/types',
  '@constants': './src/constants',
  '@services': './src/services',
  '@assets': './assets',
  '@data': './src/data'
};

// Optimize for performance
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

module.exports = config;
