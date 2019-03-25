`use strict`;
const Discord = require(`discord.js`);
const mongoose = require(`mongoose`);
let _ = require(`underscore-node`);
let moment = require(`moment-timezone`);
let fs = require(`fs`);
let { checkMessageForCommand } = require("./cmd-handler.js");
let config = require(`config`);
let logChannel = config.get(`moderation`).logchannel;
let pm2Name = config.get(`General`).pm2Name;
let mongoURL = config.get(`General`).mongoURL;
config = config.get(`bot`);
mongoose
  .connect(mongoURL, { useNewUrlParser: !0, useCreateIndex: !0 })
  .then(() => {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    console.log(`[${time} PST][${pm2Name}] Mongodb Connection Successful`);
  })
  .catch(err => {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    console.log(`[${time} PST][${pm2Name}] Mongodb Connection Error:, ${err}`);
  });
const commandsV2 = require(`./modules/commandsV2.js`);
require(`./db-models/pm2.js`);
require(`./db-models/user.js`);
require(`./db-models/timeout.js`);
var aliases;
try {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  aliases = require(`./alias.json`);
  console.log(
    `[${time} PST][${pm2Name}]` +
      ` ${Object.keys(aliases).length} aliases Loaded!`
  );
} catch (e) {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(`[${time} PST][${pm2Name}] No aliases defined`);
}
var commands = {};
var bot = new Discord.Client();
bot.on(`ready`, function() {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(
    `[${time} PST][${pm2Name}]` +
      ` Logged in! Serving in ${bot.guilds.array().length} servers`
  );
  bot.channels
    .get(logChannel)
    .send(
      `[${time} PST][${pm2Name}]` +
        ` Logged in! Serving in ${bot.guilds.array().length} servers`
    );
  require(`./plugins.js`).init();
  bot.user.setActivity(`${config.prefix}help`);
  bot.channels
    .get(logChannel)
    .send(`[${time} PST][${pm2Name}] Bot Activated :rocket:`);
});
commandsV2.init(bot);
bot.on(`message`, msg =>
  checkMessageForCommand(msg, bot, commands, aliases, !1)
);
bot.on(`messageUpdate`, (oldMessage, newMessage) => {
  checkMessageForCommand(newMessage, bot, commands, aliases, !0);
});
exports.addCommand = function(commandName, commandObject) {
  try {
    commands[commandName] = commandObject;
  } catch (err) {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    console.log(`[${time} PST][${pm2Name}] Error addCommand: ${err}`);
    bot.channels
      .get(logChannel)
      .send(`[${time} PST][${pm2Name}] Error addCommand: ${err}`);
  }
};
exports.addCustomFunc = function(customFunc) {
  try {
    customFunc(bot);
  } catch (err) {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    console.log(`[${time} PST][${pm2Name}] Error addCustomFunc: ${err}`);
    bot.channels
      .get(logChannel)
      .send(`[${time} PST][${pm2Name}] Error addCustomFunc: ${err}`);
  }
};
exports.commandCount = function(err) {
  return Object.keys(commands).length;
};
process.on(`uncaughtException`, err => {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(`[${time} PST][${pm2Name}] uncaughtException: ${err}`);
  bot.channels
    .get(logChannel)
    .send(`[${time} PST][${pm2Name}] uncaughtException: ${err}`);
  process.exit(1);
});
process.on(`unhandledRejection`, err => {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(`[${time} PST][${pm2Name}] unhandledRejection: ${err}`);
  bot.channels
    .get(logChannel)
    .send(`[${time} PST][${pm2Name}] unhandledRejection: ${err}`);
  process.exit(1);
});
bot.on(`disconnected`, function() {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(`[${time} PST][${pm2Name}] Disconnected!`);
  process.exit(1);
});
bot.on(`error`, function(error) {
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(`[${time} PST][${pm2Name}] error: ${error}`);
  process.exit(1);
});
bot.login(config.token);
