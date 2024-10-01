@./gilded_rose.py


x = backstage


just do the next unchecked step, do it exactly, don't jump ahead, for every step all other code stays the exact same:

- [x] in the loop, surround update_item call with if name is $x, both branches call update_item
- [x] new function update_$x, *exact same* as update_item, used in the right branch
- [x] in update_$x and update_item:
      get rid of all conditions on name, keeping only true branches
      everything else stay the same
