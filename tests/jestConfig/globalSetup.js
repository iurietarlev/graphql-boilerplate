require("babel-register");
require("@babel/polyfill/noConflict");

const server = require("../../src/server").default;

module.exports = async () => {
  global.httpServer = await server.listen({ port: 4000 });
};
