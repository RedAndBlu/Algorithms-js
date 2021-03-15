import chai from "chai";
import Bst from "../../../src/dataStructures/binarySearchTree/binarySearchTree.js";

// compare string in lexicographic order
const compString = (str1, str2) => {
  str1 = str1.toLowerCase(); str2 = str2.toLowerCase();
  const len = Math.min(str1.length, str2.length);

  for (let i = 0; i < len; i++) {
    const cmp = str1.codePointAt(i) - str2.codePointAt(i);
    if (cmp !== 0) return cmp;
  }

  return str1.length - str2.length;
};

// generate a random word
const rdmWord = () => {
  const rdmChar = () => String.fromCodePoint(65 + Math.floor(Math.random() * 58));
  const size = Math.floor(Math.random() * 25);
  let word = "";

  for (let i = 0; i < size; i++) word += rdmChar();

  return word;
};


describe("BinarySearchTree", function() {
  let tree;

  beforeEach(function() {
    tree = new Bst(compString);
  });

  describe("iterator", function() {
    it("should be iteratable", function() {
      chai.assert.deepEqual([...tree], []);
    });

    it("should iterate in ascending order", function() {
      tree.put("zoom", 1122).put("axe", 3).put("ex", 212).put("fax", 77)
        .put("zoo", 22).put("exp", 33).put("fall", 121).put("excuse", 9);
      chai.assert.deepEqual(
        [...tree],
        [["axe", 3], ["ex", 212], ["excuse", 9], ["exp", 33], ["fall", 121], ["fax", 77], ["zoo", 22], ["zoom", 1122]]
      );
    });
  });

  describe("property size", function() {
    it("should get zero when it is empty", function() {
      chai.assert.equal(tree.size, 0);
    });

    it("should get the amount of node in the tree", function() {
      tree.put("a", 1).put("b", 2).put("c", 3).put("d", 4);
      chai.assert.equal(tree.size, 4);
    });
  });

  describe("method get(key)", function() {
    it("should get undefined when the key doesn't exist", function() {
      chai.assert.isUndefined(tree.get("empty"));
    });

    it("should get the value associated with the key", function() {
      tree.put("x", 1).put("o", 2);
      chai.assert.equal(tree.get("x"), 1);
    });

    it("should be able to be used in any order", function() {
      tree.put("the", 10).put("music", 20).delete("music").put("car", 100).delete("car");
      chai.assert.equal(tree.get("the"), 10);
    });
  });

  describe("method exist(key)", function() {
    it("should get false when the key doesn't exist", function() {
      chai.assert.isFalse(tree.exist("no"));
    });

    it("should get true when the key exists", function() {
      tree.put("brick", 10);
      chai.assert.isTrue(tree.exist("brick"));
    });
  });

  describe("method put(key, value)", function() {
    it("should be able to add an element", function() {
      tree.put("leaf", 111);
      chai.assert.equal(tree.get("leaf"), 111);
      chai.assert.equal(tree.size, 1);
    });

    it("should be able to add multiple elements", function() {
      let keys = new Set();
      for (let i = 0; i <= 100; i++) keys.add(rdmWord());
      keys = [...keys];
      keys.forEach((key, i) => tree.put(key, i));
      keys.forEach((key, i) => chai.assert.equal(tree.get(key), i));
      chai.assert.equal(tree.size, keys.length);
    });

    it("should be able to add in any order", function() {
      tree.put("cd", 12).put("df", 25).put("ff", 0).delete("df").put("xcx", 32).delete("cd");
      chai.assert.equal(tree.get("ff"), 0);
      chai.assert.equal(tree.get("xcx"), 32);
      chai.assert.equal(tree.size, 2);
    });

    it("should update the value associated to the key when it's already in the tree", function() {
      tree.put("age", 44).put("age", 45);
      chai.assert.equal(tree.get("age"), 45);
      chai.assert.equal(tree.size, 1);
    });
  });

  describe("method deleteMin()", function() {
    it("should not mutate the tree when it's empty", function() {
      tree.deleteMin();
      chai.assert.equal(tree.size, 0);
    });

    it("should be able to delete the minimum key in the tree", function() {
      tree.put("back", 1).put("block", 3).put("beo", 2).put("flox", 4).deleteMin();
      chai.assert.equal(tree.size, 3);
      chai.assert.deepEqual([...tree], [["beo", 2], ["block", 3], ["flox", 4]]);
    });

    it("should be able to delete all the elements in the tree", function() {
      tree.put("ibar", 3).put("dmax", 2).put("elm", 5).put("ape", 1).put("ele", 4);
      while (tree.size != 0) tree.deleteMin();
      chai.assert.equal(tree.size, 0);
      chai.assert.deepEqual([...tree], []);
    });
  });

  describe("method delete(key)", function() {
    it("should not mutate the tree when the key doesn't exist", function() {
      tree.delete("a");
      chai.assert.equal(tree.size, 0);
    });

    it("should be able to delete the key in the tree", function() {
      const keys = ["l", "g", "o", "f", "h", "n", "p", "q", "c", "i", "m", "a", "e", "d"];
      keys.forEach((k, i) => tree.put(k, i));
      tree.delete("c");
      chai.assert.equal(tree.size, 13);
      keys.forEach((k, i) => k !== "c" && chai.assert.equal(tree.get(k), i));
      chai.assert.isUndefined(tree.get("c"));
    });

    it("should be able to delete all elements in the tree", function() {
      const keys = ["l", "g", "o", "f", "h", "n", "p", "q", "c", "i", "m", "a", "e", "d"];
      keys.forEach((k, i) => tree.put(k, i));
      keys.forEach((k) => tree.delete(k));
      keys.forEach((k) => chai.assert.isUndefined(tree.get(k)));
      chai.assert.equal(tree.size, 0);
    });
  });

  describe("method getMin()", function() {
    it("should get undefined when the tree is empty", function() {
      chai.assert.isUndefined(tree.getMin());
    });

    it("should get minimum key in the list", function() {
      tree.put("Adam", 1).put("karl", 2).put("Simon", 4).put("Mark", 3);
      chai.assert.deepEqual(tree.getMin(), ["Adam", 1]);
    });
  });

  describe("method getMax()", function() {
    it("should get undefined when the tree is empty", function() {
      chai.assert.isUndefined(tree.getMax());
    });

    it("should get maximum key in the list", function() {
      tree.put("Adam", 1).put("karl", 2).put("Simon", 4).put("Mark", 3);
      chai.assert.deepEqual(tree.getMax(), ["Simon", 4]);
    });
  });

  describe("method ceil(key)", function() {
    it("should get undefined when the tree is empty", function() {
      chai.assert.isUndefined(tree.ceil("key"));
    });

    it("should get the larger key closest to the given key", function() {
      tree.put("l", 1).put("g", 3).put("o", 0).put("n", 1).put("p", 5).put("q", 9);
      chai.assert.equal(tree.ceil("m"), "n");
    });

    it("should get the larger key closest to the given key", function() {
      tree.put("l", 1).put("g", 3).put("o", 0).put("n", 1).put("p", 5).put("q", 9).put("m", 7);
      chai.assert.equal(tree.ceil("m"), "m");
    });
  });

  describe("method floor(key)", function() {
    it("should get undefined when the tree is empty", function() {
      chai.assert.isUndefined(tree.floor("key"));
    });

    it("should get the smaller key closest to the given key", function() {
      tree.put("moo", 33).put("plat", 3).put("pat", 0).put("omx", 1)
        .put("ole", 55).put("rub", 92).put("ret", 11).put("sen", 99);
      chai.assert.equal(tree.ceil("olz"), "omx");
    });

    it("should get the key when it's in the tree", function() {
      tree.put("moo", 33).put("plat", 3).put("pat", 0).put("omx", 1)
        .put("ole", 55).put("rub", 92).put("ret", 11).put("sen", 99);
      chai.assert.equal(tree.floor("ret"), "ret");
    });
  });

  describe("method getHeight()", function() {
    it("should get 0 when the tree is empty", function() {
      chai.assert.equal(tree.getHeight(), 0);
    });

    it("should get 1 when the tree has one element", function() {
      tree.put("ax", 1);
      chai.assert.equal(tree.getHeight(), 1);
    });

    it("should get the height of the tree", function() {
      const keys = ["l", "g", "o", "f", "h", "n", "p", "q", "c", "i", "m", "a", "e", "d"];
      keys.forEach((k, i) => tree.put(k, i));
      chai.assert.equal(tree.getHeight(), 6);
    });
  });

  describe("method deleteTree()", function() {
    it("should delete the entire tree", function() {
      const keys = ["l", "g", "o", "f", "h", "n", "p", "q", "c", "i", "m", "a", "e", "d"];
      keys.forEach((k, i) => tree.put(k, i));
      tree.deleteTree();
      keys.forEach((k) => chai.assert.isUndefined(tree.get(k)));
      chai.assert.equal(tree.size, 0);
    });
  });
});
