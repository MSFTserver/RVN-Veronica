`use strict`;
let moment = require(`moment-timezone`);
let { hasPerms, inPrivate } = require(`../helpers/cmd-helper.js`);
let config = require(`config`);
let { modLogChannel } = config.get(`moderation`);
let { pm2Name } = config.get(`General`);
exports.commands = [`kick`];
exports.kick = {
  usage: `<@username> <reason>`,
  description: `:desktop: :cop: kick a user :cop: :desktop:`,
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
      msg.reply(` The member you inserted to kick was invalid!`);
      return;
    }
    let reason = msg.content
      .split(` `)
      .slice(2)
      .join(` `);
    if (reason.length < 1) {
      msg.reply(` Add a reason to kick \`${member.displayName}\` please.`);
      return;
    }
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    msg.channel.send(
      `${member.displayName} **kicked**\n` + ` reason: ${reason}`
    );
    bot.channels
      .get(modLogChannel)
      .send(
        `[${time} PST][${pm2Name}]` +
          ` ${msg.author.username} **kicked** ${member.displayName},` +
          ` **reason**: ${reason}`
      );
    member.kick(`kicked by ${msg.author.username} Reason: ${reason}`);
  }
};
