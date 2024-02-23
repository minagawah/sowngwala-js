module.exports = api => {
  // Check the value set for NODE_ENV.
  // When we were:
  //
  // 1. building bundles for CJS, or
  // 2. running Jest tests,
  //
  // we must tell Babel to use
  // CommonJS module system.
  //
  const cjs = api.env(['test', 'commonjs']);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          targets: '> 0.25%, not dead',
          corejs: 3,
          modules: cjs ? 'commonjs' : 'auto',
          targets: cjs
            ? { node: 'current' }
            : {
                esmodules: true,
              },
          debug: false,
        },
      ],
    ],
    plugins: [
      'preval', // Allows 'module.exports'
    ],
  };
};
