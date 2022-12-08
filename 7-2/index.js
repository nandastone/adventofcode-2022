import fs from "fs";
import { parseInput } from "./parse.js";

const TOTAL_DISK_SPACE = 70000000;
const TARGET_DISK_SPACE = 30000000;

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
const totalDiskUsage = folders["/"];
const availableSpace = TOTAL_DISK_SPACE - totalDiskUsage;
const sortedFolders = Object.values(folders).sort((a, b) => a - b);
const folderToDelete = sortedFolders.find(
  (folder) => availableSpace + folder > TARGET_DISK_SPACE
);

console.log(folderToDelete);
