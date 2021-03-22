import chai from "chai";
import sort3Way from "../../src/sorting/quickSort3Way.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("quickSort3Way(arr, compare)", function() {
  it("should be able to sort array in ascending order", function() {
    chai.assert.deepEqual(sort3Way([8, 3, 2, 1, 6, 5, 4, 7, 9], ascend), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should be able to sort array in descending order", function() {
    chai.assert.deepEqual(sort3Way([8, 3, 2, 1, 6, 5, 4, 7, 9], descend), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it("should be able to sort large array in ascending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 100000));
    chai.assert.deepEqual(sort3Way(vals, ascend), vals.slice().sort(ascend));
  });

  it("should be able to sort large array in descending order", function() {
    const vals = Array.from({length: 10000}, () => Math.trunc(Math.random() * 100000));
    chai.assert.deepEqual(sort3Way(vals, descend), vals.slice().sort(descend));
  });

  it("should preserve large array containing only duplicates", function() {
    const vals = Array.from({length: 100000}, () => 10);
    chai.assert.deepEqual(sort3Way(vals, ascend), vals.slice());
  });

  it("should preserve large array already sorted", function() {
    const vals = Array.from({length: 10000}, (_, i) => i);
    chai.assert.deepEqual(sort3Way(vals, ascend), vals.slice());
  });
});
