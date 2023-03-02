import { logic as makeLogic } from "./logic.js";
import { data } from "./data-stub.js";

const logic = makeLogic(data);

const promises = [];

for (const type of ["1jour", "night"]) {
    for (const age of [undefined, 5, 6, 7, 15, 16, 64, 65]) {
        for (const date of [
            undefined,
            "2019-02-18",
            "2019-02-25",
            "2019-03-04",
            "2019-03-01",
            "2023-02-27",
            "2019-09-02",
            "2019-09-03",
            "2019-02-11",
            "2019-02-12",
            "2018-02-18",
            "2013-02-18",
            "2019-03-18",
        ]) {
            promises.push(logic({ type, age, date }));
        }
    }
}

(await Promise.all(promises)).forEach((x) => console.log(JSON.stringify(x)));
