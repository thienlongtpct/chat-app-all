const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async addMessage(ctx) {
    const { id, content } = ctx.request.body;
    const [room] = await strapi.services.room.find({ id });

    if (!room || room.users.every((user) => user.id !== ctx.state.user.id)) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const message = await strapi.services.message.create({
      content,
      room: id,
      user: ctx.state.user.id,
    });
    room.messages.push(message);

    const entity = await strapi.services.room.update({ id }, room);
    return sanitizeEntity(entity, { model: strapi.models.room });
  },
};
