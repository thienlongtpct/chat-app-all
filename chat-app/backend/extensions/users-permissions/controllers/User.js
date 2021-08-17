const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  /**
   * Retrieve user records.
   * @return {Object|Array}
   */
  async find(ctx, next, { populate } = {}) {
    let users;
    ctx.set(
      "Content-Range",
      await strapi.query("user", "users-permissions").count({})
    );
    if (_.has(ctx.query, "_q")) {
      // use core strapi query to search for users
      users = await strapi
        .query("user", "users-permissions")
        .search(ctx.query, populate);
    } else {
      users = await strapi.plugins["users-permissions"].services.user.fetchAll(
        ctx.query,
        populate
      );
    }

    const data = users.map(({ username }) => username).slice(0, 5);
    ctx.send(data);
  },
};
