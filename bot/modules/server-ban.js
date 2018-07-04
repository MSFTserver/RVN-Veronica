let isAdmin = require('../helpers.js').isAdmin;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['ban'];

exports.ban = {
  usage: '<@username> <purge 0,1,7> <reason>',
  description: ':desktop: :cop: bans a user for given reason and whipes recent chat by specifing days (0,1,7) :cop: :desktop:',
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
    let words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    let purge = Number(words[1]);
    let reason = words.slice(2);
    if (member == '<@undefinded>' || member == undefined) {
      msg.reply(' The member you inserted to ban was invalid!');
      return;
    }
    if (reason.length < 1) {
      msg.reply(' Add a reason to ban ' + member + ' please.');
      return;
    }
    if (purge != 1 && purge != 7 && purge != 0) {
      msg.reply(' Add a timeframe in days (0,1,7) to remove messages from ' + member);
      return;
    }
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    msg.channel.send(member + ' **BANNED**\npurged: ' + purge + ' days of messages\nreason: ' + reason);
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
          ',purged: ' + purge + ' days of messages, reason: ' +
          reason
      );
    member.ban({
      days: Number(purge),
      reason: 'banned by ' + msg.author.username + '      Reason: ' + reason
    }).catch(function(error) {
      msg.channel.send(error)
    });
  }
};
