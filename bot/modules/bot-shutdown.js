let cmd = require('node-cmd');
let moment = require('moment-timezone');
let isBotDev = require('../helpers.js').isBotDev;
let config = require('config');
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;

exports.commands = ['shutdown'];

exports.shutdown = {
  usage: '<pm2-name>',
  description: 'shuts down bot via pm2',
  process: function(bot, msg, suffix) {
    if (isBotDev(msg)) {
      if (suffix != pm2Name) {
        return;
      }
      var time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      msg.channel.send('Shutting Down pm2 app (' + pm2Name + ')');
      bot.channels
        .get(logChannel)
        .send(
          '[' + time + ' PST][' + pm2Name + '] Shutting Down pm2 app (veronica)'
        );
      cmd.run('pm2 stop ' + pm2Name);
    }
  }
};
