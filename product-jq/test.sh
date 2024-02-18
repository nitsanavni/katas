jq <product-tests.json '.[] | tostring' |
    rush -kq 'jq -n {} | jq -cr \"#\ \"+.name,\"input:\",.input[],\"output:\"; jq -n {} | jq .input | jq -cf product.jq; echo ""' #|
# python -m approvaltests -t product
