const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

const checkDeleteByTypeAndId = (dbType, id) => {
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
      "checkDeleteByTypeAndId",
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
      "checkDeleteByTypeAndId",
      `l'id ${id} n'a pas été trouvé dans la db de type ${dbType}`
    );
    return checkResult(
      "err",
      `l'id ${id} n'a pas été trouvé dans la db de type ${dbType}`
    );
  } else {
    const newDb = db.filter((objet) => objet.id !== id);
    const dbJSON = JSON.stringify(newDb, null, 2);
    fs.writeFileSync(dbPath, dbJSON);
    return checkResult(
      "ok",
      `l'id ${id} a été supprimé de la db de type ${dbType}`
    );
  }
};

module.exports = checkDeleteByTypeAndId;
