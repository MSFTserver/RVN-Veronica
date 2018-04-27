let cmd = require('node-cmd');
let moment = require('moment-timezone');
let isBotDev = require('../helpers.js').isBotDev;
let pm2MetricGet = require('../db-helpers.js').pm2MetricGet;
let pm2MetricSave = require('../db-helpers.js').pm2MetricSave;
let config = require('config');
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;
pm2MetricGet('updates');

exports.commands = ['update'];

exports.update = {
  usage: '<pm2-name>',
  description: ':desktop: :construction_worker: updates the bot via pm2 for no down time! :construction_worker: :desktop:',
  process: function(bot, msg, suffix) {
    if (isBotDev(msg)) {
      if (suffix != pm2Name) {
        return;
      }
      var time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      msg.channel.send('Updating pm2 app (' + pm2Name + ') from Git repo!');
      pm2MetricSave('updates');
      pm2MetricGet('updates');
      bot.channels
        .get(logChannel)
        .send(
          '[' + time + ' PST][' + pm2Name + '] Updating pm2 app from Git repo!'
        );
      cmd.run(
        'cd C:/Users/RavenDev/Desktop/Bots/Veronica && git pull origin master && npm install && pm2 reload ' +
          pm2Name
      );
    }
  }
};
