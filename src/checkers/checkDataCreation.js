const path = require("path");
const fs = require("fs");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

function checkDataCreation(type, object, objectKey) {
  try {
    const dbPath = path.join(process.cwd(), "majorDB", type, `${type}.DB.json`);
    const db = require(dbPath);
    // SI LA DB EST UN ARRAY
    if (Array.isArray(db)) {
      db.push(object);
      // SI LA DB EST UN OBJET
    } else if (typeof db === "object" && db !== null) {
      let keyToUse = "";
      if (objectKey) keyToUse = objectKey;
      else {
        checkLog(
          "checkDataCreation",
          "la DB est de type 'object'. Génération d'une nouvelle key..."
        );
        keyToUse = object.id;
      }
      db[keyToUse] = object;
      // SI LA DB N'EST NI UN ARRAY NI UN OBJET
    } else {
      throw new Error(
        `La DB de type ${type} n'est pas dans un format valide (array ou object)`
      );
    }
    // QUAND LA DB EST ACTUALISE, LA REECRIRE
    const dbJSON = JSON.stringify(db, null, 2);
    fs.writeFileSync(dbPath, dbJSON);
    checkLog("checkDataCreation", "La DB a été actualisée avec succès");
    return checkResult("ok", "La DB a été actualisée avec succès");
  } catch (err) {
    checkLog("checkDataCreation", err);
    return checkResult("err", err);
  }
}

module.exports = checkDataCreation;
