var lib = require ('./shared');

lib.restoreFiles(function() {

  lib.doACompile(function() {
    // Modify post-compile, not during
    lib.modifyFilesSmall();


    setTimeout(function() {
      lib.doACompile(function() {
        // Doesn't work here, because the the CachePlugin compiler "run" plugin code
        // runs before the NodeEnvironmentPlugin compiler "run" (which purges
        // the CachedInputFileSystem.
        lib.verifyThingsWorked();
      });
    }, 1000);
  });


});
