import fs from "fs";

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();

// Convert input into array.
// Select a frame of 4 items.
// If all items (characters) are unique, success.
// If not, move frame 1 position forward in the array.

const inputArray = input.split("");
const FRAME_LENGTH = 14;

let marker = FRAME_LENGTH;
while (marker < inputArray.length) {
  const frame = inputArray.slice(marker - FRAME_LENGTH, marker);
  const set = new Set(frame);

  if (frame.length === set.size) {
    break;
  }

  marker = marker + 1;
}

console.log(marker);
