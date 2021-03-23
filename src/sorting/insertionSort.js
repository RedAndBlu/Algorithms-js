
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return array sorted
export default function insertionSort(arr, compare) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0 && compare(arr[j], arr[j - 1]) < 0; j--) {
      const tmp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = tmp;
    }
  }

  return arr;
}
