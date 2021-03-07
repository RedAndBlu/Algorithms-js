import chai from "chai";
import HashTable from "../../../src/dataStructures/hashTable/hashTable.js";

const rdmNub = () => Math.floor(Math.random() * 1000);

describe("HashTable", function() {
  let table;

  beforeEach(function() {
    table = new HashTable();
  });

  describe("static method hash(key, size)", function() {
    it("should throw an error if size is 0", function() {
      chai.assert.throws(
        () => HashTable.hash("", 0),
        "error the argument size needs to be greater than 0"
      );
    });

    it("should throw an error if size is less than 0", function() {
      chai.assert.throws(
        () => HashTable.hash("", -1),
        "error the argument size needs to be greater than 0"
      );
    });

    it("should throw an error if key is null", function() {
      chai.assert.throws(
        () => HashTable.hash(null, 10),
        "error the argument key needs to be a string or a number"
      );
    });

    it("should throw an error if key is undefined", function() {
      chai.assert.throws(
        () => HashTable.hash(undefined, 10),
        "error the argument key needs to be a string or a number"
      );
    });

    it("should throw an error if key is object", function() {
      chai.assert.throws(
        () => HashTable.hash({ name: "Ash", type: "t" }, 10),
        "error the argument key needs to be a string or a number"
      );
    });

    it("should get a valid number when the key is a empty string", function() {
      const h = HashTable.hash("", 5);
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 5);
    });

    it("should get a valid number when the key is a negative number", function() {
      const h = HashTable.hash(-313, 10);
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 10);
    });

    ["fire", "day", "all-right", "veryLongStringHere"].forEach((str) => {
      it(`should get a valid number when the key is an arbitrary string like: ${str}`, function() {
        const h = HashTable.hash(str, 21);
        chai.assert.isAtLeast(h, 0);
        chai.assert.isBelow(h, 21);
      });
    });

    Array.from({length: 5}, () => rdmNub()).forEach((v) => {
      it(`should get a valid number when the key is an arbitrary number like: ${v}`, function() {
        const h = HashTable.hash(v, 14);
        chai.assert.isAtLeast(h, 0);
        chai.assert.isBelow(h, 14);
      });
    });
  });

  describe("method _probeHash(key, size)", function() {
    it("should get a valid number when the key is a number", function() {
      const h = table._probeHash(17, 10)();
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 10);
    });

    it("should get a valid number when the key is a number and it is called multiple times", function() {
      const hash = table._probeHash(17, 10);
      hash();
      hash();
      const h = hash();
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 10);
    });

    it("should get a valid number when the key is a string", function() {
      chai.assert.equal(table._probeHash("fire", 10)(), 2);
      const h = table._probeHash("fire", 11)();
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 11);
    });

    it("should get a valid number when the key is a string and it is called multiple times", function() {
      const hash = table._probeHash("dlokala", 13);
      hash();
      hash();
      const h = hash();
      chai.assert.isAtLeast(h, 0);
      chai.assert.isBelow(h, 13);
    });
  });

  describe("HashTable iteretor", function() {
    it("should be iterabable", function() {
      chai.assert.deepEqual([...table], []);
    });

    it("should be able to iterate every element", function() {
      table.add("the", "the").add("real", "real").add("foo", "foo");
      const elms = [...table];
      chai.assert.deepInclude(elms, ["the", "the"]);
      chai.assert.deepInclude(elms, ["real", "real"]);
      chai.assert.deepInclude(elms, ["foo", "foo"]);
    });
  });

  describe("method exist(key)", function() {
    it("should get true when the key exist", function() {
      table.add("check", 111);
      chai.assert.isTrue(table.exist("check"));
    });

    it("should get false when the key doesn't exist", function() {
      chai.assert.isFalse(table.exist("check"));
    });
  });

  describe("method add(key, value)", function() {
    it("should be add the given value if the key is valid string", function() {
      const days = ["monday", "friday"];
      table.add("days", days);
      chai.assert.equal(table.get("days"), days);
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add multiple elements", function() {
      const listA = ["a", "10"], listB = ["b", "11"], listC = ["c", "11"];
      table.add("A", listA).add("B", listB).add("C", listC);
      chai.assert.equal(table.get("A"), listA);
      chai.assert.equal(table.get("B"), listB);
      chai.assert.equal(table.get("C"), listC);
      chai.assert.equal(table.size, 3);
    });

    it("should be able to add in any order", function() {
      const listA = ["a", "10"], listB = ["b", "11"], listC = ["c", "11"];
      table.add("A", listA).remove("A");
      table.add("B", listB).add("C", listC).remove("C");
      chai.assert.isUndefined(table.get("A"));
      chai.assert.equal(table.get("B"), listB);
      chai.assert.isUndefined(table.get("C"));
      chai.assert.equal(table.size, 1);
    });

    it("should override the value added with the same key", function() {
      table.add("ALL", 11).add("ALL", 22);
      chai.assert.equal(table.get("ALL"), 22);
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add multiple elements without any capacity limit", function() {
      for (let i = 65; i < 120; i++) table.add(String.fromCodePoint(i), i);
      for (let i = 65; i < 120; i++)
        chai.assert.equal(table.get(String.fromCodePoint(i)), i);
      chai.assert.equal(table.size, 120 - 65);
    });

    it("should be able to add multiple arbitrary value", function() {
      const vals = Array.from({length: 200}, () => rdmNub());
      vals.forEach(v => table.add(v, v));
      vals.forEach(v => chai.assert.equal(table.get(v), v));
    });
  });

  describe("method get(key)", function() {
    it("should get undefined when the key doesn't exist", function() {
      chai.assert.isUndefined(table.get("key"));
    });

    it("should get the value associated to the key", function() {
      table.add("val", 110).add("x", 32).add("z", 1);
      chai.assert.equal(table.get("z"), 1);
    });

    it("should be able to get in any order", function() {
      table.add("Ax", 10);
      chai.assert.equal(table.get("Ax"), 10);
      table.remove("Ax");
      table.add("B", 11).add("C", 12).remove("B");
      chai.assert.equal(table.get("C"), 12);
    });
  });

  describe("method remove(key)", function() {
    it("should not mutate the table when the key doesn't exist", function() {
      table.add("notRemoveMe", 11.11);
      chai.assert.isFalse(table.remove("keys"));
      chai.assert.isTrue(table.exist("notRemoveMe"));
    });

    it("should get and remove value associated to the key", function() {
      table.add("removeMe", 11.11);
      chai.assert.isTrue(table.remove("removeMe"));
      chai.assert.isFalse(table.exist("removeMe"));
    });

    it("should be able to delete multiple elements", function() {
      table.add("removeMe", 1).add("jump", 2).add("last", 3);
      chai.assert.isTrue(table.remove("removeMe"));
      chai.assert.isTrue(table.remove("jump"));
      chai.assert.isTrue(table.remove("last"));
      chai.assert.isFalse(table.exist("removeMe"));
      chai.assert.isFalse(table.exist("jump"));
      chai.assert.isFalse(table.exist("last"));
      chai.assert.equal(table.size, 0);
    });

    it("should be able to delete all elements", function() {
      const vals = Array.from({length: 200}, () => rdmNub());
      vals.forEach(v => table.add(v, v));
      vals.forEach(v => table.remove(v));
      vals.forEach(v => chai.assert.isUndefined(table.get(v)));
      chai.assert.equal(table.size, 0);
    });
  });
});
