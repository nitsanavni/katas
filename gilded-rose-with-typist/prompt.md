@./gilded_rose.py

just do the following. it's a small behavior preserving transformation. the intention is to only change structure, not changing ops/calcs - these should remain exact same. all other code stays the exact same:

let x = sulfuras

- [x] in the loop, surround update_item call with if name is $x, both branches call update_item; don't nest, use elif
- [x] new function update_$x, *exact same* as update_item, a perfect copy, used in the correct branch
- [x] in update_$x: s/item.name/${x}/g
- [x] in update_$x: s/x!=x/False/g, s/x==x/True/g, s/x!=!x/True/g, s/x==!x/False/g
      after this step, update_$x should not have a any names
- [x] in update_item: s/name!=${x}/True/g, s/name==${x}/False/g
- [ ] simplify if True / False, keeping only valid branches
