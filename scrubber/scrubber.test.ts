import { test, expect } from "bun:test";

import scrubber from "./scrubber";

test("nothing to scrub", () => {
    expect(scrubber(/world/)("hello")).toBe("hello");
});

test("scrub 1", () => {
    expect(scrubber(/world/)("hello world!")).toBe("hello <0>!");
});

test("scrub two of the same", () => {
    expect(scrubber(/boy/)("boy oh boy!")).toBe("<0> oh <0>!");
});

test("scrub different matches", () => {
    expect(scrubber(/boy/i)("Boy oh boy!")).toBe("<0> oh <1>!");
    expect(scrubber(/[ab]/)("a,b")).toBe("<0>,<1>");
});

test("a regex to define what constitutes dups");
test("provide an example for a match to auto-select the scrubber");
test("allow registering scrubbers");
test("allow control over replace string");
test("delete line iso replace with string");
test("allow to disable dups tracking");
test("lower level api - provide a line-scrubber / full text scrubber");
