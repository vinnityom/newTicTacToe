export const makeEmptyGameField = size => Array(size).fill()
  .map(() => Array(size).fill(null));

export const makeStep = (row, cell, field, sign) => {
  const newField = field.slice();
  newField[row][cell] = sign;
  return newField;
};

export const isCellTaken = (row, cell, field) => !!field[row][cell];

export const isGameOver = (field, fieldSize, sign) => {
  for (let x = 0; x < fieldSize; x += 1) {
    let horizontal = true;
    let vertical = true;
    for (let y = 0; y < fieldSize; y += 1) {
      horizontal = horizontal && field[x][y] === sign;
      vertical = vertical && field[y][x] === sign;
    }
    if (horizontal || vertical) {
      return true;
    }
  }

  let diagonalUp = true;
  let diagonalDown = true;

  for (let i = 0; i < fieldSize; i += 1) {
    diagonalDown = diagonalDown && field[i][i] === sign;
    diagonalUp = diagonalUp && field[fieldSize - 1 - i][i] === sign;
  }

  return diagonalUp || diagonalDown;
};

export const isTie = (movesCounter, fieldSize) => movesCounter === (fieldSize ** 2);
