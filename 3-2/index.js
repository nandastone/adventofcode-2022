import fs from "fs";
import { chunkArray } from "../util.js";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

const rucksacks = input.split(/\n/);
const groups = chunkArray(rucksacks, 3);

const total = groups.reduce((acc, curr) => {
  const [firstRucksack, ...otherRucksacks] = curr;

  const repeat = firstRucksack
    .split("")
    .find((letter) =>
      otherRucksacks.every((rucksack) => rucksack.includes(letter))
    );

  return acc + getPriority(repeat);
}, 0);

function getPriority(char) {
  return char.charCodeAt() >= 96
    ? char.charCodeAt() - 96
    : char.charCodeAt() - 38;
}

console.log(total);
