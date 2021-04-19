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
  'babel-eslint',
  'babel-loader',
  'clean-webpack-plugin',
  'copy-webpack-plugin',
  'dotenv-webpack',
  'eslint',
  'eslint-plugin-babel',
  'eslint-plugin-react',
  'html-webpack-plugin',
  'identity-obj-proxy',
  'jest',
  'prop-types',
  'url-loader',
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
