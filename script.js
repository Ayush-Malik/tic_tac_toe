var player = 1;

document.getElementById("reset").addEventListener("click", reset);
for (var i = 0; i < 3; ++i)
  for (var j = 0; j < 3; ++j)
    document.getElementById(i + "," + j).addEventListener("click", makeMove);

const grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function makeMove(e) {
  var r = e.currentTarget.id[0];
  var c = e.currentTarget.id[2];

  if (grid[r][c] != "") return;

  grid[r][c] = player ? "X" : "O";

  e.currentTarget.textContent = grid[r][c];

  if (gameIsEnded(grid)) {
    freezeGrid(grid);
    var new_li = document.createElement("li");
    var player_type = player ? "X" : "O";
    new_li.textContent = player_type + " wins";
    document.getElementById("dataDisplayer").appendChild(new_li);
    return;
  }

  var emptyCells = 0;
  for (var r = 0; r < 3; ++r)
    for (var c = 0; c < 3; ++c) emptyCells += grid[r][c] == "";

  if (emptyCells == 0) {
    var new_li = document.createElement("li");
    new_li.textContent = "Game Tied";
    document.getElementById("dataDisplayer").appendChild(new_li);
    return;
  }

  player = !player;
}

function freezeGrid(grid) {
  for (var r = 0; r < 3; ++r) for (var c = 0; c < 3; ++c) grid[r][c] = ".";
}

function gameIsEnded(grid) {
  for (var r = 0; r < 3; ++r)
    if (
      grid[r][0] != "" &&
      grid[r][0] == grid[r][1] &&
      grid[r][1] == grid[r][2]
    )
      return true;

  for (var c = 0; c < 3; ++c)
    if (
      grid[0][c] != "" &&
      grid[0][c] == grid[1][c] &&
      grid[1][c] == grid[2][c]
    )
      return true;

  var main_diagonal =
    grid[0][0] != "" && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2];
  var anti_diagonal =
    grid[0][2] != "" && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0];

  return main_diagonal || anti_diagonal;
}

function reset(e) {
  for (var i = 0; i < 3; ++i)
    for (var j = 0; j < 3; ++j)
      (grid[i][j] = ""),
        (document.getElementById(i + "," + j).textContent = grid[i][j]);

  var li = document.getElementById("dataDisplayer").childNodes[1];
  if (li) li.remove();
}
