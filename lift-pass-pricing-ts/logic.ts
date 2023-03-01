import { Data } from "./data.js";

export const logic =
    (data: Data) =>
    async ({ type, age, date }: any) => {
        const basePrice = await data.basePrice(type);

        if (isInfant(age)) {
            return { cost: infantPricing() };
        } else {
            if (type !== "night") {
                const holidays = await data.holidays();

                const reduction = holidayReduction(holidays, date);

                // TODO apply reduction for others
                if ((age as any) < 15) {
                    return { cost: Math.ceil(basePrice.cost * 0.7) };
                } else {
                    if (isSenior(age)) {
                        return {
                            cost: seniorPricing(basePrice, reduction),
                        };
                    } else {
                        let cost = basePrice.cost * (1 - reduction / 100);
                        return { cost: Math.ceil(cost) };
                    }
                }
            } else {
                if ((age as any) >= 6) {
                    if ((age as any) > 64) {
                        return { cost: Math.ceil(basePrice.cost * 0.4) };
                    } else {
                        return basePrice;
                    }
                } else {
                    return { cost: 0 };
                }
            }
        }
    };

function infantPricing() {
    return 0;
}

function isInfant(age: any) {
    return (age as any) < 6;
}

function seniorPricing(basePrice: any, reduction: number) {
    return Math.ceil(basePrice.cost * 0.75 * (1 - reduction / 100));
}

function isSenior(age: any) {
    return (age as any) > 64;
}

function holidayReduction(holidays, date: any) {
    let reduction = 0;

    if (!isHoliday(holidays, date) && isMonday(date)) {
        reduction = 35;
    }
    return reduction;
}

function isHoliday(holidays, date: any) {
    return holidays.some(({ holiday }) =>
        sameDate(new Date(date as string), holiday)
    );
}

function sameDate(d: Date, holiday: any) {
    return (
        d.getFullYear() === holiday.getFullYear() &&
        d.getMonth() === holiday.getMonth() &&
        d.getDate() === holiday.getDate()
    );
}

function isMonday(date: any) {
    return new Date(date as string).getDay() === 1;
}
