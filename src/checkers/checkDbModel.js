// CHECK L'EXISTENCE DU FICHIER MODEL CORESPONDANT AU TYPE DEMANDE
const path = require("path");
const fs = require("fs");

function checkDbModel(type) {
  // CHECK DU FICHIER `<type>.MODEL.js`
  const filePath = path.join(
    process.cwd(),
    "MajorDB",
    type,
    `${type}.MODEL.js`
  );
  if (!fs.existsSync(filePath)) {
    // CREATION DU FICHIER `<type>.MODEL.js` S'IL N'EXISTE PAS ENCORE
    fs.writeFileSync(
      filePath,
      `const ${type}MODEL = {}; module.export = ${type}MODEL;`
    );
    console.log(`Nouveau fichier créé : ${type}.MODEL.js`);
    return {
      status: `ok : création de ${type}.MODEL.js effectué. Veuillez remplir le model selon vos besoins`,
    };
  } else {
    // SI LE FICHIER EST DEJA CREE
    return { status: `ok : fichier ${type}.MODEL.js existant` };
  }
}

module.exports = checkDbModel;
