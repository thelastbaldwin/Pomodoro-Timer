export const padZeros = (time = 0, desiredLength = 2) => {
  let timeString = time.toString();
  while (timeString.length < desiredLength) {
    timeString = `0${timeString}`;
  }
  return timeString;
};

export const swap = (arr, a, b) => {
  const copy = arr.slice(0);
  const temp = copy[a];
  copy[a] = copy[b];
  copy[b] = temp;

  return copy;
};
