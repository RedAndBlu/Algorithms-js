// The Fisher–Yates shuffle algorithm
export default function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[r];
    arr[r] = tmp;
  }

  return arr;
}
