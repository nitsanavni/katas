def dec_quality: if .quality > 0 then .quality -= 1 else . end;

def inc_quality: if .quality < 50 then .quality += 1 else . end;

def reset_quality: .quality = 0;

def dec_sell_in: .sell_in -= 1;

def update_brie:
    dec_sell_in |
    if .sell_in < 0 then
        inc_quality |
        inc_quality
    else
        inc_quality
    end;

def update_backstage:
    dec_sell_in |
    if .sell_in < 0 then
        reset_quality
    else
        inc_quality |
        if .sell_in < 10 then
            inc_quality
        else . end |
        if .sell_in < 5 then
            inc_quality
        else . end
    end;

def update_sulfuras: .;

def update_regular_item:
    dec_sell_in |
    if .sell_in < 0 then
        dec_quality |
        dec_quality
    else
        dec_quality
    end;

def update_item:
    if .name == "Aged Brie" then update_brie
    elif .name == "Backstage passes to a TAFKAL80ETC concert" then update_backstage
    elif .name == "Sulfuras, Hand of Ragnaros" then update_sulfuras
    else update_regular_item
    end;

def update_quality: map(update_item);
