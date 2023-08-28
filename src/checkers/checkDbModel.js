// CHECK L'EXISTENCE DU FICHIER MODEL CORESPONDANT AU TYPE DEMANDE
const path = require("path");
const fs = require("fs");

function checkDbModel(type) {
  // CHECK DU FICHIER `<type>.MODEL.js`
  const filePath = path.join(
    process.cwd(),
    "majorDB",
    type,
    `${type}.MODEL.js`
  );
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.MODEL.js` S'IL N'EXISTE PAS ENCORE
    console.log(
      `le fichier ${type}.MODEL.js n'existe pas. Création en cours...`
    );
    fs.writeFileSync(
      filePath,
      `const ${type}MODEL = {}; module.export = ${type}MODEL;`
    );
    console.log(`le fichier ${type}.MODEL.js à été créé.`);
    return { status: "ok", message: `le fichier ${type}.MODEL.js à été créé` };
  } else {
    // SI LE FICHIER EST DEJA CREE
    return {
      status: "ok",
      message: `le fichier ${type}.MODEL.js existe.`,
    };
  }
}

module.exports = checkDbModel;
