let isAdmin = require('../helpers.js').isAdmin;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['ban'];

exports.ban = {
  usage: '<@username> <reason>',
  description: 'bans a user for given reason',
  process: function(bot, msg, suffix) {
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
    msg.mentions.members
      .first()
      .send(
        'you have been __**BANNED**__ you may no longer join this server until this ban has been lifted!'
      );
    member.ban({
      days: 7,
      reason: 'banned by ' + msg.author.username + '      Reason: ' + reason
    });
  }
};
