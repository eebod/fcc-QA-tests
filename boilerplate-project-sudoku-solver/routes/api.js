'use strict';
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    if(puzzle.length !== 81){
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }

    const [row, column] = coordinate.split("");
    if (coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/i.test(column)) {
      return res.json({ error: "Invalid coordinate" });
    }
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }
    if (/[^0-9.]/g.test(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }


    const valid = [
      solver.checkRowPlacement(puzzle, row, column, value),
      solver.checkColPlacement(puzzle, row, column, value),
      solver.checkRegionPlacement(puzzle, row, column, value)
    ];
    const conflicts = valid.map((isValid, index) => isValid ? null : ["row", "column", "region"][index]).filter(Boolean);
    res.json({ valid: valid.every(Boolean), conflict: conflicts });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      return res.json({ error: "Required field missing" });
    }

    if (/[^0-9.]/g.test(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    if(puzzle.length !== 81){
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }

    let solvedString = solver.solve(puzzle);
    if (!solvedString) {
      return res.json({ error: "Puzzle cannot be solved" });
    }
    res.json({ solution: solvedString });
  });
};