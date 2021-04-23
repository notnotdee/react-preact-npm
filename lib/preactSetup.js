const path = require('path');
const { copyFiles, init, installDependencies } = require('./helpers');

const dependencies = ['preact', 'preact-render-to-string', 'preact-router'];

const devDependencies = [
  'enzyme',
  'enzyme-adapter-preact-pure',
  'eslint',
  'eslint-config-preact',
  'jest',
  'jest-preset-preact',
  'preact-cli',
  'sirv-cli',
];

module.exports = async (config) => {
  const { applicationFolder } = config;
  await copyFiles(path.join(__dirname, '../preact'), applicationFolder, config);
  await init(applicationFolder);
  await installDependencies(applicationFolder, devDependencies, dependencies);
};
