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
            "@organisms": "./src/components/organisms",
            "@molecules": "./src/components/molecules",
            "@atoms": "./src/components/atoms",
            "@ecosystems": "./src/components/ecosystems",
            "@features": "./src/features",
            "@utils": "./src/utils"
          }
        },
      ],
    ],
  };
};
