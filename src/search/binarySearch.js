
// @param {array} arr - required to be sorted
// @param val - value serched
// @param {function} cmp -
//   If cmp(a, b) returns 0, then a and b are equals
//   If cmp(a, b) returns less then 0, than a is before b
//   If cmp(a, b) returns greater then 0, than b is before a.
//   cmp(a, b) must always return the same value when given a specific pair
// @return {number} index of the given val in the arr or -1 if doesn't exist
export default function binarySearch(arr, val, cmp) {
  let l = 0, r = arr.length - 1;

  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);

    if (cmp(arr[m], val) > 0) r = m - 1;
    else if (cmp(arr[m], val) < 0) l = m + 1;
    else return m;
  }

  return -1;
}
