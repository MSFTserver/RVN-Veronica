let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = [
  'purge' // command that is in this file, every command needs it own export as shown below
];

exports.purge = {
  usage: '<number of messages>',
  description: 'Deletes Messages',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Cant Purge Message In DMs!');
      return;
    }
    if (hasPerms(msg)) {
      if (!suffix) {
        var newamount = '2';
      } else {
        var amount = Number(suffix);
        var adding = 1;
        var newamount = amount + adding;
      }
      let messagecount = newamount.toString();
      msg.channel
        .fetchMessages({
          limit: messagecount
        })
        .then(messages => {
          msg.channel.bulkDelete(messages);
          var time = moment()
            .tz('America/Los_Angeles')
            .format('MM-DD-YYYY hh:mm a');
          // Logging the number of messages deleted on both the channel and console.
          msg.channel
            .send(
              'Deletion of messages successful. \n Total messages Purged: ' +
                Number(newamount - 1)
            )
            .then(message => message.delete(10000));
          bot.channels
            .get(modLogChannel)
            .send(
              '[' +
                time +
                ' PST][' +
                pm2Name +
                '] ' +
                msg.author.username +
                ' Deleted a Total of ' +
                Number(newamount - 1) +
                ' message(s) from ' +
                msg.channel.name
            );
        })
        .catch(err => {
          var time = moment()
            .tz('America/Los_Angeles')
            .format('MM-DD-YYYY hh:mm a');
          msg.channel
            .send('ERROR deleting ' + newamount - 1 + ' messages!')
            .then(message => message.delete(10000));
          bot.channels
            .get(logChannel)
            .send(
              '[' +
                time +
                ' PST][' +
                pm2Name +
                '] ERROR deleting ' +
                newamount -
                1 +
                ' messages!'
            );
        });
    } else {
      msg.channel
        .send('only moderators can use this command!')
        .then(message => message.delete(10000));
    }
  }
};
