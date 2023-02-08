from enum import Enum


class ParrotType(Enum):
    EUROPEAN = 1
    AFRICAN = 2
    NORWEGIAN_BLUE = 3


class Parrot:

    def __init__(self, type_of_parrot, number_of_coconuts, voltage, nailed):
        self._parrot = [EuropeanParrot, AfricanParrot, NorwegianBlueParrot][type_of_parrot.value - 1](
            type_of_parrot=type_of_parrot, number_of_coconuts=number_of_coconuts, voltage=voltage, nailed=nailed)

    def speed(self):
        return self._parrot.speed()

    def _base_speed(self):
        return 12.0


class EuropeanParrot(Parrot):

    def __init__(self, **k):
        pass

    def speed(self):
        return self._base_speed()


class AfricanParrot(Parrot):

    def __init__(self, *, number_of_coconuts, **k):
        self._number_of_coconuts = number_of_coconuts

    def speed(self):
        return max(0, self._base_speed() - self._load_factor() * self._number_of_coconuts)

    def _load_factor(self):
        return 9.0


class NorwegianBlueParrot(Parrot):

    def __init__(self, *, voltage, nailed, **k):
        self._voltage = voltage
        self._nailed = nailed

    def speed(self):
        if self._nailed:
            return 0
        else:
            return self._compute_base_speed_for_voltage()

    def _compute_base_speed_for_voltage(self):
        return min(24.0, self._voltage * self._base_speed())
