def split_per_elf:
    reduce .[] as $l ([[]]; if $l == "" then . + [[]] else .[-1] = .[-1] + [$l] end);

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
    reduce .[] as $n ([0,0,0]; if .[0] < $n then .[-2:] + [$n] | sort else . end) | add;
