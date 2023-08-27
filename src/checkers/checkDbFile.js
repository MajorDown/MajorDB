// CHECK L'EXISTENCE DU FICHIER DB CORESPONDANT AU TYPE DEMANDE
const path = require("path");
const fs = require("fs");

function checkDbFile(type) {
  // CHECK DU FICHIER `<type>.DB.js`
  const filePath = path.join(process.cwd(), "majorDB", type, `${type}.DB.js`);
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.DB.js` S'IL N'EXISTE PAS ENCORE
    fs.writeFileSync(
      filePath,
      `const ${type}DB = []; module.export = ${type}DB;`
    );
    console.log(`Nouveau fichier créé : ${type}.DB.js`);
    return { status: `ok : création de ${type}.DB.js effectué` };
  } else {
    // SI LE FICHIER EST DEJA CREE
    return { status: `ok : fichier ${type}.DB.js déjà existant` };
  }
}

module.exports = checkDbFile;
