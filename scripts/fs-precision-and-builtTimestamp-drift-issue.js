var lib = require ('./shared');

lib.restoreFiles(function() {

  lib.doACompile(function() {
    lib.doACompile(function() {
      lib.doACompile(function() {
        lib.doACompile(function() {
          lib.verifyThingsWorked();
        });
      });
    });
  });

  // During the first compilation run modify some files
  setTimeout(lib.modifyFilesSmall, 100);

});
