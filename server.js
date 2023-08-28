const checkDbPath = require("./src/checkers/checkDbPath");
const checkDbFile = require("./src/checkers/checkDbFile");
const checkDbModel = require("./src/checkers/checkDbModel");

function go() {
  console.log(checkDbPath("user"));
  console.log(checkDbFile("user"));
  console.log(checkDbModel("user"));
}

go();
