// CHECK L'EXISTENCE DU PATH VER LE TYPE DEMANDE
const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");

function checkDbPath(type) {
  // CHECK DU DOSSIER `majorDB` A LA RACINE DU PROJET
  const majorDbPath = path.join(process.cwd(), "majorDB");
  if (!fs.existsSync(majorDbPath)) {
    console.log(`le dossier "majorDB" n'existe pas. création en cours...`);
    fs.mkdir(process.cwd() + "/majorDB", (err) => {
      if (err) {
        console.log(err);
        return { status: "err", message: err };
      }
    });
    console.log('le dossier "majorDB" à été créé');
  }
  // CHECK DU DOSSIER `<type>`
  const typePath = path.join(majorDbPath, type);
  if (!fs.existsSync(typePath)) {
    console.log(`le dossier ${type} n'existe pas. création en cours...`);
    fs.mkdir(process.cwd() + `/majorDB/${type}`, (err) => {
      if (err) {
        console.log(err);
        return { status: "err", message: err };
      }
    });
    console.log(`le dossier ${type} à été créé`);
  }
  return checkResult(
    "ok",
    "le répertoire pour contenir la db est opérationnel"
  );
}

module.exports = checkDbPath;
