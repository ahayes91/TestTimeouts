module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['>1%', 'last 4 versions', 'not ie < 11', 'current node'],
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'babel-plugin-add-module-exports',
  ],
  ignore: [/node_modules/],
  env: {
    test: {
      plugins: [['@babel/transform-runtime', { regenerator: true }]],
    },
  },
  sourceType: 'unambiguous',
};
