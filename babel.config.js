module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src/"],
          alias: {
            "@assets": "./assets",
            "@screens": "./src/screens",
            "@templates": "./src/components/templates",
            "@features": "./src/features",
            "@utils": "./src/utils"
          }
        },
      ],
    ],
  };
};
