const Promise           = require('rsvp').Promise;
const spawn             = require('child_process').spawn;
const defaults          = require('lodash').defaults;

module.exports = function runCommand(command, options) {
  if(!options) {
    options = {};
  }

  return spawnProcess(command, options);
};

function spawnProcess(commandString, options) {
  return new Promise(function(resolve, reject) {
    options = defaults(options, {
      maxBuffer: 5000 * 1024,
      stdio: 'inherit'
    });

    let args = commandString.split(' ');
    let command = args.shift();

    let ref = spawn(command, args, options);

    ref.on('close', function (code) {
      resolve(code);
    });
  });
}
