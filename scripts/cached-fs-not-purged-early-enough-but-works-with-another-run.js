var lib = require ('./shared');

lib.restoreFiles(function() {

  lib.doACompile(function() {
    // Modify post-compile, not during
    lib.modifyFilesSmall();


    setTimeout(function() {
      lib.doACompile(function() {
        // Only works on the _third_ compile even though it should have on the second
        lib.doACompile(function() {
          lib.verifyThingsWorked();
        });
      });
    }, 1000);
  });


});
