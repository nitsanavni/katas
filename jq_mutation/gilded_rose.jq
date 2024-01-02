def update_brie:
    if .quality < 50 then
        .quality = .quality + 1
    else . end
    |
    .sell_in = .sell_in - 1
    |
    if .sell_in < 0 then
        if .quality < 50 then
            .quality = .quality + 1
        else . end
    else . end;

def update_backstage:
    if .quality < 50 then
        .quality = .quality + 1
        |
        if .sell_in < 11 then
            if .quality < 50 then
                .quality = .quality + 1
            else . end
        else . end
        |
        if .sell_in < 6 then
            if .quality < 50 then
                .quality = .quality + 1
            else . end
        else . end
    else . end
    |
    .sell_in = .sell_in - 1
    |
    if .sell_in < 0 then
        .quality = .quality - .quality
    else . end;

def update_sulfuras: .;

def update_regular_item:
    if .quality > 0 then
            .quality = .quality - 1
    else . end
    |
    .sell_in = .sell_in - 1
    |
    if .sell_in < 0 then
        if .quality > 0 then
            .quality = .quality - 1
        else . end
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