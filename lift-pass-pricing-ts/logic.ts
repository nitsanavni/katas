import mysql from "mysql2/promise";

export const logic =
    (connection: mysql.Connection) =>
    async ({ type, age, date }: any) => {
        const q = await connection.query(
            "SELECT cost FROM `base_price` " + "WHERE `type` = ? ",
            [type]
        );

        // console.log(inspect(q));
        // @ts-ignore
        const result = q[0][0];

        if ((age as any) < 6) {
            return { cost: 0 };
        } else {
            if (type !== "night") {
                const holidays = (
                    await connection.query("SELECT * FROM `holidays`")
                )[0] as mysql.RowDataPacket[];

                let isHoliday;
                let reduction = 0;
                for (let row of holidays) {
                    let holiday = row.holiday;
                    if (date) {
                        let d = new Date(date as string);
                        if (
                            d.getFullYear() === holiday.getFullYear() &&
                            d.getMonth() === holiday.getMonth() &&
                            d.getDate() === holiday.getDate()
                        ) {
                            isHoliday = true;
                        }
                    }
                }

                if (!isHoliday && new Date(date as string).getDay() === 1) {
                    reduction = 35;
                }

                // TODO apply reduction for others
                if ((age as any) < 15) {
                    return { cost: Math.ceil(result.cost * 0.7) };
                } else {
                    if (age === undefined) {
                        let cost = result.cost * (1 - reduction / 100);
                        return { cost: Math.ceil(cost) };
                    } else {
                        if ((age as any) > 64) {
                            let cost =
                                result.cost * 0.75 * (1 - reduction / 100);
                            return { cost: Math.ceil(cost) };
                        } else {
                            let cost = result.cost * (1 - reduction / 100);
                            return { cost: Math.ceil(cost) };
                        }
                    }
                }
            } else {
                if ((age as any) >= 6) {
                    if ((age as any) > 64) {
                        return { cost: Math.ceil(result.cost * 0.4) };
                    } else {
                        return result;
                    }
                } else {
                    return { cost: 0 };
                }
            }
        }
    };
