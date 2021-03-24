import chai from "chai";
import DisjointSet from "../../../src/dataStructures/disjointSet/disjointSet.js";

describe("", function() {
  let union;

  beforeEach(function() {
    union = new DisjointSet(10);
  });

  describe("count()", function() {
    it("should get 0 when empty", function() {
      chai.assert.equal(new DisjointSet(0).count(), 0);
    });

    it("should get the amount of nodes in the set", function() {
      chai.assert.equal(union.count(), 10);
    });
  });

  describe("countComponents()", function() {
    it("should get 0 when empty", function() {
      chai.assert.equal(new DisjointSet(0).countComponents(), 0);
    });

    it("should get the amount of nodes when no nodes were connected", function() {
      chai.assert.equal(union.countComponents(), 10);
    });

    it("should get the amount of nodes after two nodes were connected", function() {
      union.connect(1, 9);
      chai.assert.equal(union.countComponents(), 9);
    });

    it("should get the amount of nodes when multiple nodes were connected", function() {
      union.connect(1, 9);
      union.connect(2, 4);
      union.connect(2, 9);
      union.connect(3, 5);
      chai.assert.equal(union.countComponents(), 6);
    });
  });

  describe("componentSize(id)", function() {
    it("should get undefined when the id doesn't exist", function() {
      chai.assert.isUndefined(union.componentSize(11));
    });

    it("should get 1 when the node id is not connected", function() {
      chai.assert.equal(union.componentSize(1), 1);
    });

    it("should get the amount of nodes in the component of the given id after mutation", function() {
      union.connect(1, 9);
      union.connect(2, 4);
      union.connect(2, 9);
      chai.assert.equal(union.componentSize(1), 4);
    });
  });

  describe("areConnected(id1, id2)", function() {
    it("should get false when the given pair of ids are not connected", function() {
      chai.assert.isFalse(union.areConnected(1, 2));
    });

    it("should get true when the given pair of ids are connected", function() {
      union.connect(1, 2);
      chai.assert.isTrue(union.areConnected(1, 2));
    });

    it("should get false when the given pair don't exists", function() {
      chai.assert.isFalse(union.areConnected(11, 22));
    });
  });

  describe("connect(id1, id2)", function() {
    it("should be able to connect two valid id", function() {
      chai.assert.isTrue(union.connect(1, 5));
      chai.assert.equal(union.countComponents(), 9);
    });

    it("should not connect two invalid id", function() {
      chai.assert.isFalse(union.connect(-1, 5));
      chai.assert.equal(union.countComponents(), 10);
    });

    it("should not connect two already connected id", function() {
      union.connect(1, 5);
      chai.assert.isFalse(union.connect(1, 5));
      chai.assert.equal(union.countComponents(), 9);
    });

    it("should be able to connect all nodes", function() {
      chai.assert.isTrue(union.connect(0, 1));
      chai.assert.isTrue(union.connect(2, 3));
      chai.assert.isTrue(union.connect(4, 5));
      chai.assert.isTrue(union.connect(6, 7));
      chai.assert.isTrue(union.connect(8, 9));
      chai.assert.isTrue(union.connect(0, 2));
      chai.assert.isTrue(union.connect(4, 6));
      chai.assert.isTrue(union.connect(0, 4));
      chai.assert.isTrue(union.connect(0, 8));
      chai.assert.equal(union.countComponents(), 1);
    });
  });
});
