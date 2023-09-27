const findOneById = require("./methods/FindOneById");
const createFromModel = require("./methods/createFromModel");
const deleteOneById = require("./methods/deleteOneById");

const MajorDB = {
  createFromModel: createFromModel,
  findById: findOneById,
  findAllBy: "",
  findAllWithout: "",
  deleteOneById: deleteOneById,
  deleteOneby: "",
  updateOneById: "",
};

module.exports = MajorDB;
