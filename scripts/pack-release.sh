#!/bin/bash

VERSION=$1
RELEASE_NAME="asus-merlin-simple-vpn-client-setup-$VERSION"

if [ -z "$VERSION" ]; then
    echo "No version passed. Usage: yarn pack-release <release-version>"
    exit 1
fi

mkdir -p release
rm -rf ./release/**

mkdir ./release/${RELEASE_NAME}

cp package.json ./release/${RELEASE_NAME}/
cp -R build ./release/${RELEASE_NAME}

echo "USERNAME=" >> ./release/${RELEASE_NAME}/ssh-config
echo "HOST=" >> ./release/${RELEASE_NAME}/ssh-config
echo "PORT=" >> ./release/${RELEASE_NAME}/ssh-config

echo "add-ssh-key" >> ./release/${RELEASE_NAME}/ssh-key

cd ./release

zip -rqq $RELEASE_NAME.zip ./${RELEASE_NAME}
rm -rf ./${RELEASE_NAME}