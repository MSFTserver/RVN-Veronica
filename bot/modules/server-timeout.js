let hasPerms = require(`../helpers.js`).hasPerms;
let inPrivate = require(`../helpers.js`).inPrivate;
let findEntry = require(`../db-helpers.js`).findEntry;
let newEntry = require(`../db-helpers.js`).newEntry;
let updateEntry = require(`../db-helpers.js`).updateEntry;
let config = require(`config`);
let modLogChannel = config.get(`moderation`).modLogChannel;
let pm2Name = config.get(`General`).pm2Name;
let moment = require(`moment-timezone`);
exports.commands = [`timeout`];
exports.timeout = {
  usage: `<@username> <Minutes> <reason>`,
  description: `:desktop: :cop: puts a user in timeout for specified amount of minutes :cop: :desktop:`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send(`You Can Not Use This Command In DMs!`);
      return;
    }
    if (!hasPerms(msg)) {
      return;
    }
    var suffix = msg.content.substring(9);
    var timer = getValidatedAmount(suffix[1]);
    var reason = suffix.slice(2).join(` `);
    var timestamp = moment();
    var member = msg.mentions.members.first();
    if (!member) {
      member = msg.guild.members.find(val => val.id === suffix[0]);
    }
    if (!member) {
      msg.reply(` The member you inserted to ban was invalid!`);
      return;
    }
    if (reason.length < 1) {
      msg.reply(` Add a reason to Timeout ${member.displayName} please.`);
      return;
    }
    if (timer === null) {
      msg.reply(
        ` Invalid Number, Add a timeframe in Minutes to Timeout ${
          member.displayName
        } for`
      );
      return;
    }
    if (timer < 30) {
      msg.reply(` timer must be atleast 30 minutes!`);
      return;
    }
    findEntry(bot, msg, `timeout`, `userID`, member.user.id, findProfile);
    function findProfile(bot, msg, gotProfile) {
      if (!gotProfile) {
        var suffix = msg.content.substring(9);
        var member = msg.mentions.members.first();
        if (!member) {
          member = msg.guild.members.find(val => val.id === suffix[0]);
        }
        if (!member) {
          msg.reply(` The member you inserted to ban was invalid!`);
          return;
        }
        var timer = getValidatedAmount(suffix[1]);
        var reason = suffix.slice(2).join(` `);
        var timestamp = moment();
        var TimeoutUser = {
          userID: member.user.id,
          username: `${member.user.username}#${member.user.discriminator}`,
          reason: reason,
          time: timestamp,
          timer: timer,
          times: Number(1),
          active: !0
        };
        member.addRole(msg.guild.roles.find(val => val.name === `Timeout`));
        newEntry(bot, msg, `timeout`, TimeoutUser);
        msg.channel.send(
          `**${member.displayName}** Has Been Put in Timeout for ${
            timer
          } Minutes\n` + `reason: ${reason}`
        );
        bot.channels
          .get(modLogChannel)
          .send(
            `[${timestamp
              .tz(`America/Los_Angeles`)
              .format(`MM-DD-YYYY hh:mm a`)}PST][${pm2Name}]` +
              ` ${msg.author.username} Put **${
                member.displayName
              }** in Timeout for ${timer} Minutes\n` +
              `reason: reason`
          );
      } else {
        if (!gotProfile[0].active) {
          var suffix = msg.content.substring(9);
          var member = msg.mentions.members.first();
          if (!member) {
            member = msg.guild.members.find(val => val.id === suffix[0]);
          }
          if (!member) {
            msg.reply(` The member you inserted to ban was invalid!`);
            return;
          }
          var timer = getValidatedAmount(suffix[1]);
          var reason = suffix.slice(2).join(` `);
          var timestamp = moment();
          var TimeoutUser = {
            username: `${member.user.username}#${member.user.discriminator}`,
            reason: reason,
            time: timestamp,
            timer: timer,
            times: Number(gotProfile[0].times + 1),
            active: !0
          };
          member.addRole(msg.guild.roles.find(val => val.name === `Timeout`));
          updateEntry(
            bot,
            msg,
            `timeout`,
            `userID`,
            member.user.id,
            TimeoutUse
          );
          msg.channel.send(
            `**${member}** Has Been Put in Timeout a total of ${gotProfile[0]
              .times + 1} times, this time for ${timer} Minutes\n` +
              `reason: ${reason}`
          );
          bot.channels
            .get(modLogChannel)
            .send(
              `[${timestamp
                .tz(`America/Los_Angeles`)
                .format(`MM-DD-YYYY hh:mm a`)} PST][${pm2Name}]` +
                ` ${msg.author.username} Put **${member} ** in Timeout` +
                `Timeouts: ${gotProfile[0].times} times, this time for ${
                  timer
                } Minutes\n` +
                `reason: ${reason}`
            );
        } else {
          msg.channel.send(
            `user has already been put in timeout for ${
              gotProfile[0].timer
            } minutes` +
              ` on ${moment(gotProfile[0].time)
                .tz(`America/Los_Angeles`)
                .format(`MM-DD-YYYY hh:mm a`)} PST`
          );
          return;
        }
      }
    }
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};
exports.custom = [`timeoutChecker`];
exports.timeoutChecker = function(bot) {
  setInterval(function() {
    var msg = null;
    findEntry(bot, msg, `timeout`, !1, !1, findUsers);
    function findUsers(bot, msg, docs) {
      if (docs) {
        docs.forEach(function(results) {
          if (results.active) {
            var user = results.username;
            var userID = results.userID;
            var member = bot.guilds
              .find(val => val.id === `429127343165145089`)
              .members.find(val => val.id === userID);
            var timeoutStart = moment(results.time);
            var timeoutFor = results.timer;
            var then = moment(timeoutStart)
              .add(Number(timeoutFor), `minutes`)
              .unix();
            var now = moment().unix();
            if (now > then) {
              var TimeoutUser = { active: !1 };
              if (member.roles.find(val => val.name === `Timeout`)) {
                member.removeRole(
                  bot.guilds
                    .find(val => val.id === `429127343165145089`)
                    .roles.find(val => val.name === `Timeout`)
                );
                bot.guilds
                  .find(val => val.id === `429127343165145089`)
                  .roles.find(val => val.name === `Timeout`);
                updateEntry(
                  bot,
                  msg,
                  `timeout`,
                  `userID`,
                  member.user.id,
                  TimeoutUser
                );
              } else {
                console.log(`User doesnt have that role!!`);
                updateEntry(
                  bot,
                  msg,
                  `timeout`,
                  `userID`,
                  member.user.id,
                  TimeoutUser
                );
              }
            }
          }
        });
      }
    }
  }, 60 * 1000);
};
