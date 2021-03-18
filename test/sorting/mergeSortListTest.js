import chai from "chai";
import mergeSortList from "../../src/sorting/mergeSortList.js";
import DoublyLinkedList from "../../src/dataStructures/linkedList/doublyLinkedList.js";

const cmpAscend = (a, b) => a - b;
const cmpDeasnd = (a, b) => b - a;

describe("mergeSortList(list, compare)", function() {
  let list;

  beforeEach(function() {
    list = new DoublyLinkedList();
  });

  it("should be able to sort in ascending order", function() {
    [9, 2, 7, 5, 1, 8, 6, 3, 4].forEach(v => list.push(v));
    chai.assert.deepEqual([...mergeSortList(list, cmpAscend)], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should be able to sort in descending order", function() {
    [9, 2, 7, 5, 1, 8, 6, 3, 4].forEach(v => list.push(v));
    chai.assert.deepEqual([...mergeSortList(list, cmpDeasnd)], [9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it("should be able to sort an empty array", function() {
    chai.assert.deepEqual([...mergeSortList(list, cmpAscend)], []);
  });

  it("should preserve stability", function() {
    const cmp = (a, b) => a.s - b.s;
    // sorted by l property, sorting by s
    [
      {l: "AJ", s: 3}, {l: "AX", s: 3}, {l: "ET", s: 1}, {l: "LL", s: 3},
      {l: "LX", s: 3}, {l: "NM", s: 2}, {l: "NM", s: 2}, {l: "NN", s: 2}
    ].forEach(o => list.push(o));
    const sorted = [
      {l: "ET", s: 1}, {l: "NM", s: 2}, {l: "NM", s: 2}, {l: "NN", s: 2},
      {l: "AJ", s: 3}, {l: "AX", s: 3},  {l: "LL", s: 3}, {l: "LX", s: 3},
    ];
    chai.assert.deepEqual([...mergeSortList(list, cmp)], sorted);
  });

  it("should preserve already sorted array", function() {
    [9, 2, 7, 5, 1, 8, 6, 3, 4].forEach(v => list.push(v));
    chai.assert.deepEqual([...mergeSortList(list, cmpAscend)], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should not mutate a list with only equal values", function() {
    [2, 2, 2, 2, 2].forEach(v => list.push(v));
    chai.assert.deepEqual([...mergeSortList(list, cmpAscend)], [2, 2, 2, 2, 2]);
  });

  it("should able to sort when there are duplicates", function() {
    [2, 4, 4, 7, 8, 8, 1, 3, 3].forEach(v => list.push(v));
    chai.assert.deepEqual([...mergeSortList(list, cmpAscend)], [1, 2, 3, 3, 4, 4, 7, 8, 8]);
  });
});
