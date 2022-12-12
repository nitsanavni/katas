["echo \"test: ", .name, "\"; jaq -nf <(cat highest-elf-calory-count.jq; echo '", (.jq[]|tostring),"'); echo ''"] | join("")
