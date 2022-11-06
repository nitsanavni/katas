.[0]=(.[0] | split(" ") | (.[1] = (.[1] | tonumber | .+1 | tostring)) | join(" "))
