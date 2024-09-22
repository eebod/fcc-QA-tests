class SudokuSolver {
  validate(puzzleString) {}

  letterToNumber(row) {
    return row.toUpperCase().charCodeAt(0) - 64;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    if (grid[row - 1][column - 1] !== 0) {
      return true;
    }
    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    if (grid[row - 1][column - 1] !== 0) {
      return true;
    }
    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    if (grid[row - 1][col - 1] !== 0) {
      return true;
    }
    let startRow = row - (row % 3),
      startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == value) return false;
    return true;
  }

  solveSuduko(grid, row, col) {
    const N = 9;

    if (row == N - 1 && col == N) return grid;

    if (col == N) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) return this.solveSuduko(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSuduko(grid, row, col + 1)) return grid;
      }

      grid[row][col] = 0;
    }
    return false;
  }

  isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;
    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    let startRow = row - (row % 3),
      startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let row = -1;
    let col = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++;
      }
      if (col % 9 == 0) {
        col = 0;
      }

      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  transformBack(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    let grid = this.transform(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) {
      return false;
    }
    let solvedString = this.transformBack(solved);
    return solvedString;
  }
}

module.exports = SudokuSolver;