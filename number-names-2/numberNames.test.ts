import { expect, test } from "bun:test";
import { numberName } from "./numberNames";

test("1 should be 'one'", () => {
  expect(numberName(1)).toBe('one');
});

test("2 should be 'two'", () => {
  expect(numberName(2)).toBe('two');
});

test("3 should be 'three'", () => {
  expect(numberName(3)).toBe('three');
});

test("4 should be 'four'", () => {
  expect(numberName(4)).toBe('four');
});

test("5 should be 'five'", () => {
  expect(numberName(5)).toBe('five');
});

test("6 should be 'six'", () => {
  expect(numberName(6)).toBe('six');
});

test("7 should be 'seven'", () => {
  expect(numberName(7)).toBe('seven');
});

test("8 should be 'eight'", () => {
  expect(numberName(8)).toBe('eight');
});

test("9 should be 'nine'", () => {
  expect(numberName(9)).toBe('nine');
});

test("10 should be 'ten'", () => {
  expect(numberName(10)).toBe('ten');
});
