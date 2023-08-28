const path = require("path");
const fs = require("fs");
const checkLog = require("./checkLog");
const checkResult = require("./checkResult");

function checkDataCreation(type, object) {
  const checkerName = "checkDataCreation";
  try {
    const dbPath = path.join(process.cwd(), "majorDB", type, `${type}.DB.js`);
    const db = require(dbPath);
    db.push(object);
    const dbJSON = JSON.stringify(db, null, 2);
    fs.writeFileSync(
      dbPath,
      `const ${type}DB = ${dbJSON}; module.exports = ${type}DB;`
    );
    checkLog(checkerName, "la db à été actualisé avec succès");
    return checkResult("ok", "la db à été actualisé avec succès");
  } catch (err) {
    return checkResult("err", err);
  }
}

module.exports = checkDataCreation;
// AJOUT A LA DB L'OBJET RENSEIGNE
