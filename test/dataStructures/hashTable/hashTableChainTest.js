import chai from "chai";
import HashTable from "../../../src/dataStructures/hashTable/hashTableChain.js";

const rdmNub = () => Math.floor(Math.random() * 1000);

describe("hashTableChain", function() {
  let table;

  beforeEach(function() {
    table = new HashTable();
  });

  describe("iteretor", function() {
    it("should be iterabable", function() {
      chai.assert.deepEqual([...table], []);
    });

    it("should be iterabable", function() {
      table.add("fine", {spot: 88}).add("wrong", {spot: 77});
      const itr = [...table];
      chai.assert.deepInclude(itr, ["fine", {spot: 88}]);
      chai.assert.deepInclude(itr, ["wrong", {spot: 77}]);
    });
  });

  describe("method size", function() {
    it("should get zero when it is empty", function() {
      chai.assert.equal(table.size, 0);
    });

    it("should get the count of elements", function() {
      table.add(0, 0).add(1, 1).add(2, 2).add(3, 3);
      chai.assert.equal(table.size, 4);
    });
  });

  describe("method exist(key)", function() {
    it("should get false when the key doesn't exist", function() {
      table.add("fox", "red").add("cat", "white");
      chai.assert.isFalse(table.exist("wolf"));
    });

    it("should get true when the key exist", function() {
      table.add("eagle", "brown").add("wolf", "gray");
      chai.assert.isTrue(table.exist("wolf"));
    });
  });

  describe("method add(key, value)", function() {
    it("should be able to add if the key is a string", function() {
      table.add("doors", 110);
      chai.assert.equal(table.get("doors"), 110);
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add if the key is an empty string", function() {
      table.add("", 0);
      chai.assert.equal(table.get(""), 0);
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add if the key is a number", function() {
      table.add(101, "birds");
      chai.assert.equal(table.get(101), "birds");
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add if the key is a negative number", function() {
      table.add(-7, "negative");
      chai.assert.equal(table.get(-7), "negative");
      chai.assert.equal(table.size, 1);
    });

    it("should throws an error if the key is not a string or a number", function() {
      chai.assert.throws(() => table.add({}), "error the argument key needs to be a string or a number");
    });

    it("should overwrite the value added with the same key", function() {
      table.add("first time", true).add("first time", false);
      chai.assert.equal(table.get("first time"), false);
      chai.assert.equal(table.size, 1);
    });

    it("should be able to add multiple arbitrary elements without limits", function() {
      const vals = Array.from({length: 200}, () => rdmNub());
      vals.forEach(v => (table.add(v, v)));
      vals.forEach(v => chai.assert.equal(table.get(v), v));
    });

    it("should be able to add in any order", function() {
      table.add("isCar", false).remove("isCar");
      table.add("isCar", true).add("old", false).remove("old");
      table.add("face", true).add("book", false);
      chai.assert.equal(table.get("isCar"), true);
      chai.assert.equal(table.get("face"), true);
      chai.assert.equal(table.get("book"), false);
    });
  });

  describe("method get(key)", function() {
    it("should get undefined when the key doesn't exist", function() {
      table.add("t-rex", 11);
      chai.assert.isUndefined(table.get("eggs"));
    });

    it("should get the value associatedeith the key", function() {
      table.add("t-rex", 11);
      chai.assert.isUndefined(table.get("eggs"));
    });

    it("should be able to get in any order", function() {
      table.add("js_ts", 12).add("line", 1);
      table.remove("js_ts");
      chai.assert.equal(table.get("line"), 1);
      table.add("tech", 100).add("step", 2).remove("tech");
      chai.assert.equal(table.get("step"), 2);
    });
  });

  describe("method remove(key)", function() {
    it("should not mutate the table if the key doesn't exist", function() {
      table.add("don't remove me", 1);
      chai.assert.isFalse(table.remove("x-x"));
      chai.assert.equal(table.size, 1);
      chai.assert.equal(table.get("don't remove me"), 1);
    });

    it("should delete and get true if the key exist", function() {
      table.add("remove me", 7);
      chai.assert.isTrue(table.remove("remove me"));
      chai.assert.equal(table.size, 0);
      chai.assert.isUndefined(table.get("remove me"));
    });

    it("should be able to delete in every order", function() {
      table.add("me", 1).add("you", 2).add("it", 3);
      chai.assert.isTrue(table.remove("me"));
      chai.assert.equal(table.size, 2);
      table.add("next", 4);
      chai.assert.isTrue(table.remove("you"));
      chai.assert.equal(table.size, 2);
    });

    it("should be able to delete every elements", function() {
      const vals = Array.from({length: 300}, () => rdmNub());
      vals.forEach((v, i) => table.add(v, i));
      vals.forEach((v) => table.remove(v));
      vals.forEach((v) => chai.assert.isUndefined(table.get(v)));
      chai.assert.equal(table.size, 0);
    });
  });
});
