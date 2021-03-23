import chai from "chai";
import insertionSort from "../../src/sorting/insertionSort.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("insertionSort(arr, compare)", function() {
  it("should be able to sort arrays in ascending order", function() {
    chai.assert.deepEqual(
      insertionSort([6, 5, 3, 9, 7, 1, 2, 8, 4], ascend),
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    );
  });

  it("should be able to sort arrays in descending order", function() {
    chai.assert.deepEqual(
      insertionSort([6, 5, 3, 9, 7, 1, 2, 8, 4], descend),
      [9, 8, 7, 6, 5, 4, 3, 2, 1]
    );
  });

  it("should preverse array containing only duplicates", function() {
    const vals = Array.from({length: 10}, () => 10);
    chai.assert.deepEqual(insertionSort(vals, ascend), vals.slice());
  });

  it("should preverse array already sorted", function() {
    const vals = Array.from({length: 10}, (_, i) => i);
    chai.assert.deepEqual(insertionSort(vals, ascend), vals.slice());
  });

  it("should sort an abritary array", function() {
    const vals = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
    chai.assert.deepEqual(insertionSort(vals, ascend), vals.slice().sort(ascend));
  });
});
