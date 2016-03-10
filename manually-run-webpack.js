var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var webpack = require("webpack");

exec('./restore.sh', function(error, stdout, stderr) {
  console.log(stdout);



  exampleThatDoesntWork();

  // Related, but different issue to ^^^
  // anotherExampleThatDoesntWork();
  // exampleThatDoesWork();
});
