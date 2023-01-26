```
ls mm | entr -c docker run --rm -u `id -u`:`id -g` -v $PWD:/data minlag/mermaid-cli -i mm -t forest
```
