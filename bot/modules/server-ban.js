`use strict`;
let moment = require(`moment-timezone`);
let { hasPerms } = require(`../helpers.js`);
let { inPrivate } = require(`../helpers.js`);
let config = require(`config`);
let { modLogChannel } = config.get(`moderation`);
let { pm2Name } = config.get(`General`);
exports.commands = [`ban`];
exports.ban = {
  usage: `<@username> <purge 0,1,7> <reason>`,
  description: `:desktop: :cop: bans a user for given reason and whipes recent chat by specifing days (0,1,7) :cop: :desktop:`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send(`You Can Not Use This Command In DMs!`);
      return;
    }
    if (!hasPerms(msg)) {
      return;
    }
    let member = msg.mentions.members.first();
    if (!member) {
      member = msg.guild.members.find(val => val.id === suffix[0]);
    }
    if (!member) {
      msg.reply(` The member you inserted to ban was invalid!`);
      return;
    }
    let purge = Number(suffix[1]);
    let reason = suffix.slice(2).join(` `);
    if (reason.length < 1) {
      msg.reply(` Add a reason to ban \`${member.displayName}\` please.`);
      return;
    }
    if (purge != 1 || purge != 7 || purge != 0) {
      msg.reply(
        ` Add a timeframe in days (0,1,7) to remove messages from ${
          member.displayName
        }`
      );
      return;
    }
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    msg.channel.send(
      `${member.displayName} **BANNED**\n` +
        `purged: ${purge} days of messages\n` +
        `reason: ${reason}`
    );
    bot.channels
      .get(modLogChannel)
      .send(
        `[${time} PST][${pm2Name}]` +
          ` ${msg.author.username} **BANNED** ${member.displayName},` +
          `purged: ${purge} days of messages,` +
          ` reason: ${reason}`
      );
    member
      .ban({
        days: Number(purge),
        reason: `banned by ${msg.author.username} Reason: ${reason}`
      })
      .catch(function(error) {
        msg.channel.send(error);
      });
  }
};
