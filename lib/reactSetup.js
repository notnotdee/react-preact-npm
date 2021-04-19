const path = require('path');
const { copyFiles, init, installDependencies } = require('./helpers');

const dependencies = ['react', 'react-dom'];

const devDependencies = [
  '@babel/core',
  '@babel/plugin-proposal-class-properties',
  '@babel/preset-env',
  '@babel/preset-react',
  '@testing-library/react',
  '@types/jest',
  'autoprefixer',
  'babel-eslint',
  'babel-loader',
  'clean-webpack-plugin',
  'copy-webpack-plugin',
  'css-loader',
  'dotenv-webpack',
  'eslint',
  'eslint-plugin-babel',
  'eslint-plugin-react',
  'file-loader',
  'html-webpack-plugin',
  'identity-obj-proxy',
  'jest',
  'postcss-import',
  'postcss-loader',
  'postcss-nested',
  'postcss-simple-vars',
  'prop-types',
  'url-loader',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
];

module.exports = async (config) => {
  const { applicationFolder } = config;
  await copyFiles(path.join(__dirname, '../react'), applicationFolder, config);
  await init(applicationFolder);
  await installDependencies(applicationFolder, devDependencies, dependencies);
};
