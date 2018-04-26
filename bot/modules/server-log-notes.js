let fs = require('fs');
let moment = require('moment-timezone');
let pm2MetricGet = require('../db-helpers.js').pm2MetricGet;
let pm2MetricSave = require('../db-helpers.js').pm2MetricSave;
pm2MetricGet('notes');

exports.commands = ['botmaster'];

exports.botmaster = {
  usage: '<message for botmaster>',
  description: 'leave a note for the bot masters',
  process: function(bot, msg, suffix) {
    var logStream = fs.createWriteStream('Logs/Bot-Dev-Notes.txt', {
      flags: 'a'
    });
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    logStream.write(
      '\r\n[' +
        time +
        ' PST][' +
        msg.channel.name +
        ']' +
        msg.author.username +
        ': ' +
        msg.content
    );
    pm2MetricSave('notes');
    pm2MetricGet('notes');
    msg.channel.send('Message has been logged for Bot Devs!');
  }
};
