import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync('./input.txt').toString()

const elves = input.split(/\n\s*\n/);
const calories = elves
  // Split each elf's list of foods (new lines) and sum into the total calories for all their foods.
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

// Because the list of calories is sorted DESC, the first item will be the largest.
const highestCalories = calories[0]

console.log(highestCalories);