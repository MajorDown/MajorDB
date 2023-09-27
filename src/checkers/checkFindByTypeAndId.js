const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

const checkFindByTypeAndId = (dbType, id) => {
  // RECUPERATION DE LA DB
  const dbPath = path.join(
    process.cwd(),
    "majorDB",
    dbType,
    `${dbType}.DB.json`
  );
  const db = require(dbPath);
  // CHECK DE LA DATA
  if (!db) {
    checkLog(
      "checkFindByTypeAndId",
      `la DB de type ${dbType} existe mais ne contient aucune donnée`
    );
    return checkResult(
      "err",
      `la DB de type ${dbType} existe mais ne contient aucune donnée`
    );
  }
  // CHECK ET ENVOI DE L'ID SI TROUVE
  const data = db.find((object) => object.id === id);
  if (!data) {
    checkLog(
      "checkFindByTypeAndId",
      `l'id ${id} n'a pas été trouvé dans la db de type ${dbType}`
    );
    return checkResult(
      "err",
      `l'id ${id} n'a pas été trouvé dans la db de type ${dbType}`
    );
  } else return checkResult("ok", "id supprimé", data);
};

module.exports = checkFindByTypeAndId;
