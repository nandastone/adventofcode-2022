import fs from "fs";

// const input = fs.readFileSync('./demo-input.txt').toString();
const input = fs.readFileSync('./input.txt').toString()

const pointsPerChoice = {
  'rock': 1,
  'paper': 2,
  'scissors': 3
}

const getChoiceFromRaw = (raw) => {
  const map = {
    'A': 'rock',
    'X': 'rock',
    'B': 'paper',
    'Y': 'paper',
    'C': 'scissors',
    'Z': 'scissors'
  }

  return map[raw]
}

const simulateRound = (a, b) => {
  if (a === b) {
    return 0
  }

  if (a === 'rock' && b === 'scissors') {
    return -1
  } else if (a === 'scissors' && b === 'rock') {
    return 1
  }

  if (a === 'paper' && b === 'rock') {
    return -1
  } else if (a === 'rock' && b === 'paper') {
    return 1
  }

  if (a === 'scissors' && b === 'paper') {
    return -1
  } else if (a === 'paper' && b === 'scissors') {
    return 1
  }

  throw new Error('Invalid game state, someone should have won.')
}

const games = input.split(/\n/);
const totalPoints = games.reduce((acc, curr) => {
  const [rawEnemy, rawYou] = curr.split(' ')

  const yourChoice = getChoiceFromRaw(rawYou)
  const enemyChoice = getChoiceFromRaw(rawEnemy)

  
  let points = pointsPerChoice[yourChoice]
  const winner = simulateRound(yourChoice, enemyChoice)

  if (winner === -1) {
    // 6 points for a victory
    points += 6
  } else if (winner === 0) {
    // 3 points for a draw
    points += 3
  } else {
    // No points for a loss.
  }

  return acc + points
}, 0)

console.log(totalPoints);
