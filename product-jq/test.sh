jaq <product-tests.json '.[] | tostring' |
rush -kq 'jaq -n {} | jaq -cr \"#\ \"+.name,\"input:\",.input[],\"output:\"; jaq -n {} | jaq .input | jaq -cf product.jq; echo ""' |
python -m approvaltests -t product