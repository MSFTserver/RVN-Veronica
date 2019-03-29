`use strict`;
const Discord = require(`discord.js`);
let { addAliases, pluginHandler } = require(`./handlers/plugin-handler.js`);
let { eventHandler } = require(`./handlers/event-handler.js`);
let { errorHandler } = require(`./handlers/err-handler.js`);
let { cmdHandler } = require(`./handlers/cmd-handler.js`);
let { dbConnect } = require(`./helpers/db-helper.js`);
let { token } = require(`config`).get(`bot`);
start();
async function start() {
  await dbConnect(); //connect to mongodb
  var bot = new Discord.Client(); //creates the discord client
  await pluginHandler(bot); //load plugins
  await cmdHandler(bot); //load commands json
  await addAliases(); //load aliases for commands
  await eventHandler(bot); // handles events eg. `ready`,`message`
  await errorHandler(process, bot); // handles errors eg. `error`,`disconnect`
  await bot.login(token); // login the bot to discord
}
