import chai from "chai";
import quickSelect from "../../src/sorting/quickSelect.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("quickSelect(arr, idx, compare)", function() {
  it("should get the nth value at the given index when sorted in ascending order", function() {
    chai.assert.equal(quickSelect([5, 3, 2, 9, 8, 1, 7, 6, 4], 5, ascend), 6);
  });

  it("should get the nth value at the given index when sorted in descending order", function() {
    chai.assert.equal(quickSelect([5, 3, 2, 9, 8, 1, 7, 6, 4], 2, descend), 7);
  });

  it("should get undefined when the idx is less than 0", function() {
    chai.assert.isUndefined(quickSelect([5, 3, 2, 9, 8, 1, 7, 6, 4], -1, ascend));
  });

  it("should get undefined when the idx larger than the given arr size", function() {
    chai.assert.isUndefined(quickSelect([5, 3, 2, 9, 8, 1, 7, 6, 4], 10, ascend));
  });

  it("should get undefined when the idx equal to teh given arr size", function() {
    chai.assert.isUndefined(quickSelect([5, 3, 2, 9, 8, 1, 7, 6, 4], 9, ascend));
  });

  it("should get the nth value at the given index when arr is full of duplicates", function() {
    const vals = Array.from({length: 100}, () => 10);
    chai.assert.equal(quickSelect(vals, 9, ascend), 10);
  });

  it("should get the nth value at the given index of a large array", function() {
    const vals = Array.from({length: 10000}, () => Math.floor(Math.random() * 10000000));
    chai.assert.equal(quickSelect(vals, 99, ascend), vals.slice().sort(ascend)[99]);
  });
});
