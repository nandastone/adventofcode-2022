import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

const pairs = input.split(/\n/);
const numOverlappingPairs = pairs.reduce((acc, curr) => {
  const [first, second] = curr.split(",");
  const [firstStart, firstEnd] = first
    .split("-")
    .map((part) => parseInt(part, 10));
  const [secondStart, secondEnd] = second
    .split("-")
    .map((part) => parseInt(part, 10));

  if (
    (firstStart >= secondStart && firstEnd <= secondEnd) ||
    (secondStart >= firstStart && secondEnd <= firstEnd)
  ) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(numOverlappingPairs);
