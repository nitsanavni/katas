import { Data } from "./data.js";

export const logic =
    (data: Data) =>
    async ({ type, age, date }: any) => {
        const basePrice = await data.basePrice(type);

        if (isInfant(age)) {
            return { cost: infantPricing() };
        }

        if (type === "1jour") {
            const reductionFactor = holidayReductionFactor(
                await data.holidays(),
                date
            );

            // TODO apply reduction for others
            if (isChild(age)) {
                return { cost: childPricing(basePrice) };
            }

            if (isSenior(age)) {
                return {
                    cost: seniorPricing(basePrice, reductionFactor),
                };
            }

            return { cost: Math.ceil(basePrice.cost * reductionFactor) };
        } else if (type === "night") {
            if (age == undefined) {
                return { cost: infantPricing() };
            }

            if (isSenior(age)) {
                return { cost: Math.ceil(basePrice.cost * 0.4) };
            }

            return basePrice;
        }
    };

function holidayReductionFactor(
    holidays: {
        // TODO apply reduction for others
        holiday: Date;
    }[],
    date: any
) {
    return 1 - holidayReduction(holidays, date) / 100;
}

function childPricing(basePrice: any) {
    return Math.ceil(basePrice.cost * 0.7);
}

function isChild(age: any) {
    return (age as any) < 15;
}

function infantPricing() {
    return 0;
}

function isInfant(age: any) {
    return (age as any) < 6;
}

function seniorPricing(basePrice: any, reductionFactor: number) {
    return Math.ceil(basePrice.cost * 0.75 * reductionFactor);
}

function isSenior(age: any) {
    return (age as any) > 64;
}

function holidayReduction(holidays: { holiday: Date }[], date: any) {
    return isNonHolidayMonday(holidays, date) ? 35 : 0;
}

function isNonHolidayMonday(holidays: { holiday: Date }[], date: any) {
    return !isHoliday(holidays, date) && isMonday(date);
}

function isHoliday(holidays: { holiday: Date }[], date: string) {
    return holidays.some(({ holiday }) => sameDate(new Date(date), holiday));
}

function sameDate(d: Date, holiday: Date) {
    return (
        d.getFullYear() === holiday.getFullYear() &&
        d.getMonth() === holiday.getMonth() &&
        d.getDate() === holiday.getDate()
    );
}

function isMonday(date: any) {
    return new Date(date as string).getDay() === 1;
}
