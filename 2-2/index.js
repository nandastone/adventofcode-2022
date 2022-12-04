import fs from "fs";

// const input = fs.readFileSync('./demo-input.txt').toString();
const input = fs.readFileSync("./input.txt").toString();

const getPointsForChoice = (choice) => {
  const map = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  return map[choice];
};

const getChoiceFromRaw = (raw) => {
  const map = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };

  return map[raw];
};

const findBeatingChoice = (choice) => {
  const map = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock",
  };

  return map[choice];
};

const findLosingChoice = (choice) => {
  return findBeatingChoice(findBeatingChoice(choice));
};

const simulateRound = (a, b) => {
  if (a === b) {
    return 0;
  }

  if (a === findBeatingChoice(b)) {
    return -1;
  }

  // B must have won.
  return 1;
};

const games = input.split(/\n/);
const totalPoints = games.reduce((acc, curr) => {
  const [rawEnemy, action] = curr.split(" ");
  const enemyChoice = getChoiceFromRaw(rawEnemy);

  let yourChoice;

  // You should lose.
  if (action === "X") {
    yourChoice = findLosingChoice(enemyChoice);
    // You should draw.
  } else if (action === "Y") {
    yourChoice = enemyChoice;
    // You should win.
  } else if (action === "Z") {
    yourChoice = findBeatingChoice(enemyChoice);
  } else {
    throw new Error("Invalid action.");
  }

  let points = getPointsForChoice(yourChoice);
  const winner = simulateRound(yourChoice, enemyChoice);

  if (winner === -1) {
    // 6 points for a victory
    points += 6;
  } else if (winner === 0) {
    // 3 points for a draw
    points += 3;
  } else {
    // No points for a loss.
  }

  return acc + points;
}, 0);

console.log(totalPoints);
