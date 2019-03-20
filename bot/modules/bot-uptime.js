let config = require('config');
let pm2Name = config.get('General').pm2Name;

exports.commands = ['uptime'];

exports.uptime = {
  usage: '',
  description: 'gets Uptime for Bot',
  process: function(bot, msg, suffix) {
    if (suffix != pm2Name) {
      return;
    }
    let days = Math.round(bot.uptime / (1000 * 60 * 60 * 24));
    let hrs = Math.round(bot.uptime / (1000 * 60 * 60));
    let min = Math.round(bot.uptime / (1000 * 60)) % 60
    let sec = Math.round(bot.uptime / 1000) % 60
    let message
    if (!min) message = 'i have been Online for ' + sec +' seconds';
    else if (!hrs) message = 'i have been Online for '+ min + ' minutes ' + sec +' seconds';
    else if (!days) message = 'i have been Online for ' + hrs + ' hours ' + min + ' minutes ' + sec +' seconds';
    else if (days < 1) message = 'i have been Online for ' + hrs + ' hours ' + min + ' minutes';
    else 'i have been Online for ' +days + ' days ' + hrs + ' hours ' + min + ' minutes ' + sec +' seconds';
    msg.channel.send(
      message
    );
  }
};
