import { EOL } from "os";

export const table =
    <T>(headers: { key: keyof T; label: string }[]) =>
    (a: T[]): string => {
        const rows = [
            headers.map((h) => h.label),
            ...a.map((t) => headers.map((h) => t[h.key]).map(String)),
        ];

        const maxLengths = rows.reduce(
            (maxLengths, row) =>
                row.map((v, i) => Math.max(v.length, maxLengths[i] || 0)),
            [] as number[]
        );

        return rows
            .map((row) =>
                row.map((value, i) => value.padEnd(maxLengths[i])).join(" || ")
            )
            .join(EOL);
    };
