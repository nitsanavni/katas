def inc_quality: if .quality < 50 then .quality = .quality + 1 end;
def dec_quality: if .quality > 0 then .quality = .quality - 1 end;
def dec_sell_in: .sell_in = .sell_in - 1;

def update_brie:
    inc_quality
    |
    dec_sell_in
    |
    if .sell_in < 0 then
        inc_quality
    end;

def update_backstage_passes:
    inc_quality
    |
    if .sell_in < 11 then
        inc_quality
    end
    |
    if .sell_in < 6 then
        inc_quality
    end
    |
    dec_sell_in
    |
    if .sell_in < 0 then
        .quality = 0
    end;

def update_sulfuras: .;

def update_regular_item:
    dec_quality
    |
    dec_sell_in
    |
    if .sell_in < 0 then
        dec_quality
    end;

def update_item:
    if .name == "Aged Brie" then
        update_brie
    elif .name == "Backstage passes to a TAFKAL80ETC concert" then
        update_backstage_passes
    elif .name == "Sulfuras, Hand of Ragnaros" then
        update_sulfuras
    else
        update_regular_item
    end;

def update_quality: [.[] | update_item];
