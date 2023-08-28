// CHECK L'EXISTENCE DU FICHIER DB CORESPONDANT AU TYPE DEMANDE
const path = require("path");
const fs = require("fs");

function checkDbFile(type) {
  // CHECK DU FICHIER `<type>.DB.js`
  const filePath = path.join(process.cwd(), "majorDB", type, `${type}.DB.js`);
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.DB.js` S'IL N'EXISTE PAS ENCORE
    console.log(`le fichier ${type}.DB.js n'existe pas. Création en cours...`);
    fs.writeFileSync(
      filePath,
      `const ${type}DB = []; module.export = ${type}DB;`
    );
    console.log(`le fichier ${type}.DB.js à été créé.`);
    return { status: "ok", message: `le fichier ${type}.DB.js à été créé` };
  } else {
    // SI LE FICHIER EST DEJA CREE
    return {
      status: "ok",
      message: `le fichier ${type}.DB.js existe.`,
    };
  }
}

module.exports = checkDbFile;
