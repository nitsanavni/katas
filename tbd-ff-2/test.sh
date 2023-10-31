#!/bin/bash

jq -nrf fizzbuzz.jq | verify -t range -d idiff
