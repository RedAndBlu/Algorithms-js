// @param {array} arr
// @param {number} idx - index of the array
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return the value at the given index when the arr is sorted
export default function quickSort(arr, idx, compare) {
  if (idx < 0 || idx >= arr.length) return;
  let lo = 0, hi = arr.length - 1;

  while (lo < hi) {
    const k = partition(arr, lo, hi, compare);

    if (k < idx) lo = k + 1;
    else if (k > idx) hi = k - 1;
    else return arr[k];
  }

  return arr[idx];
}

function partition(arr, lo, hi, cmp) {
  swap(arr, lo, Math.floor((lo + hi) / 2));
  let i = lo, j = hi + 1;

  while (true) {
    while (++i !== hi && cmp(arr[lo], arr[i]) > 0);
    while (--j !== lo && cmp(arr[lo], arr[j]) < 0);

    if (i >= j) {
      swap(arr, lo, j);
      return j;
    }

    swap(arr, i, j);
  }
}

function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
