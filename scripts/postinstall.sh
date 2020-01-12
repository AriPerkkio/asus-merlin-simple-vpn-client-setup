#!/bin/bash

echo "Setting git to ignore ssh-config"

git update-index --assume-unchanged ssh-config
