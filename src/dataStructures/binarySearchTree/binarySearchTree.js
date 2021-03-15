
const EMPTY = null;

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = EMPTY;
    this.right = EMPTY;
  }
}

// this code is inspired by the book Algorithms, 4th Edition by Robert Sedgewick and Kevin Wayne
export default class BinarySearchTree {
  // elements are ordered according to the return value of the compare function
  // If a and b are two elements being compared, then:
  // If compare(a, b) returns less than 0, insert a before b
  // If compare(a, b) returns greater than 0, insert b before a.
  // compare(a, b) must always return the same value when given a specific pair.
  // otherwise the order of the tree elements is undefined.
  constructor(compare) {
    this._compare = compare.bind(this);
    this._root = EMPTY;
    this._size = 0;
  }

  // @return number
  get size() {
    return this._size;
  }

  // @return boolean
  exist(key) {
    return this.get(key) !== undefined;
  }

  // @return - value associated with the key otherwise undefined
  get(key) {
    let n = this._root;

    while (n !== EMPTY) {
      const cmp = this._compare(key, n.key);

      if (cmp > 0) n = n.right;
      else if (cmp < 0) n = n.left;
      else return n.value;
    }
  }

  // @return {BinarySearchTree} - the current bst mutated after storing the key and the value
  put(key, value) {
    this._root = this._put(this._root, key, value);
    return this;
  }

  // @return - the pair [key, value] of the smaller key in the bst otherwise undefined
  getMin() {
    if (this._root !== EMPTY) {
      const n = this._getMinNode(this._root);
      return [n.key, n.value];
    }
  }

  // @return - the pair [key, value] of the larger key in the bst otherwise undefined
  getMax() {
    let n = this._root;

    if (n != EMPTY) {
      while (n.right != EMPTY)
        n = n.right;

      return [n.key, n.value];
    }
  }

  // @return - the smaller or equal key closest to the given key in the bst otherwise undefined
  floor(key) {
    const n = this._floorNode(this._root, key);
    if (n !== EMPTY) return n.key;
  }

  // @return - the larger or equal key closest to the given key in the bst otherwise undefined
  ceil(key) {
    const n = this._ceilNode(this._root, key);
    if (n !== EMPTY) return n.key;
  }

  // @return {BinarySearchTree} - the current bst mutated after deleting the minimum key and value
  deleteMin() {
    if (this._root !== EMPTY) this._root = this._deleteMin(this._root);
    return this;
  }

  // @return {BinarySearchTree} - the current bst mutated after deleting the given key and value
  delete(key) {
    if (this._root !== EMPTY) this._root = this._delete(key, this._root);
    return this;
  }

  // @return {number} - the current maximum height (in nodes) of the bst
  getHeight() {
    function height(node) {
      if (node === EMPTY) return 0;
      return Math.max(height(node.left), height(node.right)) + 1;
    }

    return height(this._root);
  }

  // @return {BinarySearchTree} - the current bst mutated after deleting every node
  deleteTree() {
    this._root = EMPTY;
    this._size = 0;
    return this;
  }

  // @return - a pair [key, value] in ascending order for each iterarion
  *[Symbol.iterator]() {
    for (let node of this._traverseInOrder())
      yield [node.key, node.value];
  }

  _put(node, key, value) {
    if (node === EMPTY) {
      this._size++;
      return new Node(key, value);
    }

    const cmp = this._compare(key, node.key);

    if (cmp > 0) node.right = this._put(node.right, key, value);
    else if (cmp < 0) node.left = this._put(node.left, key, value);
    else node.value = value;

    return node;
  }

  // @return - the minimum node staring at the given node
  _getMinNode(node) {
    if (node != EMPTY) {
      while (node.left != EMPTY)
        node = node.left;

      return node;
    }
  }

  // @return - the smaller or equal node closest to the given staring at the given node
  _floorNode(node, key) {
    if (node === EMPTY) return EMPTY;
    const cmp = this._compare(key, node.key);

    if (cmp < 0) return this._floorNode(node.left, key);
    if (cmp === 0) return node;

    const floorRightChild = this._floorNode(node.right, key);
    if (floorRightChild !== EMPTY) return floorRightChild;
    return node;
  }

  // @return - the larger or equal node closest to the given staring at the given node
  _ceilNode(node, key) {
    if (node === EMPTY) return EMPTY;
    const cmp = this._compare(key, node.key);

    if (cmp > 0) return this._ceilNode(node.right, key);
    if (cmp === 0) return node;

    const ceilLeftChild = this._ceilNode(node.left, key);
    if (ceilLeftChild !== EMPTY) return ceilLeftChild;
    return node;
  }

  // delete the node associated with the minimum key starting at the given node
  // recursively reseting only the child of every node traversed
  // @param {Node} node
  // @return {Node} - the node traversed by searching minimum key
  _deleteMin(node) {
    if (node.left === EMPTY) {
      this._size--;
      return node.right;
    }

    node.left = this._deleteMin(node.left);
    return node;
  }

  // delete the node associated with the given key starting at the given node
  // recursively reseting only the child of every node traversed
  // @param key - key to be deleted
  // @param {Node} node
  // @return {Node} - the node traversed by searching the key to be deleted
  // or a substitute node for the deleted one
  _delete(key, node) {
    if (node === EMPTY) return EMPTY;
    const cmp = this._compare(key, node.key);

    if (cmp > 0)
      node.right = this._delete(key, node.right);
    else if (cmp < 0)
      node.left = this._delete(key, node.left);
    else {
      if (node.left === EMPTY) {
        this._size--;
        return node.right;
      }
      if (node.right === EMPTY) {
        this._size--;
        return node.left;
      }

      const temp = node;
      node = this._getMinNode(temp.right);        // substitution of the node
      node.right = this._deleteMin(temp.right);
      node.left = temp.left;
    }

    return node;
  }

  // @return {array of Node} - list of nodes in ascending order by keys
  _traverseInOrder() {
    const list = [];

    function traverse(node) {
      if (node === EMPTY) return;

      traverse(node.left);
      list.push(node);
      traverse(node.right);
    }

    traverse(this._root);
    return list;
  }
}
