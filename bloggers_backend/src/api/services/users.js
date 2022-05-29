const env = "development";
const config = require("../../../knexfile.js")[env];
const knex = require("knex")(config);

const getUsers = async () => {
  return await knex("users").select("id", "first_name", "last_name", "username", "password");
};

module.exports = getUsers;
