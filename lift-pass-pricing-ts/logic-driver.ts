import mysql from "mysql2/promise";

import { logic as makeLogic } from "./logic.js";

let connectionOptions = {
    host: "localhost",
    user: "root",
    database: "lift_pass",
    password: "mysql",
};
const connection = await mysql.createConnection(connectionOptions);

const logic = makeLogic(connection);

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
        ]) {
            console.log(JSON.stringify(await logic({ type, age, date })));
        }
    }
}

connection.end();
