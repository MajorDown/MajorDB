// CHECK L'EXISTENCE DU PATH VER LE TYPE DEMANDE
const path = require("path");
const fs = require("fs");
const checkResult = require("./checkersTools/checkResult");
const checkLog = require("./checkersTools/checkLog");

function checkDbPath(type) {
  const checkerName = "checkDbPath";
  // CHECK DU DOSSIER `majorDB` A LA RACINE DU PROJET
  const majorDbPath = path.join(process.cwd(), "majorDB");
  if (!fs.existsSync(majorDbPath)) {
    checkLog(
      checkerName,
      `le dossier "majorDB" n'existe pas. création en cours...`
    );
    fs.mkdir(process.cwd() + "/majorDB", (err) => {
      if (err) {
        checkLog(checkerName, err);
        return checkResult("err", err);
      }
    });
    checkLog(checkerName, 'le dossier "majorDB" à été créé');
  }
  // CHECK DU DOSSIER `<type>`
  const typePath = path.join(majorDbPath, type);
  if (!fs.existsSync(typePath)) {
    checkLog(
      checkerName,
      `le dossier "${type}" n'existe pas. création en cours...`
    );
    fs.mkdir(process.cwd() + `/majorDB/${type}`, (err) => {
      if (err) {
        checkLog(checkerName, err);
        return checkResult("err", err);
      }
    });
    checkLog(checkerName, `le dossier "${type}" à été créé`);
  }
  return checkResult(
    "ok",
    "le répertoire pour contenir la db est opérationnel"
  );
}

module.exports = checkDbPath;
