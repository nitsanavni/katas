from parrot import Parrot, ParrotType

cocos = [0, 1, 2]
volts = [0, 1, 4]
nailed = [False, True]

print('\n'.join([f"{t} {c} {v} {n} {Parrot(t, c, v, n).speed()}"
      for t in ParrotType for c in cocos for v in volts for n in nailed]))
