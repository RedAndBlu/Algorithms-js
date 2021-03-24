
export default class DisjointSet {
  constructor(nodes = 0) {
    this._n = nodes;
    this._components = nodes;
    this._sizeComps = [];
    this._roots = [];

    for (let i = 0; i < nodes; i++) {
      this._sizeComps[i] = 1;
      this._roots[i] = i;
    }
  }

  // @return {} - nodes in the set
  count() {
    return this._n;
  }

  // @return {number} - components in the set
  countComponents() {
    return this._components;
  }

  // @param {number} id - node position
  // @return {number} - the amount of components of the given id
  componentSize(id) {
    return this._sizeComps[this._findRoot(id)];
  }

  // @param {number} id1 - node position
  // @param {number} id2 - node position
  // @return {bool}
  areConnected(id1, id2) {
    const r1 = this._findRoot(id1);
    const r2 = this._findRoot(id2);
    return r1 !== null && r2 !== null && r1 === r2;
  }

  // @param {number} id1 - node position
  // @param {number} id2 - node position
  // @return {number} - true when the components of the given pair was connected
  connect(id1, id2) {
    const r1 = this._findRoot(id1);
    const r2 = this._findRoot(id2);

    if (r1 === null || r2 === null || r1 === r2) {
      return false;
    }
    else if (this._sizeComps[r1] > this._sizeComps[r2]) {
      this._roots[r2] = r1;
      this._sizeComps[r1] += this._sizeComps[r2];
    }
    else {
      this._roots[r1] = r2;
      this._sizeComps[r2] += this._sizeComps[r1];
    }

    this._components--;
    return true;
  }

  // @param {number} id - node position
  // @return {number} - the parent of the given id node
  _findRoot(id) {
    if (id >= this._n || id < 0) return null;

    while (id != this._roots[id])
      id = this._roots[id] = this._roots[this._roots[id]];

    return id;
  }
}
