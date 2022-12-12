["echo \"test: ", .name, "\"; jaq -n \"$(<highest-elf-calory-count.jq)",(.jq[]|tostring),"\"; echo \"\""] | join("")
