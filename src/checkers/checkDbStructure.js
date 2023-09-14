const path = require("path");
const checkResult = require("./checkResult");
const checkLog = require("./checkLog");

const checkDbStructure = (type) => {
  const dbPath = path.join(process.cwd(), "majorDB", type);
  const db = require(`${dbPath}/${type}.DB.json`);
  // SI LA DB EST DE TYPE ARRAY
  if (Array.isArray(db)) {
    return checkResult("array", `la DB de type ${type} est un tableau`);
    // SI LA DB EST DE TYPE OBJECT
  } else if (typeof db === "object" && db !== null) {
    return checkResult("object", `la DB de type ${type} est un objet`);
    // SI LA DB N'EST NI UN ARRAY NI UN OBJECT
  } else {
    checkLog(
      "checkDbStructure",
      `la DB de type ${type} n'est pas dans un format valide (array ou object)`
    );
    return checkResult(
      "null",
      `la DB de type ${type} n'est pas dans un format valide (array ou object)`
    );
  }
};

module.exports = checkDbStructure;
