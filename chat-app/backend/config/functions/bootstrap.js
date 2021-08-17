/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  // eslint-disable-next-line global-require
  const io = require("socket.io")(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("login", async ({ username }) => {
      const user = await strapi.query('user', 'users-permissions').findOne({ username }, ['rooms']);
      await strapi.query('user', 'users-permissions').update({ id: user.id }, { ...user, isOnline: true });
      console.log(`Login ${username}`);
      socket.emit("newLogin", { username });
    });
    socket.on("logout", async ({ username }) => {
      const user = await strapi.query('user', 'users-permissions').findOne({ username }, ['rooms']);
      await strapi.query('user', 'users-permissions').update({ id: user.id }, { ...user, isOnline: false });
      console.log(`Logout ${username}`);
      socket.emit("newLogin", { username });
    });
  });
};
