const path = require("path");

function checkModelMatch(type, object) {
  const dbPath = path.join(process.cwd(), "majorDB", type);
  const model = require(`${dbPath}/${type}.MODEL.js`);
  const db = require(`${dbPath}/${type}.DB.js`);
  // CHECK 1 : VERIFIER QUE CHAQUE KEY DE L'OBJET SOIT PRESENT DANS LE MODEL
  const objectProps = Object.keys(object);
  const modelProps = Object.keys(model);
  for (const prop of objectProps) {
    if (!modelProps.includes(prop)) {
      console.log(`La propriété ${prop} n'existe pas dans le modèle.`);
      return {
        status: "err",
        message: `La propriété ${prop} n'existe pas dans le modèle.`,
      };
    }
  }
  // CHECK 2 : VERIFIER QUE LE TYPE DE CHAQUE KEY CORESPOND AU MODEL
  for (const prop of objectProps) {
    const objectPropType = typeof object[prop];
    const modelPropType = model[prop].type;
    if (objectPropType !== modelPropType) {
      console.log(
        `Le type de la propriété ${prop} ne correspond pas au modèle.`
      );
      return {
        status: "err",
        message: `Le type de la propriété ${prop} ne correspond pas au modèle.`,
      };
    }
  }
  // CHECK 3 : VERIFIER QUE CHAQUE KEY DU MODELE POSSEDANT REQUIRED=TRUE SOIT PRESENT DANS L'OBJET
  for (const prop of objectProps) {
    if (model[prop].required === true && object[prop] === undefined) {
      console.log(
        `La propriété ${prop} est requise mais n'existe pas dans l'objet.`
      );
      return {
        status: "err",
        message: `La propriété ${prop} est requise mais n'existe pas dans l'objet.`,
      };
    }
  }
  // CHECK 4 : VERIFIER QUE CHAQUE KEY DU MODELE POSSEDANT UNIQUE=TRUE NE SOIT PAS ENCORE PRESENT DANS LE TABLEAU
  for (const prop of objectProps) {
    if (model[prop].unique === true) {
      const allreadyExist = db.some((item) => item[prop] === object[prop]);
      if (allreadyExist) {
        console.log(
          `un objet avec la valeur de ${prop} existe déjà dans la db.`
        );
        return {
          status: "err",
          message: `un objet avec la valeur de ${prop} existe déjà dans la db.`,
        };
      }
    }
  }
  // SI l'OBJET EST CONFORME
  return {
    status: "ok",
    message: "objet conforme au modèle",
  };
}

module.exports = checkModelMatch;
