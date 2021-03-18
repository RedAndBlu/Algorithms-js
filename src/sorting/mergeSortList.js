import linkedList from "../dataStructures/linkedList/doublyLinkedList.js";


// @param {LinkedList} list - supporting the methods size, push(v), front() and shift()
// @param {function} compare -
//   If compare(a, b) returns less than 0 or equal to 0, leave a and b unchanged.
//   If compare(a, b) returns greater than 0, sort b before a.
//   compare(a, b) must always return the same value when given a specific pair
// @return {LinkedList} list - a new sorted list or the same list if smaller then 2
export default function mergeSortList(list, compare) {
  if (list.size <= 1) return list;
  let left = new linkedList(), right = new linkedList();
  let i = 0;

  for (let x of list) {
    if (i < list.size / 2) left.push(x);
    else right.push(x);
    i++;
  }

  left = mergeSortList(left, compare);
  right = mergeSortList(right, compare);
  return merge(left, right, compare);
}


function merge(lList, rList, cmp) {
  const rst = new linkedList();

  while (lList.size !== 0 || rList.size !== 0) {
    if (rList.size === 0 || (lList.size > 0 && cmp(lList.front(), rList.front()) <= 0))
      rst.push(lList.shift());
    else
      rst.push(rList.shift());
  }

  return rst;
}
