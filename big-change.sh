NUM_RUN=${1:-1}

# Backup original files
if [ ! -f es6/Point-old.js ]; then
  cp es6/Point.js es6/Point-old.js
fi

if [ ! -f es6/other-small-thing-old.js ]; then
  cp es6/other-small-thing.js es6/other-small-thing-old.js
fi


cat lots-of-js.txt >> es6/Point.js
echo "\nModifying Point.js #$NUM_RUN (with big change)", $(stat -f "%m" es6/Point.js)000

echo "console.log('change alongside big change to Point.js #$NUM_RUN')" >> es6/other-small-thing.js
echo "Modifying other-small-thing.js #$NUM_RUN", $(stat -f "%m" es6/other-small-thing.js)000
