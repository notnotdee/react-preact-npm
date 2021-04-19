#!/usr/bin/env node

const { program } = require("commander");
const { prompt } = require("inquirer");
const reactSetup = require("./lib/reactSetup");

const scripts = {
  reactSetup,
};

const init = async (config) => {
  return scripts[config.type](config);
};

const getConfig = async (program) => {
  return program.type && program.args[0]
    ? {
        type: program.type,
        applicationFolder: program.args[0],
        appName: program.name || program.args[0],
      }
    : prompt([
        {
          type: "list",
          name: "type",
          message: "Application Type",
          choices: [{ name: "react", value: "reactSetup" }],
        },
        {
          type: "input",
          name: "applicationFolder",
          message: "Application Folder (. for current folder)",
          default: "react-app",
        },
        {
          type: "input",
          name: "appName",
          message: "Application Name",
          default: "react-app",
        },
      ]);
};

program
  .option(
    "-t, --type <type>",
    "application type (currently only supports react)"
  )
  .option("-n, --name <name>", "application name")
  .parse(process.argv);

getConfig(program).then(init);
