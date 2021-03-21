import chai from "chai";
import quickSort from "../../src/sorting/quickSort.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("quickSort(arr)", function() {
  it("should be able to sort array with duplicates", function() {
    chai.assert.deepEqual(quickSort([4, 1, 3, 4, 2, 7, 4, 9], ascend), [1, 2, 3, 4, 4, 4, 7, 9]);
  });

  it("should be able to sort large array in ascending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 1000));
    chai.assert.deepEqual(quickSort(vals, ascend), vals.slice().sort(ascend));
  });

  it("should be able to sort large array in descending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 1000));
    chai.assert.deepEqual(quickSort(vals, descend), vals.slice().sort(descend));
  });

  it("should preverse array containing only the same value", function() {
    const vals = Array.from({length: 10}, () => 10);
    chai.assert.deepEqual(quickSort(vals, ascend), vals.slice());
  });

  it("should preverse array already sorted", function() {
    const vals = Array.from({length: 10}, (_, i) => i);
    chai.assert.deepEqual(quickSort(vals, ascend), vals.slice());
  });

  it("should preverse large array already sorted", function() {
    const vals = Array.from({length: 10000}, (_, i) => i);
    chai.assert.deepEqual(quickSort(vals, ascend), vals.slice());
  });
});
