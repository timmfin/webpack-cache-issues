# webpack caching issues demo  [![Build Status](https://travis-ci.org/timmfin/webpack-cache-issues.svg?branch=master)](https://travis-ci.org/timmfin/webpack-cache-issues)

A small demo project to illustrate some webpack caching problems (related to and beyond https://github.com/webpack/webpack/issues/2003). Some actual webpack test case for these issues are in progress at https://github.com/timmfin/webpack/blob/mtime-for-caching/test/Compiler-caching.test.js.

## Installation

* Install  [node](https://nodejs.org)
* run `npm install`

## Usage

* Run `node scripts/fs-precision-and-builtTimestamp-drift-issue.js` to replicate the first issue.
* Run `node scripts/cached-fs-not-purged-early-enough.js` to replicate the second issue.

## Example output of main issue

Where the buildTimestamp can "drift" too far away from the mtime when you are directly using the Webpack node API and files will keep being cached that shouldn't. And note, includes some helpful logging of webpack internals.

```
± node scripts/fs-precision-and-builtTimestamp-drift-issue.js
Restoring es6/Point.js
Restoring es6/other-small-thing.js



===========================
Starting compile #1
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =


main.js new buildTimestamp 1457641409333 (in NormalModule.build)
other-small-thing.js new buildTimestamp 1457641409677 (in NormalModule.build)

Modifying Point.js #1, 1457641409000
Modifying other-small-thing.js #1, 1457641409000
Point.js new buildTimestamp 1457641412835 (in NormalModule.build)


Run #1 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);


===========================
Starting compile #2
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =
  /private/tmp/webpack-test/webpack-es6-demo/es6/Point.js: 1457641409000
  /private/tmp/webpack-test/webpack-es6-demo/es6/main.js: 1457490343000
  /private/tmp/webpack-test/webpack-es6-demo/es6/other-small-thing.js: 1457641396000

main.js 1457490343000 (new ts) 1457641409333 (bTs) need rebuild? false
Point.js 1457641409000 (new ts) 1457641412835 (bTs) need rebuild? false
other-small-thing.js 1457641396000 (new ts) 1457641409677 (bTs) need rebuild? false


Run #2 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);


===========================
Starting compile #3
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =
  /private/tmp/webpack-test/webpack-es6-demo/es6/Point.js: 1457641409000
  /private/tmp/webpack-test/webpack-es6-demo/es6/other-small-thing.js: 1457641409000
  /private/tmp/webpack-test/webpack-es6-demo/es6/main.js: 1457490343000

main.js 1457490343000 (new ts) 1457641409333 (bTs) need rebuild? false
Point.js 1457641409000 (new ts) 1457641412835 (bTs) need rebuild? false
other-small-thing.js 1457641409000 (new ts) 1457641409677 (bTs) need rebuild? false


Run #3 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);


===========================
Starting compile #4
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =
  /private/tmp/webpack-test/webpack-es6-demo/es6/Point.js: 1457641409000
  /private/tmp/webpack-test/webpack-es6-demo/es6/main.js: 1457490343000
  /private/tmp/webpack-test/webpack-es6-demo/es6/other-small-thing.js: 1457641409000

main.js 1457490343000 (new ts) 1457641409333 (bTs) need rebuild? false
Point.js 1457641409000 (new ts) 1457641412835 (bTs) need rebuild? false
other-small-thing.js 1457641409000 (new ts) 1457641409677 (bTs) need rebuild? false


Run #4 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);


Source of es6/other-small-thing.js (to compare output of other-bund.js, ^^^):
  console.log(`other small thing: ${window.location}`);
  console.log('small change #1');



Last small change ('small change #1') from `es6/other-small-thing.js` is missing from `other-bundle.js` output!
So the build incorrectly cached things ✗
```


## Example of other issue (CachedInputFileSystem isn't purged before the CachePlugin does its thing)

```
± node scripts/cached-fs-not-purged-early-enough.js
Restoring es6/Point.js
Restoring es6/other-small-thing.js



===========================
Starting compile #1
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =


main.js new buildTimestamp 1457641556387 (in NormalModule.build)
other-small-thing.js new buildTimestamp 1457641556735 (in NormalModule.build)
Point.js new buildTimestamp 1457641559885 (in NormalModule.build)


Run #1 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);

Modifying Point.js #1, 1457641559000
Modifying other-small-thing.js #1, 1457641559000


===========================
Starting compile #2
Purging compiler.inputFileSystem
-- before building files, this.fileTimestamps =
  /private/tmp/webpack-test/webpack-es6-demo/es6/Point.js: 1457641409000
  /private/tmp/webpack-test/webpack-es6-demo/es6/main.js: 1457490343000
  /private/tmp/webpack-test/webpack-es6-demo/es6/other-small-thing.js: 1457641409000

main.js 1457490343000 (new ts) 1457641556387 (bTs) need rebuild? false
Point.js 1457641409000 (new ts) 1457641559885 (bTs) need rebuild? false
other-small-thing.js 1457641409000 (new ts) 1457641556735 (bTs) need rebuild? false


Run #2 finished. other-bundle.js output:
   /* 0 */
    "use strict";
    console.log("other small thing: " + window.location);


Source of es6/other-small-thing.js (to compare output of other-bund.js, ^^^):
  console.log(`other small thing: ${window.location}`);
  console.log('small change #1');



Last small change ('small change #1') from `es6/other-small-thing.js` is missing from `other-bundle.js` output!
So the build incorrectly cached things ✗
```
