import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

// Cheating a bit by brute forcing the game rather than parsing from the input.
// const puzzle = [["Z", "N"], ["M", "C", "D"], ["P"]];
const puzzle = [
  ["H", "T", "Z", "D"],
  ["Q", "R", "W", "T", "G", "C", "S"],
  ["P", "B", "F", "Q", "N", "R", "C", "H"],
  ["L", "C", "N", "F", "H", "Z"],
  ["G", "L", "F", "Q", "S"],
  ["V", "P", "W", "Z", "B", "R", "C", "S"],
  ["Z", "F", "J"],
  ["D", "L", "V", "Z", "R", "H", "Q"],
  ["B", "H", "G", "N", "F", "Z", "L", "D"],
];

const instructions = input.split(/\n/);

const move = (num, source, destination) => {
  const crates = puzzle[source].splice(puzzle[source].length - num);
  puzzle[destination] = [...puzzle[destination], ...crates];
};

instructions.forEach((instruction) => {
  const result = instruction.match(/^move (\d+) from (\d+) to (\d+)$/);
  const num = parseInt(result[1], 10);
  const source = parseInt(result[2], 10);
  const destination = parseInt(result[3], 10);

  move(num, source - 1, destination - 1);
});

const topCrates = puzzle
  .reduce((acc, curr) => {
    return [...acc, curr[curr.length - 1]];
  }, [])
  .join("");

console.log(topCrates);
