
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return array sorted
export default function quickSort(arr, compare) {
  sort(arr, 0, arr.length - 1, compare);
  return arr;
}

function sort(arr, l, r, cmp) {
  if (r <= l) return;
  const p = partition(arr, l, r, cmp);
  sort(arr, l, p - 1, cmp);
  sort(arr, p + 1, r, cmp);
}

function partition(arr, l, r, cmp) {
  swap(arr, Math.floor((r + l) / 2), l);          // prevent worst-case behavior on already sorted arrays
  let i = l, j = r + 1;

  while (true) {
    while (++i !== r && cmp(arr[l], arr[i]) > 0);
    while (--j !== l && cmp(arr[l], arr[j]) < 0);

    if (i >= j) {
      swap(arr, l, j);
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
