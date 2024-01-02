def inc_quality: if .quality < 50 then .quality += 1 else . end;

def dec_quality: if .quality > 0 then .quality -= 1 else . end;

def dec_sell_in: .sell_in -= 1;

def brie_quality: if .sell_in < 0 then 2 else 1 end;

def inc_quality_by(by): .quality += by | if .quality > 50 then .quality = 50 else . end;

def update_brie: dec_sell_in | inc_quality_by(brie_quality);

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
    dec_sell_in
    |
    if .sell_in < 0 then
        .quality = 0
    else . end;

def update_sulfuras: .;

def update_regular_item:
    dec_quality
    |
    dec_sell_in
    |
    if .sell_in < 0 then
        dec_quality
    else . end;


def update_item:
    if .name == "Aged Brie" then
        update_brie
    elif .name == "Backstage passes to a TAFKAL80ETC concert" then
        update_backstage
    elif .name == "Sulfuras, Hand of Ragnaros" then
        update_sulfuras
    else
        update_regular_item
    end;

def update_quality:
    [.[] | update_item];