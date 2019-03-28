let _ = require(`underscore-node`);
let moment = require(`moment-timezone`);
let { findEntry } = require(`../helpers/db-helper.js`);
let config = require(`config`);
let { logChannel, commandThrottle } = config.get(`moderation`);
let { pm2Name } = config.get(`General`);
config = config.get(`bot`);
var commands = {};
var aliases;
exports.addAliases = function() {
  try {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    aliases = require(`../../config/alias.json`);
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
};
exports.addCommand = function(bot, commandName, commandObject) {
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
exports.addCustomFunc = function(bot, customFunc) {
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
exports.checkMessageForCommand = function(msg, bot, isEdit) {
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
              `${
                msg.author
              }, Please enable Direct Messages from server members` +
                ` to communicate fully with our bot, it is located in the user` +
                ` setting area under Privacy & Safety tab, select the option` +
                ` allow direct messages from server members`
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
      var lastMsgTime, lastCMD;
      var currentTime = Date.now().valueOf();
      currentTime = new Date(currentTime - commandThrottle * (10 * 100));
      findEntry(bot, msg, `users`, `accUserID`, msg.author.id, findProfile);
      function findProfile(bot, msg, gotProfile) {
        if (gotProfile) {
          lastMsgTime = new Date(gotProfile[0].lastCMD.cmdTime);
          lastCMD = gotProfile[0].lastCMD.cmdCont.split(" ")[0].trim();
        }
        if (msg.author.id !== msg.guild.ownerID) {
          if (
            lastMsgTime &&
            lastCMD === config.prefix + cmdTxt &&
            lastMsgTime > currentTime
          ) {
            msg.channel.send(`denied ${msg.content} throttling active!`);
            console.log(
              `denied ${msg.content} from ` +
                `${msg.author.username} throttling active!`
            );
            return;
          } else if (lastMsgTime && lastMsgTime > currentTime) {
            msg.channel.send(`denied ${msg.content} throttling active!`);
            console.log(
              `denied ${msg.content} from ` +
                `${msg.author.username} throttling active!`
            );
            return;
          }
        }
        console.log(
          `treating ${msg.content} from ` + `${msg.author.username} as command`
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
};
