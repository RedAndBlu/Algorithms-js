import chai from "chai";
import mergeSort from "../../src/sorting/mergeSort.js";

const cmpAcend = (a, b) => a - b;
const cmpDecend = (a, b) => b - a;

describe("mergeSort(arr, compare)", function() {
  it("should be able to sort in ascending order", function() {
    chai.assert.deepEqual(mergeSort([9, 2, 7, 5, 1, 8, 6, 3, 4], cmpAcend), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should be able to sort in descending order", function() {
    chai.assert.deepEqual(mergeSort([9, 2, 7, 5, 1, 8, 6, 3, 4], cmpDecend), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it("should be able to sort an empty array", function() {
    chai.assert.deepEqual(mergeSort([], cmpAcend), []);
  });

  it("should preserve stability", function() {
    const cmp = (a, b) => a.s - b.s;
    // sorted by l property, sorting by s
    const input = [
      {l: "AJ", s: 3}, {l: "AX", s: 3}, {l: "ET", s: 1}, {l: "LL", s: 3},
      {l: "LX", s: 3}, {l: "NM", s: 2}, {l: "NM", s: 2}, {l: "NN", s: 2}
    ];
    const sorted = [
      {l: "ET", s: 1}, {l: "NM", s: 2}, {l: "NM", s: 2}, {l: "NN", s: 2},
      {l: "AJ", s: 3}, {l: "AX", s: 3},  {l: "LL", s: 3}, {l: "LX", s: 3},
    ];
    chai.assert.deepEqual(mergeSort(input, cmp), sorted);
  });

  it("should preserve an alredy sorted array", function() {
    chai.assert.deepEqual(mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9], cmpAcend), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should not mutate an array only with equal values", function() {
    chai.assert.deepEqual(mergeSort([2, 2, 2, 2, 2], cmpAcend), [2, 2, 2, 2, 2]);
  });

  it("should able to sort duplicates", function() {
    chai.assert.deepEqual(mergeSort([2, 4, 4, 7, 8, 8, 1, 3, 3], cmpAcend), [1, 2, 3, 3, 4, 4, 7, 8, 8]);
  });
});
