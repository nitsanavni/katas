#!/bin/bash

jq -nrf fizzbuzz.jq | verify -t fizzbuzz -d idiff
