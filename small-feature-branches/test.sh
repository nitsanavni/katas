#!/bin/bash

./fizzbuzz.jq | head -n 20 | verify -t fizzbuzz -d idiff
