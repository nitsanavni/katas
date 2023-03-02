import mysql from "mysql2/promise";

export type Data = ReturnType<typeof data>;

export const data = (connection: mysql.Connection) => ({
    basePrice: async (type: string) => {
        const q = await connection.query(
            "SELECT cost FROM `base_price` " + "WHERE `type` = ? ",
            [type]
        );

        // @ts-ignore
        return q[0][0];
    },
    holidays: async () =>
        (await connection.query("SELECT * FROM `holidays`"))[0] as {
            holiday: Date;
        }[],
});
