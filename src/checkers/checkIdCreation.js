const checkLog = require("./checkLog");
const checkResult = require("./checkResult");

function checkIdCreation(object) {
  const checkerName = "checkIdCreation";
  // CREATION DE L'ID
  const date = new Date();
  const year = date.getFullYear(); // AAAA
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // MM (de 01 à 12)
  const day = date.getDate().toString().padStart(2, "0"); // DD
  const hours = date.getHours().toString().padStart(2, "0"); // HH
  const minutes = date.getMinutes().toString().padStart(2, "0"); // MM
  const seconds = date.getSeconds().toString().padStart(2, "0"); // SS
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0"); // MMM
  const newId = `ID${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  // IDENTIFICATION DE L'OBJET
  try {
    object.id = newId;
    checkLog(checkerName, "un nouvel id à été créé");
    return checkResult("ok", "un nouvel id à été créé", object);
  } catch (err) {
    return checkResult("err", err);
  }
}

module.exports = checkIdCreation;
