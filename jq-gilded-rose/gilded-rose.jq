def dec_quality:
    if .quality > 0 then
        .quality -= 1
    else . end;

def inc_quality:
    if .quality < 50 then
        .quality += 1
    else . end;

def update_brie:
        inc_quality
        |
        .sell_in -= 1
        |
        if .sell_in < 0 then
            inc_quality
        else . end;

def update_backstage:
        inc_quality
        |
        if .sell_in < 11 then
            inc_quality
        else . end
        |
        if .sell_in < 6 then
            inc_quality
        else . end
        |
        .sell_in -= 1
        |
        if .sell_in < 0 then
            .quality = 0
        else . end;

def update_regular_item:
        dec_quality
        |
        .sell_in -= 1
        |
        if .sell_in < 0 then
            dec_quality
        else . end;

def update_quality:
    if .name == "Aged Brie" then
        update_brie
    elif .name == "Backstage passes to a TAFKAL80ETC concert" then
        update_backstage
    elif .name == "Sulfuras, Hand of Ragnaros" then
        .
    else
        update_regular_item
    end;
