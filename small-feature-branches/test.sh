#!/bin/bash

./fizzbuzz.jq | verify -t fizzbuzz -d idiff
