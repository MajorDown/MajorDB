const checkDbFile = require("../checkers/checkDbFile");
const checkDbModel = require("../checkers/checkDbModel");
const checkModelMatch = require("../checkers/checkModelMatch");
const checkIdCreation = require("../checkers/checkIdCreation");
const checkDataCreation = require("../checkers/checkDataCreation");
const checkLog = require("../checkers/checkLog");

const createFromModel = (dbType, newObject, newObjectKey) => {
  checkLog("createFromModel", "implémentation de la DB en cour...");
  // VERIFICATION DU PATH ET DES FICHIERS NECESSAIRES
  const dbFile = checkDbFile(dbType);
  if (dbFile.status === "err") return dbFile;
  // VERIFICATION DE L'EXISTENCE D'UN MODEL POUR LA DB
  const dbModel = checkDbModel(dbType);
  if (dbModel.status === "true") {
    // VERIFICATION DE LA CONFORMITE DE NEWOBJECT PAR RAPPORT AU MODEL
    const modelMatch = checkModelMatch(dbType, newObject);
    if (modelMatch.status === "err") return modelMatch;
  }
  // IDENTIFICATION DE NEWOBJECT
  const objectIdentification = checkIdCreation(newObject);
  if (objectIdentification.status === "err") return objectIdentification;
  const objectwithId = objectIdentification.data;
  // AJOUT DE OBJECTITHID DANS LA DB APRES IDENTIFICATION
  const dataCreation = checkDataCreation(dbType, objectwithId, newObjectKey);
  if (dataCreation.status === "err") return dataCreation;
  else {
    dataCreation[data] = objectwithId;
    return dataCreation;
  }
};

module.exports = createFromModel;
