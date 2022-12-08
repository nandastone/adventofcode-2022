import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\n/).map((row) => row.split(""));

const checkDirection = (x, y, direction) => {
  const tree = map[y][x];
  let count = 0;

  for (
    let i =
      direction === "up" || direction === "down"
        ? y - (direction === "up" ? 1 : -1)
        : x - (direction === "left" ? 1 : -1);
    direction === "up" || direction === "left" ? i >= 0 : i < map.length;
    direction === "up" || direction === "left" ? i-- : i++
  ) {
    /* Increment immediately, if we're looping we can see this tree. Further logic
    determines if we can see past it. */
    count += 1;
    const nextTree =
      map[direction === "up" || direction === "down" ? i : y][
        direction === "left" || direction === "right" ? i : x
      ];
    const isTreeSmaller = nextTree < tree;

    if (!isTreeSmaller) {
      return count;
    }
  }

  return count;
};

const checkTree = (x, y) => {
  const scenicScore =
    checkDirection(x, y, "up") *
    checkDirection(x, y, "down") *
    checkDirection(x, y, "left") *
    checkDirection(x, y, "right");

  return scenicScore;
};

let scores = [];
// Loop through and check all remaining interior trees.
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map.length; x++) {
    const score = checkTree(x, y);
    scores.push(score);
  }
}
const highestScore = scores.sort((a, b) => b - a)[0];

console.log(highestScore);
