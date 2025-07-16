module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
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
          },
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json']
        }
      ],
      'react-native-reanimated/plugin' // This must be last
    ],
  };
};
