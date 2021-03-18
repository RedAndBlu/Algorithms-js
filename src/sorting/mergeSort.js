
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return void
export default function mergeSort(arr, compare) {
  sort(arr, arr.slice(), 0, arr.length, compare);
  return arr;
}

function sort(arr, ax, iLow, iHigh, compare) {
  if (iHigh - iLow <= 1) return;

  const mid = Math.floor((iLow + iHigh) / 2);
  sort(ax, arr, iLow, mid, compare);
  sort(ax, arr, mid, iHigh, compare);
  merge(arr, ax, iLow, mid, iHigh, compare);
}

function merge(arr, ax, iLow, mid, iHigh, compare) {
  for (let i = iLow, l = iLow, m = mid; i < iHigh; i++) {
    if (l < mid && (m >= iHigh || compare(ax[l], ax[m]) <= 0))
      arr[i] = ax[l++];
    else
      arr[i] = ax[m++];
  }
}
