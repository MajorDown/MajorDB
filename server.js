const MajorDB = require("./src/MajorDB");

const object = {
  name: "riri",
  age: "21",
};

const test = MajorDB.createFromModel("user", object);
console.log(test);
