def split_per_elf:
    reduce .[] as $l ([[]]; if $l == "" then . + [[]] else .[-1] = .[-1] + [$l] end);

def split_per_elf_gr:
    split("\n\n") | map(split("\n"));

def numbers:
    map(map(tonumber));

def sum:
    add;

def highest_calories:
    split_per_elf | numbers | map(add) | max;

def top_three:
    split_per_elf |
    numbers |
    map(add) |
    reduce .[] as $n ([0,0,0]; .[0] as $min | if $min < $n then .[-2:] + [$n] | sort else . end) | add;
