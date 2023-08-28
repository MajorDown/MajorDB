const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

function checkDbModel(type) {
  const checkerName = "checkDbModel";
  // CHECK DU FICHIER `<type>.MODEL.js`
  const filePath = path.join(
    process.cwd(),
    "majorDB",
    type,
    `${type}.MODEL.js`
  );
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.MODEL.js` S'IL N'EXISTE PAS ENCORE
    checkLog(
      checkerName,
      `le fichier "${type}.MODEL.js" n'existe pas. Création en cours...`
    );
    fs.writeFileSync(
      filePath,
      `const ${type}MODEL = {}; module.exports = ${type}MODEL;`
    );
    checkLog(
      checkerName,
      `le fichier "${type}.MODEL.js" à été créé. Veuillez l'implémenter pour le rendre utilisable.`
    );
    return checkResult(
      "ok",
      `le fichier "${type}.MODEL.js" à été créé. Veuillez l'implémenter pour le rendre utilisable`
    );
  } else {
    // SI LE FICHIER EST DEJA CREE
    return checkResult("ok", `le fichier "${type}.MODEL.js" existe.`);
  }
}

module.exports = checkDbModel;
// CHECK L'EXISTENCE DU FICHIER MODEL CORESPONDANT AU TYPE DEMANDE
