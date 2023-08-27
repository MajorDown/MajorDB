const userMODEL = {
  name: { type: "string", required: true, unique: true },
  age: { type: "number", required: true, unique: false },
};

module.exports = userMODEL;
