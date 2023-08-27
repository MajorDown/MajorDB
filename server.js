const checkModelMatch = require("./src/checkers/checkModelMatch");

const obj = {
  name: "pedro",
  age: 30,
};

console.log(checkModelMatch("user", obj));
