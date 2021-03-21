import chai from "chai";
import shellSort from "../../src/sorting/shellSort.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("shellSort(arr, compare)", function() {
  it("should preserve empty array", function() {
    chai.assert.deepEqual(shellSort([], ascend), []);
  });

  it("should be able to sort large array in ascending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 1000));
    chai.assert.deepEqual(shellSort(vals, ascend), vals.slice().sort(ascend));
  });

  it("should be able to sort large array in descending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 1000));
    chai.assert.deepEqual(shellSort(vals, descend), vals.slice().sort(descend));
  });

  it("should preverse array containing only the same value", function() {
    const vals = Array.from({length: 10}, () => 10);
    chai.assert.deepEqual(shellSort(vals, ascend), vals.slice());
  });

  it("should preverse array already sorted", function() {
    const vals = Array.from({length: 10}, (_, i) => i);
    chai.assert.deepEqual(shellSort(vals, ascend), vals.slice());
  });

  it("should preverse large array already sorted", function() {
    const vals = Array.from({length: 10000}, (_, i) => i);
    chai.assert.deepEqual(shellSort(vals, ascend), vals.slice());
  });
});
