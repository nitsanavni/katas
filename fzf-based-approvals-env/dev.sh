true | fzf --query "$(cat code.sh)" \
         --print-query \
         --preview 'bash -c {q} | verify -d diff;echo ---;echo output;echo ---;bash -c {q}' \
         --phony \
         --preview-window "bottom:80%" \
         --bind 'ctrl-a:execute-silent(cp .received .approved; echo {q} > code.sh)+refresh-preview'
