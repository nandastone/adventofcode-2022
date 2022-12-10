import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

const knots = Array.from({ length: 10 }).map(() => {
  return { x: 0, y: 0 };
});
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
  const headKnot = knots[0];

  if (direction === "up") {
    headKnot.y = headKnot.y - 1;
  } else if (direction === "down") {
    headKnot.y = headKnot.y + 1;
  } else if (direction === "left") {
    headKnot.x = headKnot.x - 1;
  } else if (direction === "right") {
    headKnot.x = headKnot.x + 1;
  } else {
    throw new Error("Invalid direction!");
  }

  knots.forEach((_, idx) => {
    // Don't make anything try and touch the last knot.
    if (idx === knots.length - 1) {
      return;
    }

    if (!isAdjacent(knots[idx], knots[idx + 1])) {
      makeTouching(knots[idx], knots[idx + 1]);
    }
  });
};

const isAdjacent = (knot1, knot2) => {
  const xDistance = Math.abs(knot1.x - knot2.x);
  const yDistance = Math.abs(knot1.y - knot2.y);

  return !(xDistance > 1 || yDistance > 1);
};

const makeTouching = (knot1, knot2) => {
  // Move horizontally.
  if (knot2.y === knot1.y) {
    knot2.x = knot2.x + (knot1.x > knot2.x ? 1 : -1);
    // Move vertically.
  } else if (knot2.x === knot1.x) {
    knot2.y = knot2.y + (knot1.y > knot2.y ? 1 : -1);
  } else {
    // Move diagonally.
    knot2.x = knot2.x + (knot1.x > knot2.x ? 1 : -1);
    knot2.y = knot2.y + (knot1.y > knot2.y ? 1 : -1);
  }
};

const trackTail = () => {
  const tail = knots[knots.length - 1];
  tailTracker.add(`${tail.x}-${tail.y}`);
};

trackTail();

instructions.forEach(({ direction, distance }) => {
  for (let i = 0; i < distance; i++) {
    move(direction);
    trackTail();
  }
});

console.log(tailTracker.size);
