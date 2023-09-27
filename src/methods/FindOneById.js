const checkLog = require("../checkers/checkLog");
const checkDbFile = require("../checkers/checkDbFile");
const checkFindByTypeAndId = require("../checkers/checkFindByTypeAndId");

const FindOneById = (dbType, id) => {
  checkLog("FindById", `Recherche de ${id} dans la DB de type ${dbType}...`);
  // VERIFICATION DU PATH ET DU FICHIER NECESSAIRE
  const dbFile = checkDbFile(dbType);
  if (dbFile.status === "err") return dbFile;
  // RECUPERATION DES DONNEES
  const dataSearch = checkFindByTypeAndId(dbType, id);
  return dataSearch;
};

module.exports = FindOneById;
