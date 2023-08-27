// CHECK L'EXISTENCE DU PATH VER LE TYPE DEMANDE
const path = require("path");
const fs = require("fs");

function checkDbPath(type) {
  // CHECK DU DOSSIER `majorDB` A LA RACINE DU PROJET
  const majorDbPath = path.join(process.cwd(), "majorDB");
  if (!fs.existsSync(majorDbPath)) {
    console.log(`err: le dossier "majorDB" est introuvable`);
    return { status: "err: le dossier 'majorDB' est introuvable" };
  }
  // CHECK DU DOSSIER `<type>`
  const typePath = path.join(majorDbPath, type);
  if (!fs.existsSync(typePath)) {
    console.log(`err: le dossier ${type} est introuvable`);
    return { status: `err: le dossier ${type} est introuvable` };
  }
  return {
    status: "ok : le chemin vers la DB est opérationnel",
  };
}

module.exports = checkDbPath;
