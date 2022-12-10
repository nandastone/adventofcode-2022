import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };
const directionMap = {
  R: "right",
  L: "left",
  U: "up",
  D: "down",
};
const tailTracker = new Set();

const instructions = input.split(/\n/).map((row) => {
  const [direction, distance] = row.split(" ");
  return {
    direction: directionMap[direction],
    distance: parseInt(distance, 10),
  };
});

const move = (direction) => {
  if (direction === "up") {
    head.y = head.y - 1;

    if (!isAdjacent(head, tail)) {
      tail.x = head.x;
      tail.y = head.y + 1;
    }
  } else if (direction === "down") {
    head.y = head.y + 1;

    if (!isAdjacent(head, tail)) {
      tail.x = head.x;
      tail.y = head.y - 1;
    }
  } else if (direction === "left") {
    head.x = head.x - 1;

    if (!isAdjacent(head, tail)) {
      tail.y = head.y;
      tail.x = head.x + 1;
    }
  } else if (direction === "right") {
    head.x = head.x + 1;

    if (!isAdjacent(head, tail)) {
      tail.y = head.y;
      tail.x = head.x - 1;
    }
  } else {
    throw new Error("Invalid direction!");
  }

  tailTracker.add(`${tail.x}-${tail.y}`);
};

const isAdjacent = (posA, posB) => {
  const xDistance = Math.abs(posA.x - posB.x);
  const yDistance = Math.abs(posA.y - posB.y);

  return !(xDistance > 1 || yDistance > 1);
};

tailTracker.add(`${tail.x}-${tail.y}`);

instructions.forEach(({ direction, distance }) => {
  for (let i = 0; i < distance; i++) {
    move(direction);
  }
});

console.log(tailTracker.size);
