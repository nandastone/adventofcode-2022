import fs from "fs";
import { parseInput } from "./parse.js";

const SMALL_FOLDER_MAX_SIZE = 100000;

// const input = fs.readFileSync("./demo-input.txt").toString();
const input = fs.readFileSync("./input.txt").toString();
const system = parseInput(input);

const calculateFolderSize = (dir, depth = 1, track = {}) => {
  let size = 0;

  Object.values(dir).forEach((data) => {
    if (data.type === "file") {
      size += data.size;
    } else {
      const subsize = calculateFolderSize(data.children, depth + 1, track);

      if (!track[data.path]) {
        track[data.path] = subsize;
      } else {
        track[data.path] += subsize;
      }

      size += subsize;
    }
  });

  if (depth === 1) {
    return track;
  }

  return size;
};

const folders = calculateFolderSize(system);
const sizeOfSmallFolders = Object.values(folders).reduce((acc, curr) => {
  if (curr < SMALL_FOLDER_MAX_SIZE) {
    return acc + curr;
  }

  return acc;
}, 0);

console.log(sizeOfSmallFolders);
