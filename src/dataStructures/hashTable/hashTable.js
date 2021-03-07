
class Iteam {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

const PRIME = 31;
const EMPTY = new Iteam(null, null);
const DELETED = new Iteam(null, null);
const MIN_LOAD_FACTOR = 0.25;
const MAX_LOAD_FACTOR = 0.75;
const MIN_CAPACITY = 13;

export default class HashTable {
  constructor() {
    this._capacity = MIN_CAPACITY;
    this._size = 0;
    this._store = new Array(this._capacity).fill(EMPTY);
  }

  // @return {number}
  get size() {
    return this._size;
  }

  // @param {string | number} key
  // @return {boolean}
  exist(key) {
    return this.get(key) !== undefined;
  }

  // @return [key, value] pairs
  *[Symbol.iterator]() {
    for (let i = 0; i < this._capacity; i++) {
      if (this._store[i] === EMPTY || this._store[i] === DELETED)
        continue;
      yield [this._store[i].key, this._store[i].value];
    }
  }

  // @param {string | number} key
  // @return {this HashTable}
  // if the key is a duplicate the value get updated
  add(key, value) {
    const hash = this._probeHash(key, this._capacity);
    let h = hash();

    while (this._store[h].key !== key && this._store[h] !== EMPTY && this._store[h] !== DELETED)
      h = hash();

    if (this._store[h].key !== key) this._size++;
    this._store[h] = new Iteam(key, value);
    this._enlarge();
    return this;
  }

  // @param {string | number} key
  // @return - the value associated or undefined
  get(key) {
    const at = this._iteamAt(key);
    if (at !== undefined) return this._store[at].value;
  }

  // @param {string | number} key
  // @return {boolean} - true if it was deleted
  remove(key) {
    const at = this._iteamAt(key);
    if (at === undefined) return false;

    this._store[at] = DELETED;
    this._size--;
    this._shrink();
    return true;
  }

  // @param {string | number} key
  // @return the index of the key if it's in store
  _iteamAt(key) {
    const hash = this._probeHash(key, this._capacity);

    for (let h = hash(); this._store[h] !== EMPTY; h = hash()) {
      if (this._store[h] === DELETED) continue;
      if (this._store[h].key === key) return h;
    }
  }

  // @param {string | number} key
  // @param {number} size
  // @return {number} - from 0 (included) to size (not included)
  _probeHash(key, size) {
    let trial = 0;
    return () => (HashTable.hash(key, size) + trial++) % size;
  }

  _enlarge() {
    if (MAX_LOAD_FACTOR < this._size / this._capacity)
      this._newCapacity(Math.round(this._capacity * 2));
  }

  _shrink() {
    if (MIN_LOAD_FACTOR > this._size / this._capacity)
      this._newCapacity(Math.round(this._capacity / 2));
  }

  _newCapacity(capacity) {
    const elms = [...this];
    this._capacity = capacity;
    this._size = 0;
    this._store = new Array(this._capacity).fill(EMPTY);

    for (let elm of elms) this.add(elm[0], elm[1]);
  }

  // @param {string | number} key - immutable types are need for the symbol table
  // @param {number} size - only number greater than 0 are allowed
  // @return {number} - from 0 (included) to size (not included)
  static hash(key, size) {
    if (!size || size <= 0)
      throw new Error("error the argument size needs to be greater than 0");
    if (typeof key === "string")
      return HashTable._hashString(key, size);
    if (typeof key === "number")
      return Math.abs(key) * PRIME % size;

    throw new Error("error the argument key needs to be a string or a number");
  }

  static _hashString(key, size) {
    let h = 0;

    for (let i = 0; i < key.length; i++)
      h = (PRIME * h + key.codePointAt(i)) % size;

    return h;
  }
}
