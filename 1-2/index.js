import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync('./input.txt').toString()

const elves = input.split(/\n\s*\n/);
const calories = elves
  // Split each elf's list of calories (new lines) and sum.
  .map(
    (elf) =>
      elf
        .split(/\n/)
        .map((calories) => parseInt(calories, 10))
        .reduce((acc, curr) => acc + curr),
    0
  )
  // Sort DESC.
  .sort((a, b) => b - a);

const topThreeCalories = calories.slice(0, 3)
const sumTopThreeCalories = topThreeCalories.reduce((acc, curr) => acc + curr, 0)

console.log(sumTopThreeCalories);
