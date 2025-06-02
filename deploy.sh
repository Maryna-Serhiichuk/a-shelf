#!/bin/bash

BACKEND_DIR="./backend"
HASHFILE="$BACKEND_DIR/.hash"
NEW_HASH=$(cat $BACKEND_DIR/package.json $BACKEND_DIR/yarn.lock | md5sum | awk '{ print $1 }')

if [ -f $HASHFILE ]; then
  OLD_HASH=$(cat $HASHFILE)
else
  OLD_HASH=""
fi
echo "1"
if [ "$DEPENDENCIES_CHANGED" = "true" ] || [ "$NEW_HASH" != "$OLD_HASH" ]; then
  echo "Changes to package.json or yarn.lock detected. Updating node_modules..."
  echo "2"
  cd $BACKEND_DIR
  echo "3"
  yarn install
  echo "4"
  cd -
  echo "5"
  echo $NEW_HASH > $HASHFILE
else
  echo "No changes to dependencies. Skipping yarn install."
fi
