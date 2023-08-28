const path = require("path");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

function checkModelMatch(type, object) {
  const checkerName = "checkModelMatch";
  const dbPath = path.join(process.cwd(), "majorDB", type);
  const model = require(`${dbPath}/${type}.MODEL.js`);
  const db = require(`${dbPath}/${type}.DB.js`);
  // CHECK 1 : VERIFIER QUE CHAQUE KEY DE L'OBJET SOIT PRESENT DANS LE MODEL
  const objectProps = Object.keys(object);
  const modelProps = Object.keys(model);
  for (const prop of objectProps) {
    if (!modelProps.includes(prop)) {
      checkLog(
        checkerName,
        `La propriété ${prop} n'existe pas dans le modèle.`
      );
      return checkResult(
        "err",
        `La propriété ${prop} n'existe pas dans le modèle.`
      );
    }
  }
  // CHECK 2 : VERIFIER QUE LE TYPE DE CHAQUE KEY CORESPOND AU MODEL
  for (const prop of objectProps) {
    const objectPropType = typeof object[prop];
    const modelPropType = model[prop].type;
    if (objectPropType !== modelPropType) {
      checkLog(
        checkerName,
        `Le type de la propriété ${prop} ne correspond pas au modèle.`
      );
      return checkResult(
        "err",
        `Le type de la propriété ${prop} ne correspond pas au modèle.`
      );
    }
  }
  // CHECK 3 : VERIFIER QUE CHAQUE KEY DU MODELE POSSEDANT REQUIRED=TRUE SOIT PRESENT DANS L'OBJET
  for (const prop of objectProps) {
    if (model[prop].required === true && object[prop] === undefined) {
      checkLog(
        checkerName,
        `La propriété ${prop} est requise mais n'existe pas dans l'objet.`
      );
      return checkResult(
        "err",
        `La propriété ${prop} est requise mais n'existe pas dans l'objet.`
      );
    }
  }
  // CHECK 4 : VERIFIER QUE CHAQUE KEY DU MODELE POSSEDANT UNIQUE=TRUE NE SOIT PAS ENCORE PRESENT DANS LE TABLEAU
  for (const prop of objectProps) {
    if (model[prop].unique === true) {
      const allreadyExist = db.some((item) => item[prop] === object[prop]);
      if (allreadyExist) {
        checkLog(
          checkerName,
          `un objet avec la valeur de ${prop} existe déjà dans la db.`
        );
        return checkResult(
          "err",
          `un objet avec la valeur de ${prop} existe déjà dans la db.`
        );
      }
    }
  }
  // SI l'OBJET EST CONFORME
  return checkResult("ok", "objet conforme au modèle");
}

module.exports = checkModelMatch;
