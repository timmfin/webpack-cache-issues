# Restore original files
if [ -f es6/Point-old.js ]; then
  echo "Restoring es6/Point.js"
  mv es6/Point-old.js es6/Point.js
  # touch es6/Point.js
fi

if [ -f es6/other-small-thing-old.js ]; then
  echo "Restoring es6/other-small-thing.js"
  mv es6/other-small-thing-old.js es6/other-small-thing.js
  # touch es6/other-small-thing.js
fi


