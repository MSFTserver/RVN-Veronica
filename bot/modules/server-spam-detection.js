
const authors = [];
let warned = [];
let banned = [];
let messagelog = [];
let moment = require('moment-timezone');
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let hasExcludedSpamChannels = require('../helpers.js').hasExcludedSpamChannels;
let hasExcludedSpamUsers = require('../helpers.js').hasExcludedSpamUsers;
let pm2Name = config.get('General').pm2Name;

/**
 * Add simple spam protection to your discord server.
 * @param  {Bot} bot - The discord.js CLient/bot
 * @param  {object} options - Optional (Custom configuarion options)
 * @return {[type]}         [description]
 */

exports.custom = ['antiSpam'];

exports.antiSpam = function(bot) {
  const warnBuffer = 5;
  const maxBuffer = 10;
  const interval = 1500;
  const warningMessage =
    ', Stop spamming or you will be banned! This is your warning!';
  const banMessage = 'has been banned for spamming!';
  const maxDuplicatesWarning = 5;
  const maxDuplicatesBan = 10;

  bot.on('message', msg => {
    if (
      msg.content.includes('discord.gg/') ||
      msg.content.includes('https://discord.gg/')
    ) {
      var time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      bot.channels
        .get(modLogChannel)
        .send(
          '[' +
            time +
            ' PST][' + pm2Name + '] ' +
            msg.author.username +
            ' warned for sending invite links!'
        );
      msg.reply('do not send invite links please!');
      msg.delete();
    }
    if (inPrivate(msg)) {
      return;
    }
    if (msg.author.bot) {
      return;
    }
    if (hasExcludedSpamChannels(msg)) {
      return;
    }
    if (hasExcludedSpamUsers(msg)) {
      return;
    }
    if (msg.author.id != bot.user.id) {
      let now = Math.floor(Date.now());
      authors.push({
        time: now,
        author: msg.author.id
      });
      messagelog.push({
        message: msg.content,
        author: msg.author.id
      });

      // Check how many times the same message has been sent.
      let msgMatch = 0;
      for (let i = 0; i < messagelog.length; i++) {
        if (
          messagelog[i].message == msg.content &&
          messagelog[i].author == msg.author.id &&
          msg.author.id !== bot.user.id
        ) {
          msgMatch++;
        }
      }
      // Check matched count
      if (msgMatch == maxDuplicatesWarning && !warned.includes(msg.author.id)) {
        warn(msg, msg.author.id);
      }
      if (msgMatch == maxDuplicatesBan && !banned.includes(msg.author.id)) {
        ban(msg, msg.author.id);
      }

      matched = 0;

      for (let i = 0; i < authors.length; i++) {
        if (authors[i].time > now - interval) {
          matched++;
          if (matched == warnBuffer && !warned.includes(msg.author.id)) {
            warn(msg, msg.author.id);
          } else if (matched == maxBuffer) {
            if (!banned.includes(msg.author.id)) {
              ban(msg, msg.author.id);
            }
          }
        } else if (authors[i].time < now - interval) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          banned.splice(warned.indexOf(authors[i]));
        }
        if (messagelog.length >= 200) {
          messagelog.shift();
        }
      }
    }
  });

  /**
   * Warn a user
   * @param  {Object} msg
   * @param  {string} userid userid
   */

  function warn(msg, userid) {
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    warned.push(msg.author.id);
    msg.channel.send(msg.author + ' ' + warningMessage);
    bot.channels
      .get(modLogChannel)
      .send(
        '[' +
          time +
          ' PST][' + pm2Name + '] ' +
          msg.author.username +
          ' has been warned for spamming!'
      );
  }

  /**
   * Ban a user by the user id
   * @param  {Object} msg
   * @param  {string} userid userid
   * @return {boolean} True or False
   */

  function ban(msg, userid) {
    for (let i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author == msg.author.id) {
        messagelog.splice(i);
      }
    }

    banned.push(msg.author.id);

    let user = msg.channel.guild.members.find(
      member => member.user.id === msg.author.id
    );
    if (user) {
      var time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      user
        .ban({
          reason: 'Anti Spam Bot Banned this user well for spamming lol',
          days: 7
        })
        .then(member => {
          msg.channel.send(msg.author + ' ' + banMessage);
          bot.channels
            .get(modLogChannel)
            .send(
              '[' + time + ' PST][' + pm2Name + '] ' + msg.author.username + ' ' + banMessage
            );
          return true;
        })
        .catch(() => {
          msg.channel.send(
            'insufficient permission to kick ' + msg.author + ' for spamming.'
          );
          return false;
        });
    }
  }
};
