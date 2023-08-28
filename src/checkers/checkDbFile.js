const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

function checkDbFile(type) {
  const checkerName = "checkDbFile";
  // CHECK DU FICHIER `<type>.DB.js`
  const filePath = path.join(process.cwd(), "majorDB", type, `${type}.DB.js`);
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.DB.js` S'IL N'EXISTE PAS ENCORE
    checkLog(
      checkerName,
      `le fichier "${type}.DB.js" n'existe pas. Création en cours...`
    );
    fs.writeFileSync(
      filePath,
      `const ${type}DB = []; module.exports = ${type}DB;`
    );
    checkLog(checkerName, `le fichier "${type}.DB.js" à été créé.`);

    return checkResult("ok", `le fichier "${type}.DB.js" à été créé`);
  } else {
    // SI LE FICHIER EST DEJA CREE
    return checkResult("ok", `le fichier "${type}.DB.js" existe`);
  }
}

module.exports = checkDbFile;
// CHECK L'EXISTENCE DU FICHIER DB CORESPONDANT AU TYPE DEMANDE
