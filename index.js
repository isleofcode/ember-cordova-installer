const VersionChecker    = require('ember-cli-version-checker');
const awaitCommand      = require('./utils/await-command');
const chalk             = require('chalk');

module.exports = {
  install: function(name, project) {
    let checker = new VersionChecker(project);
    let dep = checker.for('ember-cordova', 'npm');
    if (!dep.version) {
      throw new Error(chalk.red(`ember-cordova plugin error:
        Can not install ${name} as ember-cordova is not installed`
      ));
    }

    return awaitCommand(`ember cdv:plugin add ${name}`).then(function() {
      console.log(chalk.green(`ember-cordova: Installed plugin ${name}`));
    });
  }
}
