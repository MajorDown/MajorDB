const path = require("path");
const fs = require("fs");
const checkDbFile = require("../checkers/checkDbFile");
const checkDbModel = require("../checkers/checkDbModel");
const checkDbPath = require("../checkers/checkDbPath");
const checkModelMatch = require("../checkers/checkModelMatch");
const methodResult = require("./methodResult");
const checkDataCreation = require("../checkers/checkDataCreation");
const checkIdCreation = require("../checkers/checkIdCreation");

const createFromModel = (dbType, newObject) => {
  const method = "createFromModel";
  // VERIFICATION DU PATH ET DES FICHIERS NECESSAIRES
  checkDbPath(dbType);
  checkDbFile(dbType);
  checkDbModel(dbType);
  // VERIFICATION DE LA CONFORMITE DE NEWOBJECT
  const modelMatch = checkModelMatch(dbType, newObject);
  if (modelMatch.status === "err") return methodResult(method, modelMatch);
  // AJOUT DE NEWOBJECT DANS LA DB APRES IDENTIFICATION
  const identifiedObject = checkIdCreation(newObject);
  if (identifiedObject.status === "err")
    return methodResult(method, identifiedObject);
  const dataCreation = checkDataCreation(dbType, identifiedObject.data);
  return methodResult(method, dataCreation);
};

module.exports = createFromModel;
