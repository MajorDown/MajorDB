const path = require("path");
const fs = require("fs");
const checkLog = require("./checkLog");

const checkDbModel = (type) => {
  const filePath = path.join(
    process.cwd(),
    "majorDB",
    type,
    `${type}.MODEL.json`
  );
  // SI IL N'EXISTE PAS DE MODEL POUR LA DB
  if (!fs.existsSync(filePath)) {
    checkLog(`checkDbModel`, `Il n'existe pas de MODEL pour ${type}`);
    return checkResult("false", `Il n'existe pas de MODEL pour ${type}`);
  } else return checkResult("true", `le fichier ${type}.MODEL.json existe`);
};

module.exports = checkDbModel;
