/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const { name } = ctx.request.body;
    const room = {
      ...ctx.request.body,
      name,
      users: [ctx.state.user.id],
      messages: [],
    };
    const entity = await strapi.services.room.create(room);
    return sanitizeEntity(entity, { model: strapi.models.room });
  },
};
