let isAdmin = require('../helpers.js').isAdmin;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['ban'];

exports.ban = {
  usage: '<@username> <reason>',
  description: ':desktop: :cop: bans a user for given reason :cop: :desktop:',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not Use This Command In DMs!');
      return;
    }
    if (!isAdmin(msg)) {
      msg.channel.send(
        'you must have the ban members permission to use this command'
      );
      return;
    }
    let member = msg.mentions.members.first();
    let reason = msg.content
      .split(' ')
      .slice(2)
      .join(' ');
    if (member == '<@undefinded>') {
      msg.reply(' The member you inserted to ban was invalid!');
      return;
    }
    if (reason.length < 1) {
      msg.reply(' Add a reason to ban ' + member + ' please.');
      return;
    }
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    msg.channel.send(member + ' **BANNED**\n reason: ' + reason);
    bot.channels
      .get(modLogChannel)
      .send(
        '[' +
          time +
          ' PST][' +
          pm2Name +
          '] ' +
          msg.author.username +
          ' **BANNED**' +
          member +
          ', reason: ' +
          reason
      );
    member.ban({
      days: 7,
      reason: 'banned by ' + msg.author.username + '      Reason: ' + reason
    });
  }
};
