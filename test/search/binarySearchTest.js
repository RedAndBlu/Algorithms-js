import chai from "chai";
import binarySearch from "../../src/search/binarySearch.js";

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;

describe("binarySearch(arr, val, cmp)", function() {
  it("should get the index of the given val when the array is sorted in ascending order", function() {
    const arr = Array.from({length: 100}, (_, i) => i);
    chai.assert.equal(arr[binarySearch(arr, 3, ascend)], 3);
  });

  it("should get the index of the given val when the array is sorted in descending order", function() {
    const arr = Array.from({length: 100}, (_, i) => 100 - i);
    chai.assert.equal(arr[binarySearch(arr, 77, descend)], 77);
  });

  it("should be able to get the index of the given val of a large array", function() {
    const arr = Array.from({length: 100000}, (_, i) => i);
    chai.assert.equal(arr[binarySearch(arr, 8, ascend)], 8);
  });

  it("should get -1 when the val doesn't exist in the arr", function() {
    const arr = Array.from({length: 100}, (_, i) => i);
    chai.assert.equal(binarySearch(arr, 111, ascend), -1);
  });
});
