import test from "ava";

// Your task is to process a sequence of integer numbers to determine the following statistics:

// minimum value
// maximum value
// number of elements in the sequence
// average value
// For example: [6, 9, 15, -2, 92, 11]

// minimum value = -2
// maximum value = 92
// number of elements in the sequence = 6
// average value = 21.833333

type Sequence = number[];
type Stats = {
    minimumValue: number | undefined;
    maximumValue: number | undefined;
    numberOfElementsInTheSequence: number;
    averageValue: number | undefined;
};

const sum = ({ sequence }: { sequence: Sequence }) => {
    let ret = 0;

    for (const n of sequence) {
        ret += n;
    }

    return ret;
};

const average = ({ sequence }: { sequence: Sequence }) =>
    +(sum({ sequence }) / sequence.length).toFixed(6);

const emptySequenceStats = (): Stats =>
    ({
        minimumValue: undefined,
        maximumValue: undefined,
        numberOfElementsInTheSequence: 0,
        averageValue: undefined,
    } as const);

const caculateStatsFor = ({ sequence }: { sequence: Sequence }): Stats => {
    return sequence.length === 0
        ? emptySequenceStats()
        : {
              minimumValue: Math.min(...sequence),
              maximumValue: Math.max(...sequence),
              numberOfElementsInTheSequence: sequence.length,
              averageValue: average({ sequence }),
          };
};

test("empty sequence", (t) => {
    t.deepEqual(caculateStatsFor({ sequence: [] }), {
        minimumValue: undefined,
        maximumValue: undefined,
        numberOfElementsInTheSequence: 0,
        averageValue: undefined,
    });
});

test("example", (t) => {
    t.deepEqual(caculateStatsFor({ sequence: [6, 9, 15, -2, 92, 11] }), {
        minimumValue: -2,
        maximumValue: 92,
        numberOfElementsInTheSequence: 6,
        averageValue: 21.833333,
    });
});
