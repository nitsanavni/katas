// import { inspect } from "bun";
import express from "express";
import mysql from "mysql2/promise";
import { data } from "./data.js";

import { logic } from "./logic.js";

async function createApp() {
    const app = express();

    let connectionOptions = {
        host: "localhost",
        user: "root",
        database: "lift_pass",
        password: "mysql",
    };
    const connection = await mysql.createConnection(connectionOptions);

    app.put("/prices", async (req, res) => {
        const liftPassCost = req.query.cost;
        const liftPassType = req.query.type;
        const [rows, fields] = await connection.query(
            "INSERT INTO `base_price` (type, cost) VALUES (?, ?) " +
                "ON DUPLICATE KEY UPDATE cost = ?",
            [liftPassType, liftPassCost, liftPassCost]
        );

        res.json();
    });
    app.get("/prices", async (req, res) => {
        res.json(await logic(data(connection))(req.query));
    });
    return { app, connection };
}

export { createApp };
