#!/bin/bash

(cd packages/api ; yarn dev) & \
(cd packages/ui ; yarn start:integration)
