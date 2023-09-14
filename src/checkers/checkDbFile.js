const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

const checkDbFile = (type) => {
  // VERIFICATION DU DOSSIER MAJORDB
  const majorDBPath = path.join(process.cwd(), "majorDB");
  if (!fs.existsSync(majorDBPathPath)) {
    checkLog("checkDbFile", `Il n'existe pas dossier "majorDB"`);
    return checkResult("err", `Il n'existe pas de dossier "majorDB"`);
  }
  // VERIFICATION DU DOSSIER TYPE
  const folderPath = path.join(majorDBPath, type);
  if (!fs.existsSync(majorDBPathPath)) {
    checkLog(`checkDbFile`, `Il n'existe pas dossier "${type}"`);
    return checkResult("err", `Il n'existe pas de dossier "${type}"`);
  }
  // VERIFICATION DU FICHIER DB
  const filePath = path.join(folderPath, `${type}.DB.json`);
  if (!fs.existsSync(filePath)) {
    checkLog(`checkDbFile`, `Il n'existe pas de DB pour ${type}`);
    return checkResult("err", `Il n'existe pas de DB pour ${type}`);
  } else return checkResult("ok", `le fichier ${type}.DB.json existe`);
};

module.exports = checkDbFile;
