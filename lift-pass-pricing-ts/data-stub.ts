import mysql from "mysql2/promise";
import sinon from "sinon";

import { data as makeData } from "./data.js";

export const data = makeData(null as unknown as mysql.Connection);

sinon.replace(data, "basePrice", async (type) => ({
    cost: type == "night" ? 19 : 35,
}));
sinon.replace(
    data,
    "holidays",
    async () =>
        [
            {
                holiday: new Date("2019-02-18"),
                description: "winter",
            },
            {
                holiday: new Date("2019-02-25"),
                description: "winter",
            },
            {
                holiday: new Date("2019-03-04"),
                description: "winter",
            },
        ] as any
);
