let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['kick'];

exports.kick = {
  usage: '<@username> <reason>',
  description: ':desktop: :cop: kick a user :cop: :desktop:',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not Use This Command In DMs!');
      return;
    }
    if (!hasPerms(msg)) {
      msg.channel.send(
        'you must have the kick members permission to use this command'
      );
      return;
    }
    let member = msg.mentions.members.first();
    let reason = msg.content
      .split(' ')
      .slice(2)
      .join(' ');
    if (member == '<@undefinded>' || member == undefined) {
      msg.reply(' The member you inserted to kick was invalid!');
      return;
    }
    if (reason.length < 1) {
      msg.reply(' Add a reason to kick ' + member + ' please.');
      return;
    }
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    msg.channel.send(member + ' **kicked**\n reason: ' + reason);
    bot.channels
      .get(modLogChannel)
      .send(
        '[' +
          time +
          ' PST][' +
          pm2Name +
          '] ' +
          msg.author.username +
          ' **kicked** ' +
          member +
          ', reason: ' +
          reason
      );
    member.kick(member + ' **kicked**      reason: ' + reason);
  }
};
