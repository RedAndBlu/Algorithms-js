
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return array sorted
export default function shellSort(arr, compare) {
  let h = 1;
  while (h < arr.length / 3) h = h * 3 + 1;

  while (h >= 1) {
    for (let i = h; i < arr.length; i++) {
      for (let j = i; j >= h && compare(arr[j], arr[j - h]) < 0; j -= h) {
        swap(arr, j , j - h);
      }
    }

    h = Math.floor(h / 3);
  }

  return arr;
}


function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
