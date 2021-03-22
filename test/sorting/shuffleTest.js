import chai from "chai";
import shuffle from "../../src/sorting/shuffle.js";

describe("shuffle(arr)", function() {
  it("should return a randomly shuffle array", function() {
    const vals = Array.from({length: 100}, (_, i) => i);
    // it could actually happen that the arr is the same after shuffle but it's a very rare case
    chai.assert.notDeepEqual(shuffle(vals.slice()), vals);
  });
});
