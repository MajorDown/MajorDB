const userMODEL = {
  name: { type: "string", required: true, unique: true },
  age: { type: "number" },
};
module.exports = userMODEL;
