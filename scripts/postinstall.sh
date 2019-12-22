#!/bin/bash

echo "Setting git to ignore ssh-config"
git update-index --assume-unchanged packages/api/src/ssh-config.ts