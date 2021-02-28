import chai from "chai";
import CircularQueue from "../../../src/dataStructures/queue/circularQueue.js";


describe("CircularQueue", function() {
  let queue;

  beforeEach(function() {
    queue = new CircularQueue();
  });

  describe("Queue Iterator", function() {
    it("should be iterabable", function() {
      chai.assert.deepEqual([...queue], []);
    });

    it("should iterate in the correct order", function() {
      queue.enqueue(1).enqueue(2).enqueue(3);
      chai.assert.deepEqual([...queue], [1, 2, 3]);
    });
  });

  describe("method isEmpty()", function() {
    it("should get true when it is empty", function() {
      chai.assert.isTrue(queue.isEmpty());
    });

    it("should get false when it isn't empty", function() {
      chai.assert.isFalse(queue.enqueue(10).isEmpty());
    });
  });

  describe("method isFull()", function() {
    it("should get true when it is full", function() {
      const que = new CircularQueue(3).enqueue(1).enqueue(2).enqueue(3);
      chai.assert.isTrue(que.isFull());
    });

    it("should get false when it isn't full", function() {
      chai.assert.isFalse(queue.enqueue(10).isFull());
    });
  });

  describe("method enqueue(value)", function() {
    it("should add one element when it is empty", function() {
      const newQueue = new CircularQueue().enqueue(10);
      chai.assert.equal(newQueue.dequeue(), 10);
      chai.assert.isTrue(newQueue.isEmpty());
    });

    it("should be able to add multiple elements", function() {
      queue.enqueue(10).enqueue(11).enqueue(12);
      chai.assert.deepEqual([...queue], [10, 11, 12]);
    });

    it("should be able to be used in any order", function() {
      queue.enqueue(10).enqueue(11).dequeue();
      queue.enqueue(12).enqueue(13).dequeue();
      chai.assert.deepEqual([...queue], [12, 13]);
    });

    it("should throw an error when the queue is full", function() {
      queue.enqueue(10).enqueue(11).enqueue(12).enqueue(13).enqueue(14);
      chai.assert.throws(queue.enqueue.bind(queue, 15), "Error can't add an element to a full queue");
    });

    it("should be able to add when the capacity is larger", function() {
      const newQueue = new CircularQueue(10)
        .enqueue(10)
        .enqueue(11)
        .enqueue(12)
        .enqueue(13)
        .enqueue(14);

      chai.assert.deepEqual([...newQueue.enqueue(15)], [10, 11, 12, 13, 14, 15]);
    });
  });

  describe("method dequeue()", function() {
    it("should throw an error when the queue is empty", function() {
      chai.assert.throws(queue.dequeue.bind(queue), "Error can't get an element from a empty queue");
    });

    it("should get and remove the only one element remaning", function() {
      queue.enqueue(22);
      chai.assert.equal(queue.dequeue(), 22);
      chai.assert.isTrue(queue.isEmpty());
    });

    it("should get and remove the first element when it has multiple elements", function() {
      queue.enqueue(22).enqueue(223).enqueue(2223);
      chai.assert.equal(queue.dequeue(), 22);
      chai.assert.deepEqual([...queue], [223, 2223]);
    });

    it("should be able to be used in eny order", function() {
      queue.enqueue(22).enqueue(223).dequeue();
      queue.enqueue(2223).dequeue();
      chai.assert.equal(queue.dequeue(), 2223);
      chai.assert.isTrue(queue.isEmpty());
    });
  });
});
