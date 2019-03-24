`use strict`;
const Discord = require(`discord.js`);
const mongoose = require(`mongoose`);
let _ = require(`underscore-node`);
let moment = require(`moment-timezone`);
let fs = require(`fs`);
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
commandsV2.init(bot);
function checkMessageForCommand(msg, isEdit) {
  if (msg.author.id != bot.user.id && msg.content.startsWith(config.prefix)) {
    if (
      !msg.author.presence.status ||
      msg.author.presence.status == `offline` ||
      msg.author.presence.status == `invisible`
    ) {
      msg.author
        .send(`Please set your Discord Presence to Online to talk to the bot!`)
        .catch(function(error) {
          msg.channel
            .send(
              msg.author +
                `, Please enable Direct Messages from server members to communicate fully with our bot, it is located in the user setting area under Privacy & Safety tab, select the option allow direct messages from server members`
            )
            .then(
              msg.channel.send(
                `Please set your Discord Presence to Online to talk to the Bot!`
              )
            );
        });
      return;
    }
    var cmdTxt = msg.content
      .split(` `)[0]
      .substring(config.prefix.length)
      .toLowerCase();
    var suffix = msg.content.substring(
      cmdTxt.length + config.prefix.length + 1
    );
    if (msg.isMentioned(bot.user)) {
      try {
        cmdTxt = msg.content.split(` `)[1].toLowerCase();
        suffix = msg.content.substring(
          bot.user.mention().length + cmdTxt.length + config.prefix.length + 1
        );
      } catch (e) {
        return;
      }
    }
    let alias = aliases[cmdTxt];
    if (alias) {
      var cmd = commands[alias];
    } else {
      var cmd = commands[cmdTxt];
    }
    if (cmdTxt === `help`) {
      if (suffix) {
        var cmds = suffix.split(` `).filter(function(cmd) {
          if (aliases[cmd]) {
            cmd = aliases[cmd];
            return commands[cmd];
          } else {
            return commands[cmd];
          }
        });
        var info = ``;
        for (var i = 0; i < cmds.length; i++) {
          var cmd = cmds[i];
          if (aliases[cmd]) {
            cmd = aliases[cmd];
          }
          info += `**${config.prefix + cmd}**`;
          var usage = commands[cmd].usage;
          if (usage) {
            info += ` ${usage}`;
          }
          var description = commands[cmd].description;
          if (description instanceof Function) {
            description = description();
          }
          if (description) {
            info += `\n\t${description}`;
          }
          info += `\n`;
        }
        var aliasnames = [];
        _.groupBy(aliases, function(key, value) {
          if (key == cmd) {
            aliasnames.push(value);
          }
        });
        var aliasnames = JSON.stringify(aliasnames)
          .replace(`]`, ``)
          .replace(`[`, ``);
        if (info || cmd) {
          msg.channel.send(
            `${info}**Other Activators**: \n${cmd},${aliasnames}`
          );
        }
      } else {
        msg.author.send(`**Available Commands:**`).then(function() {
          var batch = ``;
          var sortedCommands = Object.keys(commands).sort();
          for (var i in sortedCommands) {
            var cmd = sortedCommands[i];
            var info = `**${config.prefix + cmd}**`;
            var usage = commands[cmd].usage;
            if (usage) {
              info += ` ${usage}`;
            }
            var description = commands[cmd].description;
            if (description instanceof Function) {
              description = description();
            }
            if (description) {
              info += `\n\t${description}`;
            }
            var newBatch = `${batch}\n${info}`;
            if (newBatch.length > 1024 - 8) {
              msg.author.send(batch);
              batch = info;
            } else {
              batch = newBatch;
            }
          }
          if (batch.length > 0) {
            msg.author.send(batch);
          }
        });
      }
    } else if (cmd) {
      console.log(
        `treating ${msg.content} from ` +
          `UserName: ${msg.author.username} as command`
      );
      try {
        suffix = suffix
          .trim()
          .split(` `)
          .filter(function(n) {
            return n !== ``;
          });
        cmd.process(bot, msg, suffix, isEdit);
      } catch (e) {
        var time = moment()
          .tz(`America/Los_Angeles`)
          .format(`MM-DD-YYYY hh:mm a`);
        var msgTxt = `command ${cmdTxt} failed :(`;
        var linebreak = `\n-------------------------------------------------\n`;
        if (config.debug) {
          msgTxt += `\n${e.stack}`;
        }
        bot.channels
          .get(logChannel)
          .send(`[${time} PST][${pm2Name}] ${msgTxt + linebreak}`);
      }
    } else {
      return;
    }
  } else {
    if (msg.author == bot.user) {
      return;
    }
    if (msg.author != bot.user && msg.isMentioned(bot.user)) {
      return;
    } else {
      return;
    }
  }
}
bot.on(`message`, msg => checkMessageForCommand(msg, !1));
bot.on(`messageUpdate`, (oldMessage, newMessage) => {
  checkMessageForCommand(newMessage, !0);
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
bot.login(config.token);
