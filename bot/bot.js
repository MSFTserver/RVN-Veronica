`use strict`;
const Discord = require(`discord.js`);
let { addAliases } = require(`./handlers/cmd-handler.js`);
let { pluginHandler } = require(`./handlers/plugin-handler.js`);
let { eventHandler } = require(`./handlers/event-handler.js`);
let { errorHandler } = require(`./handlers/err-handler.js`);
let { helpfulHandler } = require(`./handlers/helpful-handler.js`);
let { dbConnect } = require(`./helpers/db-helper.js`);
let { token } = require(`config`).get(`bot`);
start();
async function start() {
  await dbConnect(); //connect to mongodb
  var bot = new Discord.Client(); //creates the discord client
  pluginHandler(bot); //load commands
  helpfulHandler(bot); //load helpful commands json
  addAliases(); //load aliases for commands
  eventHandler(bot); // handles events eg. `ready`,`message`
  errorHandler(process, bot); // handles errors eg. `error`,`disconnect`
  bot.login(token); // login the bot to discord
}
