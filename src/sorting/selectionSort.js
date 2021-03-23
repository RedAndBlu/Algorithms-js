
// @param {array} arr
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return array sorted
export default function selectionSort(arr, compare) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[j], arr[min]) < 0) min = j;
    }

    const tmp = arr[i];
    arr[i] = arr[min];
    arr[min] = tmp;
  }

  return arr;
}
