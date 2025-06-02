#!/bin/bash

BACKEND_DIR="./backend"
HASHFILE="$BACKEND_DIR/.hash"
NEW_HASH=$(cat $BACKEND_DIR/package.json $BACKEND_DIR/yarn.lock | md5sum | awk '{ print $1 }')

if [ -f $HASHFILE ]; then
  OLD_HASH=$(cat $HASHFILE)
else
  OLD_HASH=""
fi

if [ "$DEPENDENCIES_CHANGED" = "true" ] || [ "$NEW_HASH" != "$OLD_HASH" ]; then
  echo "Changes to package.json or yarn.lock detected. Updating node_modules..."
  cd $BACKEND_DIR
  yarn install
  echo $NEW_HASH > $HASHFILE
else
  echo "No changes to dependencies. Skipping yarn install."
fi
