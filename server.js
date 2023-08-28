const checkDbPath = require("./src/checkers/checkDbPath");
const checkDbFile = require("./src/checkers/checkDbFile");
const checkDbModel = require("./src/checkers/checkDbModel");

async function go() {
  const dbPath = await checkDbPath("user");
  const dbFile = await checkDbFile("user");
  const dbModel = await checkDbModel("user");
  console.log(dbPath);
  console.log(dbFile);
  console.log(dbModel);
}

go();
