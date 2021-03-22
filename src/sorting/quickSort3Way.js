
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return array sorted
export default function quickSort3way(arr, compare) {
  sort(arr, 0, arr.length - 1, compare);
  return arr;
}

function sort(arr, lo, hi, cmp) {
  if (lo >= hi) return;

  swap(arr, lo, Math.floor((lo + hi) / 2));         // prevent worst-case behavior on already sorted arrays
  let pivot = lo, i = lo + 1, gt = hi;

  while (i <= gt) {
    const rst = cmp(arr[i], arr[pivot]);

    if (rst < 0) swap(arr, pivot++, i++);
    else if (rst > 0) swap(arr, i, gt--);
    else i++;
  }

  sort(arr, lo, pivot - 1, cmp);
  sort(arr, gt + 1, hi, cmp);
}

function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
