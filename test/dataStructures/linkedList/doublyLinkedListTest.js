import chai from "chai";
import DoublyLinkedList from "../../../src/dataStructures/linkedList/doublyLinkedList.js";

describe("doublyLinkedList", function () {
  let list;

  beforeEach(function () {
    list = new DoublyLinkedList().push(1).push(2).push(3).push(4);
  });

  describe("property size", function () {
    it("shound be 0 when the list is empty", function() {
      chai.assert.equal(new DoublyLinkedList().size, 0);
    });

    it("should count the amount of elements after mutation", function () {
      chai.assert.equal(4, list.size);
    });
  });

  describe("method push(value)", function() {
    it("should add at the end of the list", function () {
      chai.assert.equal(list.push(5).pop(), 5);
    });

    it ("should be used in any order", function () {
      list.push(99).unshift(22).push(23).unshift(5);
      chai.assert.equal(list.pop(), 23);
      chai.assert.equal(list.pop(), 99);
    });
  });

  describe("method unshift(value)", function() {
    it("should add at the start of the list", function () {
      chai.assert.equal(list.unshift(5).shift(), 5);
    });

    it ("should be used in any order", function () {
      list.unshift(5).push(9).unshift(11).push(44);
      chai.assert.equal(list.shift(), 11);
      chai.assert.equal(list.shift(), 5);
    });
  });

  describe("method pop()", function() {
    it("should get and remove the last element", function () {
      chai.assert.equal(list.pop(), 4);
      chai.assert.equal(list.size, 3);
    });

    it("should get undefined when the list is empty", function () {
      chai.assert.isUndefined(new DoublyLinkedList().pop());
    });
  });

  describe("method shift()", function() {
    it("should get and remove the first element", function () {
      chai.assert.equal(list.shift(), 1);
      chai.assert.equal(list.size, 3);
    });

    it("should get undefined when the list is empty", function () {
      chai.assert.isUndefined(new DoublyLinkedList().shift());
    });
  });

  describe("method front()", function() {
    it("should get undefined when the list is empty", function () {
      chai.assert.isUndefined(new DoublyLinkedList().front());
    });

    it("should get the first element", function () {
      chai.assert.equal(list.front(), 1);
    });

    it ("should get the first element after mutation", function () {
      list.unshift(-2).push(9).unshift(-4);
      chai.assert.equal(list.front(), -4);
    });
  });

  describe("method back()", function() {
    it("should get undefined when the list is empty", function () {
      chai.assert.isUndefined(new DoublyLinkedList().back());
    });

    it("should get the last element", function () {
      chai.assert.equal(list.back(), 4);
    });

    it ("should get the last element after mutation", function () {
      list.push(8).push(91).unshift(0);
      chai.assert.equal(list.back(), 91);
    });
  });

  describe("method valuaAt(index)", function() {
    it("should get undefined when the list is empty", function () {
      chai.assert.isUndefined(new DoublyLinkedList().valueAt(3));
    });

    it("should get undefined when the index is langer than size", function () {
      chai.assert.isUndefined(list.valueAt(5));
    });

    it("should get undefined when the index is less than 0", function () {
      chai.assert.isUndefined(list.valueAt(-1));
    });

    it("should get the element at the given index", function () {
      chai.assert.equal(list.valueAt(2), 3);
    });

    it ("should get the element at index after mutation", function () {
      list.push(33).unshift(21).unshift(110);
      chai.assert.equal(list.valueAt(2), 1);
    });
  });

  describe("method insert(index, value)", function() {
    it("should add at the start of the list when index is less than 0", function() {
      chai.assert.equal(list.insert(-1, -10).shift(), -10);
    });

    it("should add at the start of the list when index is 0", function() {
      chai.assert.equal(list.insert(0, 7).shift(), 7);
    });

    it("should add at the end of the list when index is larger than size", function() {
      chai.assert.equal(list.insert(7, 8).pop(), 8);
    });

    it("should add at the end of the list when index is equal to size", function() {
      chai.assert.equal(list.insert(list.size, 92).pop(), 92);
    });

    it("should add at the given index", function() {
      chai.assert.equal(list.insert(1, 9).valueAt(1), 9);
    });
  });

  describe("method delete(value)", function() {
    it("should delete the given value when exist", function() {
      list.delete(2);
      chai.assert.equal(list.size, 3);
      chai.assert.notInclude([...list], 2);
    });

    it("should not mutate the list when the value doesn't exist", function() {
      list.delete(5);
      chai.assert.equal(list.size, 4);
      chai.assert.deepEqual([...list], [1, 2, 3, 4]);
    });

    it("should be able to delete the first element", function() {
      list.delete(1);
      chai.assert.equal(list.size, 3);
      chai.assert.deepEqual([...list], [2, 3, 4]);
    });

    it("should be able to delete the last element", function() {
      list.delete(4);
      chai.assert.equal(list.size, 3);
      chai.assert.deepEqual([...list], [1, 2, 3]);
    });
  });

  describe("method deleteAt(index)", function() {
    it("should delete the value at index when exist", function() {
      list.deleteAt(1);
      chai.assert.equal(list.size, 3);
      chai.assert.notInclude([...list], 2);
    });

    it("should not mutate the list when the index larger than size", function() {
      list.deleteAt(5);
      chai.assert.equal(list.size, 4);
      chai.assert.deepEqual([...list], [1, 2, 3, 4]);
    });

    it("should not mutate the list when the index less than 0", function() {
      list.deleteAt(-1);
      chai.assert.equal(list.size, 4);
      chai.assert.deepEqual([...list], [1, 2, 3, 4]);
    });

    it("should be able to delete the first element", function() {
      list.deleteAt(0);
      chai.assert.equal(list.size, 3);
      chai.assert.deepEqual([...list], [2, 3, 4]);
    });

    it("should be able to delete the last element", function() {
      list.deleteAt(3);
      chai.assert.equal(list.size, 3);
      chai.assert.deepEqual([...list], [1, 2, 3]);
    });
  });

  describe("method reverse()", function() {
    it("should not mutate when the list is empty", function() {
      const newList = new DoublyLinkedList();
      newList.reverse();
      chai.assert.equal(newList.size, 0);
      chai.assert.deepEqual([...newList], []);
    });

    it("should not mutate when the list is one element long", function() {
      const newList = new DoublyLinkedList().push(81);
      newList.reverse();
      chai.assert.equal(newList.size, 1);
      chai.assert.deepEqual([...newList], [81]);
    });

    it("should be reversed when the list is larger than one element", function() {
      chai.assert.equal(list.reverse().size, 4);
      chai.assert.deepEqual([...list], [4, 3, 2, 1]);
    });
  });
});
