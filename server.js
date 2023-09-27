const MajorDB = require("./src/MajorDB");

const object = {
  name: "ruru",
  age: 25,
};

const id = "MDB20230927203416111";

const test = MajorDB.deleteOneById("user", id);
console.log(test);
