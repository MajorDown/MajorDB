const path = require("path");
const fs = require("fs");

function checkLog(functionName, message) {
  // AFFICHAGE SUR LA CONSOLE
  const checkMessage = functionName + " ~> " + message;
  console.log("majorDB ~>", checkMessage);
  // AFFICHAGE DANS LE JOURNAL
  const date = new Date();
  const year = date.getFullYear(); // AAAA
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // MM (de 01 à 12)
  const day = date.getDate().toString().padStart(2, "0"); // DD
  const hours = date.getHours().toString().padStart(2, "0"); // HH
  const minutes = date.getMinutes().toString().padStart(2, "0"); // MM
  const seconds = date.getSeconds().toString().padStart(2, "0"); // SS
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0"); // MMM
  const checkTime = `${year}.${month}.${day}/${hours}:${minutes}:${seconds}.${milliseconds}`;
  const logReport = { time: checkTime, message: checkMessage };
}

module.exports = checkLog;
