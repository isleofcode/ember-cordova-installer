const VersionChecker    = require('ember-cli-version-checker');
const awaitCommand      = require('./utils/await-command');
const chalk             = require('chalk');

module.exports = {
  install: function(name, project) {
    let checker = new VersionChecker(project);
    let emberCordova = checker.for('ember-cordova', 'npm');
    let corber = checker.for('corber', 'npm');
    let installCmd;

    if (!emberCordova.version && !corber.version) {
      throw new Error(chalk.red(`ember-cordova plugin error:
        Can not install ${name} as corber || ember-cordova is not installed`
      ));
    }

    if (corber.version !== undefined) {
      installCmd = 'corber plugin add';
    }

    if (emberCordova.version !== undefined) {
      installCmd = 'ember cdv:plugin add';
    }

    return awaitCommand(`${installCmd} ${name}`).then(function() {
      console.log(chalk.green(`ember-cordova: Installed plugin ${name}`));
    });
  }
}
