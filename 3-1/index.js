import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

const rucksacks = input.split(/\n/);
const total = rucksacks.reduce((acc, curr) => {
  const [firstCompartment, secondCompartment] = [
    curr.slice(0, Math.ceil(curr.length / 2)),
    curr.slice(Math.ceil(curr.length / 2)),
  ];

  const repeat = firstCompartment
    .split("")
    .find((letter) => secondCompartment.includes(letter));

  return acc + getPriority(repeat);
}, 0);

function getPriority(char) {
  return char.charCodeAt() >= 96
    ? char.charCodeAt() - 96
    : char.charCodeAt() - 38;
}

console.log(total);
