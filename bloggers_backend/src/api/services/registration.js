const env = process.env.NODE_ENV || "development";
const config = require("../../../knexfile.js")[env];
const knex = require("knex")(config);

const postRegistration = async (user) => {
  return await knex("users").insert({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    password: user.password,
  });
};

module.exports = postRegistration;
