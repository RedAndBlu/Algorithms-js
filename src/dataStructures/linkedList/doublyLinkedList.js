export default class DoublyLinkedList {
  constructor() {
    this._sentinel = new Node(null);
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  push(value) {
    this._addNodeNextTo(this._sentinel.prev, new Node(value));
    return this;
  }

  unshift(value) {
    this._addNodeNextTo(this._sentinel, new Node(value));
    return this;
  }

  insert(index, value) {
    if (index <= 0) this.unshift(value);
    else if (index >= this.size) this.push(value);
    else this._addNodeNextTo(this._getNodeAt(index).prev, new Node(value));

    return this;
  }

  pop() {
    if (this.size > 0) {
      const last = this._sentinel.prev;
      this._deleteNode(last);
      return last.value;
    }
  }

  shift() {
    if (this.size > 0) {
      const first = this._sentinel.next;
      this._deleteNode(first);
      return first.value;
    }
  }

  front() {
    if (this.size > 0)
      return this._sentinel.next.value;
  }

  back() {
    if (this.size > 0)
      return this._sentinel.prev.value;
  }

  valueAt(index) {
    if (this.size > index) return this._getNodeAt(index).value;
  }

  delete(value) {
    const node = this._findNode(value);
    if (node) this._deleteNode(node);
  }

  deleteAt(index) {
    if (this.size > index) {
      this._deleteNode(this._getNodeAt(index));
    }
  }

  reverse() {
    if (this.size > 1) {
      let prevNode = this._sentinel;
      let curtNode = prevNode.next;
      this._sentinel.prev = curtNode;

      while (curtNode !== this._sentinel) {
        const nextNode = curtNode.next;
        curtNode.next = prevNode;
        curtNode.prev = nextNode;
        prevNode = curtNode;
        curtNode = nextNode;
      }

      this._sentinel.next = prevNode;
    }

    return this;
  }

  *[Symbol.iterator]() {
    for (let n = this._sentinel.next; n !== this._sentinel; n = n.next)
      yield n.value;
  }

  _addNodeNextTo(prevNode, newNode) {
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    prevNode.next.prev = newNode;
    prevNode.next = newNode;
    this._size++;
  }

  _findNode(value) {
    for (let n = this._sentinel.next; n !== this._sentinel; n = n.next)
      if (n.value === value) return n;
  }

  _getNodeAt(index) {
    if (index < this.size / 2) return this._getNodeAtFromFront(index);
    else return this._getNodeAtFromEnd(this.size - 1 - index);
  }

  _getNodeAtFromFront(index) {
    if (this.size > index) {
      let n = this._sentinel.next;
      for (let i = 0; i !== index; i++, n = n.next);

      return n;
    }
  }

  _getNodeAtFromEnd(index) {
    if (this.size > index) {
      let n = this._sentinel.prev;
      for (let i = 0; i !== index; i++, n = n.prev);

      return n;
    }
  }

  _deleteNode(n) {
    n.prev.next = n.next;
    n.next.prev = n.prev;
    this._size--;
  }
}


// nodes are initialized with a circular reference
class Node {
  constructor(value) {
    this.value = value;
    this.prev = this;
    this.next = this;
  }
}
