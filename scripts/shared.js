var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var webpack = require("webpack");


var compiler = webpack(require('../webpack.config.js'));
var run = 1;

function doACompile(callback) {
  console.log("\n\n===========================\nStarting compile #" + run);

  compiler.run(function(err, stats) {
    var filteredOtherBundleOutput = fs.readFileSync('./other-bundle.js').toString().split('\n').filter(function(line) {
      return line.indexOf('/***') === -1 && line.trim() !== '';
    });

    // console.log("\n\nRun #" + run + " stats:", util.inspect(stats, { depth: 0 }));
    console.log("\n\nRun #" + run + " finished. other-bundle.js output:\n  ", filteredOtherBundleOutput.join('\n  '));

    run += 1;
    if (callback) callback();
  });
}

var changeCtr = 0;

function modifyFilesBig() {
  spawn('./big-change.sh', [++changeCtr], { stdio: 'inherit' });
}

function modifyFilesSmall() {
  spawn('./little-touch.sh', [++changeCtr], { stdio: 'inherit' });
}

function verifyThingsWorked() {
  var otherBundleContent = fs.readFileSync('./other-bundle.js').toString();
  var expectedFromLastSmallChange = 'small change #' + changeCtr;

  console.error('\n\nSource of es6/other-small-thing.js (to compare output of other-bund.js, ^^^):\n ', fs.readFileSync('./es6/other-small-thing.js').toString().split('\n').join('\n  '));

  if (otherBundleContent.indexOf(expectedFromLastSmallChange) >= 0) {
    console.log('\n\n\033[32mAll changes present, things check out.   ✓\033[0m');
  } else {
    console.error('\n\n\033[31mLast small change (\'' + expectedFromLastSmallChange + '\') from `es6/other-small-thing.js` is missing from `other-bundle.js` output!\nSo the build incorrectly cached things ✗\033[0m');
    process.exit(1);
  }
}

function restoreFiles(callback) {
  exec('./restore.sh', function(error, stdout, stderr) {
    console.log(stdout);
    callback();
  });
}

module.exports = {
  doACompile: doACompile,
  verifyThingsWorked: verifyThingsWorked,

  restoreFiles: restoreFiles,
  modifyFilesBig: modifyFilesBig,
  modifyFilesSmall: modifyFilesSmall
};
