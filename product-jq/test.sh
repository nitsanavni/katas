jaq <product-tests.json '.[] | tostring' | rush -kq 'jaq -n {} | jaq -r .name; jaq -n {} | jaq .input | jaq -f product.jq; echo ""' | python -m approvaltests -t product
