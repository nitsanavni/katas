#!/usr/bin/bash

# this is a simple rotation timer
# it opens itself every X seconds

# re-arrange the following list

# John
# George
# Ringo
# -- typing ---->
# Paul

two_minutes=120
every="${1:-$two_minutes}"
editor="${2:-$EDITOR}"
watch -n $every "./rotate $BASH_SOURCE && $editor $BASH_SOURCE"
