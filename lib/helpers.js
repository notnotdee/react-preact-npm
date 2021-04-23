const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { render } = require('mustache');
const chalk = require('chalk');

const createGitignore = (applicationFolder) => {
  return fs.writeFile(
    `${applicationFolder}/.gitignore`,
    `node_modules/
.env
dist/
/build
/*.log
`
  );
};

const copyFiles = async (src, applicationFolder, config) => {
  try {
    console.log(chalk.green('Setting up files'), applicationFolder);
    if (applicationFolder !== '.') await fs.mkdir(applicationFolder);
    const files = await fs.readdir(src);

    const stats = await Promise.all(
      files
        .filter((file) => file !== '.gitKeep')
        .map((file) => fs.lstat(path.join(src, file)))
    );

    await Promise.all(
      stats.map((stat, i) => {
        const srcFilePath = path.join(src, files[i]);
        const destFilePath = path.join(applicationFolder, files[i]);

        if (stat.isDirectory())
          return copyFiles(srcFilePath, destFilePath, config);

        return makeTemplate(srcFilePath, destFilePath, config);
      })
    );
  } catch (e) {
    console.error(chalk.red(e));
  }
};

const makeTemplate = async (src, dest, config) => {
  const content = await renderFile(src, config);
  return fs.writeFile(dest, content);
};

const renderFile = async (src, config) => {
  const content = await fs.readFile(src, { encoding: 'utf8' });
  return render(content, config);
};

const installDependencies = (
  applicationFolder,
  devDependencies,
  dependencies
) => {
  console.log(chalk.green('Installing devDependencies'));
  execSync(`npm i -D ${devDependencies.join(' ')}`, {
    cwd: applicationFolder,
    stdio: 'inherit',
  });

  console.log(chalk.green('Installing dependencies'));
  execSync(`npm i ${dependencies.join(' ')}`, {
    cwd: applicationFolder,
    stdio: 'inherit',
  });
};

function initGit(applicationFolder) {
  console.log(chalk.green('Initializing git'));

  execSync('git init', {
    cwd: applicationFolder,
    stdio: 'inherit',
  });
}

function init(applicationFolder) {
  return Promise.all([
    createGitignore(applicationFolder),
    initGit(applicationFolder),
  ]);
}

module.exports = {
  copyFiles,
  createGitignore,
  installDependencies,
  init,
  initGit,
};
