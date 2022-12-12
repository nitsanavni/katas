# ["echo \"test: ", .name, "\"; jaq -n \"$(<highest-elf-calory-count.jq)",(.jq[]|tostring),"\"'; echo \"\""] | join("")
# ["echo \"test: ", .name, "\"; jaq -n --arg jq ", ," '$(<highest-elf-calory-count.jq)","[\"0\"]","'; echo \"\""] | join("")
# ["echo 'test: ", .name, "'; jaq -nf <(cat highest-elf-calory-count.jq; echo '", (.jq[]|tostring),"'); echo ''"] | join("")
["echo \"test: ", .name, "\"; jaq -nf <(cat highest-elf-calory-count.jq; echo '", (.jq[]|tostring),"'); echo ''"] | join("")
