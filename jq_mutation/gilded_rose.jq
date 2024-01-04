def foo:
    if .name != "Aged Brie" and .name != "Backstage passes to a TAFKAL80ETC concert" then
        if .quality > 0 then
            if .name != "Sulfuras, Hand of Ragnaros" then
                .quality = .quality - 1
            end
        end
    else
        if .quality < 50 then
            .quality = .quality + 1
            |
            if .name == "Backstage passes to a TAFKAL80ETC concert" then
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
        end
    end
    |
    if .name != "Sulfuras, Hand of Ragnaros" then
        .sell_in = .sell_in - 1
    end
    |
    if .sell_in < 0 then
        if .name != "Aged Brie" then
            if .name != "Backstage passes to a TAFKAL80ETC concert" then
                if .quality > 0 then
                    if .name != "Sulfuras, Hand of Ragnaros" then
                        .quality = .quality - 1
                    end
                end
            else
                .quality = .quality - .quality
            end
        else
            if .quality < 50 then
                .quality = .quality + 1
            end
        end
    end;

def update_brie: foo;
def update_backstage: foo;
def update_sulfuras: foo;
def update_regular_item: foo;

def update_item:
    if .name == "Aged Brie" then
        foo
    elif .name == "Backstage passes to a TAFKAL80ETC concert" then
        foo
    elif .name == "Sulfuras, Hand of Ragnaros" then
        foo
    else
        foo
    end;

def update_quality:
    [.[] | update_item];