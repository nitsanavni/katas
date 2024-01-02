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
    if .name != "Aged Brie" and .name != "Backstage passes to a TAFKAL80ETC concert" then
        if .quality > 0 then
            if .name != "Sulfuras, Hand of Ragnaros" then
                .quality = .quality - 1
            else . end
        else . end
    else
        if .quality < 50 then
            .quality = .quality + 1
            |
            if .name == "Backstage passes to a TAFKAL80ETC concert" then
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
        else . end
    end
    |
    if .name != "Sulfuras, Hand of Ragnaros" then
        .sell_in = .sell_in - 1
    else . end
    |
    if .sell_in < 0 then
        if .name != "Aged Brie" then
            if .name != "Backstage passes to a TAFKAL80ETC concert" then
                if .quality > 0 then
                    if .name != "Sulfuras, Hand of Ragnaros" then
                        .quality = .quality - 1
                    else . end
                else . end
            else
                .quality = .quality - .quality
            end
        else
            if .quality < 50 then
                .quality = .quality + 1
            else . end
        end
    else . end;

def update_sulfuras:
    if .name != "Aged Brie" and .name != "Backstage passes to a TAFKAL80ETC concert" then
        if .quality > 0 then
            if .name != "Sulfuras, Hand of Ragnaros" then
                .quality = .quality - 1
            else . end
        else . end
    else
        if .quality < 50 then
            .quality = .quality + 1
            |
            if .name == "Backstage passes to a TAFKAL80ETC concert" then
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
        else . end
    end
    |
    if .name != "Sulfuras, Hand of Ragnaros" then
        .sell_in = .sell_in - 1
    else . end
    |
    if .sell_in < 0 then
        if .name != "Aged Brie" then
            if .name != "Backstage passes to a TAFKAL80ETC concert" then
                if .quality > 0 then
                    if .name != "Sulfuras, Hand of Ragnaros" then
                        .quality = .quality - 1
                    else . end
                else . end
            else
                .quality = .quality - .quality
            end
        else
            if .quality < 50 then
                .quality = .quality + 1
            else . end
        end
    else . end;

def update_regular_item:
    if .name != "Aged Brie" and .name != "Backstage passes to a TAFKAL80ETC concert" then
        if .quality > 0 then
            if .name != "Sulfuras, Hand of Ragnaros" then
                .quality = .quality - 1
            else . end
        else . end
    else
        if .quality < 50 then
            .quality = .quality + 1
            |
            if .name == "Backstage passes to a TAFKAL80ETC concert" then
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
        else . end
    end
    |
    if .name != "Sulfuras, Hand of Ragnaros" then
        .sell_in = .sell_in - 1
    else . end
    |
    if .sell_in < 0 then
        if .name != "Aged Brie" then
            if .name != "Backstage passes to a TAFKAL80ETC concert" then
                if .quality > 0 then
                    if .name != "Sulfuras, Hand of Ragnaros" then
                        .quality = .quality - 1
                    else . end
                else . end
            else
                .quality = .quality - .quality
            end
        else
            if .quality < 50 then
                .quality = .quality + 1
            else . end
        end
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