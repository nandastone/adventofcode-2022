/**
 * Parse puzzle input into a tree shaped data structure for use in the rest of the
 * solution.
 *
 * @example
 * {
 *    '/': {
 *      type: 'dir',
 *      path: '/',
 *      children: {
 *        a: {
 *          type: 'dir',
 *          path: '/a',
 *          children: {
 *            b: {
 *              type: 'dir',
 *              path: '/a/b',
 *              children: {
 *                'hello.pdf': {
 *                  type: 'file',
 *                  path: '/a/b/hello.pdf',
 *                  size: 4984457
 *                }
 *              }
 *            },
 *            'image.jpg': {
 *              type: 'file',
 *              path: '/a/image.jpg',
 *              size: 24563
 *            },
 *          }
 *        },
 *        'test.txt': {
 *          type: 'file',
 *          path: '/test.txt',
 *          size: 104
 *        },
 *      }
 *    }
 * }
 *
 * @param {string} input Puzzle input.
 * @returns Puzzle input in data structure.
 */
export const parseInput = (input) => {
  const system = {
    "/": {
      type: "dir",
      path: "/",
      children: {},
    },
  };

  const commandGroups = input
    .split("$")
    .filter((commandGroup) => commandGroup !== "")
    .map((commandGroup) => commandGroup.trim());

  let currentDir = system["/"];

  commandGroups.forEach((commandGroup) => {
    const lines = commandGroup.split(/\n/);
    const [command, ...output] = lines;
    const [part1, part2] = command.split(" ");

    if (part1 === "cd") {
      if (part2 === "/") {
        currentDir = system["/"];
      } else if (part2 === "..") {
        currentDir = currentDir.parent;
      } else {
        currentDir = currentDir.children[part2];
      }
    } else if (part1 === "ls") {
      output.forEach((item) => {
        const [details, newPath] = item.split(" ");
        const path =
          currentDir.path === "/"
            ? `/${newPath}`
            : `${currentDir.path}/${newPath}`;

        if (details === "dir") {
          if (!currentDir.children[newPath]) {
            currentDir.children[newPath] = {
              type: "dir",
              path,
              parent: currentDir,
              children: {},
            };
          }
        } else {
          if (!currentDir.children[newPath]) {
            currentDir.children[newPath] = {
              type: "file",
              path,
              parent: currentDir,
              size: parseInt(details, 10),
            };
          }
        }
      });
    } else {
      throw new Error("Invalid command!");
    }
  });

  return system;
};
