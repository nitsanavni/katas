jq -rnf code.jq | diff -u - approved && echo same
