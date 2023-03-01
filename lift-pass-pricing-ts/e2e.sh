#!/usr/bin/env bash

timeout 2 node index.js > /dev/null &
sleep .5
port=$((3000 + ${STRYKER_MUTATOR_WORKER:-0}))
curl "localhost:$port/prices?type=1jour"