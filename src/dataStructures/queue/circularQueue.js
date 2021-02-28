export default class CircularQueue {
  constructor(capacity = 5) {
    this._capacity = capacity + 1;              // only (capacity - 1) is actually writable, so one extra space is needed
    this._store = new Array(this._capacity);
    this._write = 0;
    this._read = 0;
  }

  *[Symbol.iterator]() {
    for (let i = this._read; i !== this._write; i = this._incrementByOne(i))
      yield this._store[i];
  }

  isEmpty() {
    return this._write === this._read;
  }

  isFull() {
    return this._read === this._incrementByOne(this._write);    // full when the write index is one behind read
  }

  enqueue(value) {
    if (this.isFull())
      throw new Error("Error can't add an element to a full queue");

    this._store[this._write] = value;
    this._write = this._incrementByOne(this._write);
    return this;
  }

  dequeue() {
    if (this.isEmpty())
      throw new Error("Error can't get an element from a empty queue");

    const val = this._store[this._read];
    this._read = this._incrementByOne(this._read);
    return val;
  }

  _incrementByOne(address) {
    return (address + 1) % this._capacity;
  }
}
