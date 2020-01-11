#!/bin/bash

echo "Setting git to ignore ssh-config"

find ./  -iname ssh-config -exec git update-index --assume-unchanged {} \;