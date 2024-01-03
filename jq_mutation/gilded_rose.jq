def foo:
    if .quality > 0 then
        if .name != "Sulfuras, Hand of Ragnaros" then
            .quality = .quality - 1
        end
    end
    |
    if .name != "Sulfuras, Hand of Ragnaros" then
        .sell_in = .sell_in - 1
    end
    |
    if .sell_in < 0 then
        if .quality > 0 then
            if .name != "Sulfuras, Hand of Ragnaros" then
                .quality = .quality - 1
            end
        end
    end;

def update_brie:
    if .quality < 50 then
        .quality = .quality + 1
    end
    |
    .sell_in = .sell_in - 1
    |
    if .sell_in < 0 then
        if .quality < 50 then
            .quality = .quality + 1
        end
    end;

def update_backstage_passes:
    if .quality < 50 then
        .quality = .quality + 1
        |
        if .sell_in < 11 then
            if .quality < 50 then
                .quality = .quality + 1
            end
        end
        |
        if .sell_in < 6 then
            if .quality < 50 then
                .quality = .quality + 1
            end
        end
    end
    |
    .sell_in = .sell_in - 1
    |
    if .sell_in < 0 then
        .quality = .quality - .quality
    end;

def update_sulfuras: .;

def update_regular_item: foo;

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
