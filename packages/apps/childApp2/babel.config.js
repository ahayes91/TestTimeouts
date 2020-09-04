module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
  ignore: [/node_modules/],
};
