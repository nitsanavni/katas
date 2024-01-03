def inc_quality: if .quality < 50 then .quality = .quality + 1 end;
def dec_quality: if .quality > 0 then .quality = .quality - 1 end;
def dec_sell_in: .sell_in = .sell_in - 1;
def times(n;f): reduce range(n) as $i (.;f);

def brie_inc_times: if .sell_in < 0 then 2 else 1 end;

def update_brie:
    dec_sell_in | times(brie_inc_times; inc_quality);


def backstage_passes_inc_times:
    if .sell_in < 5 then
        3
    elif .sell_in < 10 then
        2
    else
        1
    end;

def update_backstage_passes:
    dec_sell_in | times(backstage_passes_inc_times; inc_quality)
    |
    if .sell_in < 0 then
        .quality = 0
    end;

def update_sulfuras: .;

def regular_item_dec_times: if .sell_in < 0 then 2 else 1 end;

def update_regular_item:
    dec_sell_in | times(regular_item_dec_times; dec_quality);

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
