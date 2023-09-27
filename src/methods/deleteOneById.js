const checkLog = require("../checkers/checkLog");
const checkDbFile = require("../checkers/checkDbFile");
const checkFindByTypeAndId = require("../checkers/checkFindByTypeAndId");
const checkDeleteByTypeAndId = require("../checkers/checkDeleteByTypeAndId");

const deleteOneById = (dbType, id) => {
  checkLog(
    "deleteOneById",
    `Suppression de ${id} dans la DB de type ${dbType}...`
  );
  // VERIFICATION DU PATH ET DU FICHIER NECESSAIRE
  const dbFile = checkDbFile(dbType);
  if (dbFile.status === "err") return dbFile;
  // SUPPRESSION DES DONNEES
  const dataSuppression = checkDeleteByTypeAndId(dbType, id);
  return dataSuppression;
};

module.exports = deleteOneById;
