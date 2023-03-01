#!/usr/bin/env bash
./e2e.sh > result
cat result
diff result e2e-result