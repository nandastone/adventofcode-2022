import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\n/).map((row) => row.split(""));

const checkDirection = (x, y, direction) => {
  const tree = map[y][x];

  for (
    let i =
      direction === "up" || direction === "down"
        ? y - (direction === "up" ? 1 : -1)
        : x - (direction === "left" ? 1 : -1);
    direction === "up" || direction === "left" ? i >= 0 : i < map.length;
    direction === "up" || direction === "left" ? i-- : i++
  ) {
    const nextTree =
      map[direction === "up" || direction === "down" ? i : y][
        direction === "left" || direction === "right" ? i : x
      ];
    const isTreeSmaller = nextTree < tree;

    if (!isTreeSmaller) {
      return false;
    }
  }

  return true;
};

const checkTree = (x, y) => {
  const treeVisible =
    checkDirection(x, y, "up") ||
    checkDirection(x, y, "down") ||
    checkDirection(x, y, "left") ||
    checkDirection(x, y, "right");

  return treeVisible;
};

let numTreesVisible =
  // The outside trees are always visible, so initialise the count to their number.
  map.length * 4 - 4;

// Loop through and check all remaining interior trees.
for (let y = 1; y < map.length - 1; y++) {
  for (let x = 1; x < map.length - 1; x++) {
    if (checkTree(x, y)) {
      numTreesVisible += 1;
    }
  }
}

console.log(numTreesVisible);
