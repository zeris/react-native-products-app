module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // otros plugins si tienes (por ejemplo para env), luego AL FINAL:
      'react-native-reanimated/plugin'
    ],
  };
};