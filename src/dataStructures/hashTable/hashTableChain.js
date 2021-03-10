
class Iteam {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

const PRIME = 31;
const MIN_CAPACITY = 13;
const MIN_LOAD_FACTOR = 0.3;
const MAX_LOAD_FACTOR = 0.9;

export default class HashTable {
  constructor() {
    this._capacity = MIN_CAPACITY;
    // TODO: add linked list
    this._store = Array.from({length: this._capacity}, () => []);
    this._size = 0;
  }

  // @return {number}
  get size() {
    return this._size;
  }

  // @param {string | number} key
  // @return {this HashTable}
  // if the key is a duplicate the value get updated
  add(key, value) {
    const bag = this._store[HashTable.hash(key, this._capacity)];
    const idx = bag.findIndex(iteam => iteam.key === key);

    if (idx == -1) {
      bag.push(new Iteam(key, value));
      this._size++;
      this._enlarge();
    }
    else bag[idx].value = value;

    return this;
  }

  // @param {string | number} key
  // @return {boolean}
  exist(key) {
    return this.get(key) !== undefined;
  }

  // @param {string | number} key
  // @return - the value associated or undefined
  get(key) {
    const bag = this._store[HashTable.hash(key, this._capacity)];
    const idx = bag.findIndex(iteam => iteam.key === key);
    if (idx != -1) return bag[idx].value;
  }

  // @param {string | number} key
  // @return {boolean} - true if it was deleted
  remove(key) {
    const bag = this._store[HashTable.hash(key, this._capacity)];
    const idx = bag.findIndex(iteam => iteam.key === key);

    if (idx != -1) {
      bag.splice(idx, 1);
      this._size--;
      this._shrink();
      return true;
    }

    return false;
  }

  // @return [key, value] pairs
  *[Symbol.iterator]() {
    for (let i = 0; i < this._capacity; i++) {
      for (let iteam of [...this._store[i]])
        yield [iteam.key, iteam.value];
    }
  }

  _enlarge() {
    if (this._size / this._capacity > MAX_LOAD_FACTOR)
      this._newCapacity(Math.round(this._capacity * 2));
  }

  _shrink() {
    if (this._size / this._capacity < MIN_LOAD_FACTOR)
      this._newCapacity(Math.round(this._capacity / 2));
  }

  _newCapacity(capacity) {
    const elms = [...this];
    this._size = 0;
    this._capacity = capacity;
    this._store = Array.from({length: this._capacity}, () => []);

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
      h = (h * PRIME + key.codePointAt(i)) % size;

    return h;
  }
}
