let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let findEntry = require('../db-helpers.js').findEntry;
let newEntry = require('../db-helpers.js').newEntry;
let updateEntry = require('../db-helpers.js').updateEntry;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['timeout'];

exports.timeout = {
  usage: '<@username> <Minutes> <reason>',
  description: ':desktop: :cop: puts a user in timeout for specified amount of minutes :cop: :desktop:',
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
    var suffix = msg.content.substring(
      9
    );
    var member = msg.mentions.members.first();
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var timer = getValidatedAmount(words[1]);
    var reason = words.slice(2);
    var timestamp = moment()
    if (member == '<@undefinded>' || member == undefined) {
      msg.reply(' The member you inserted to timeout was invalid!');
      return;
    }
    if (reason.length < 1) {
      msg.reply(' Add a reason to Timeout ' + member + ' please.');
      return;
    }
    if (timer === null)  {
      msg.reply(' Invalid Number, Add a timeframe in Minutes to Timeout ' + member + ' for');
      return;
    }
      findEntry(bot, msg, 'timeout', 'userID', member.user.id, findProfile);
      function findProfile(bot, msg, gotProfile) {
        if (!gotProfile) {
          var suffix = msg.content.substring(
            9
          );
          var member = msg.mentions.members.first();
          var words = suffix
            .trim()
            .split(' ')
            .filter(function(n) {
              return n !== '';
            });
          var timer = getValidatedAmount(words[1]);
          var reason = words.slice(2);
          var timestamp = moment();
          if (member == '<@undefinded>' || member == undefined) {
            msg.reply(' The member you inserted to timeout was invalid!');
            return;
          }
          if (reason.length < 1) {
            msg.reply(' Add a reason to Timeout ' + member + ' please.');
            return;
          }
          if (timer === null)  {
            msg.reply(' Invalid Number, Add a timeframe in Minutes to Timeout ' + member + ' for');
            return;
          }
          var TimeoutUser = {
            userID: member.user.id,
            username: member.user.username +  '#' + member.user.discriminator,
            reason: reason,
            time: timestamp,
            timer: timer,
            times: Number(1),
            active: true
          };
          member.addRole(msg.guild.roles.find('name', 'Timeout'))
          newEntry(bot, msg, 'timeout', TimeoutUser)
          msg.channel.send('**' + member + ' ** Has Been Put in Timeout for ' + timer + ' Minutes\nreason: ' + reason)
          bot.channels.get(modLogChannel).send('[' + timestamp.tz('America/Los_Angeles').format('MM-DD-YYYY hh:mm a') + ' PST][' + pm2Name + '] ' + msg.author.username + ' Put ' + member + ' ** in Timeout for ' + timer + ' Minutes\nreason: ' + reason)
        } else {
          console.log(gotProfile)
          if (!gotProfile[0].active) {
            var suffix = msg.content.substring(
              9
            );
            var member = msg.mentions.members.first();
            var words = suffix
              .trim()
              .split(' ')
              .filter(function(n) {
                return n !== '';
              });
            var timer = getValidatedAmount(words[1]);
            var reason = words.slice(2);
            var timestamp = moment()
            if (member == '<@undefinded>' || member == undefined) {
              msg.reply(' The member you inserted to timeout was invalid!');
              return;
            }
            if (reason.length < 1) {
              msg.reply(' Add a reason to Timeout ' + member + ' please.');
              return;
            }
            if (timer === null)  {
              msg.reply(' Invalid Number, Add a timeframe in Minutes to Timeout ' + member + ' for');
              return;
            }
            var TimeoutUser = {
              username: member.user.username +  '#' + member.user.discriminator,
              reason: reason,
              time: timestamp,
              timer: timer,
              times: Number(gotProfile[0].times + 1),
              active: true
            };
            member.addRole(msg.guild.roles.find('name', 'Timeout'));
            updateEntry(bot, msg, 'timeout', 'userID', member.user.id, TimeoutUser);
            msg.channel.send(
              '**' + member +
              ' ** Has Been Put in Timeout a total of ' +
              (gotProfile[0].times + 1) +
              ' times, this time for ' +
              gotProfile[0].timer +
              ' Minutes\nreason: ' +
              gotProfile[0].reason);
            bot.channels
              .get(modLogChannel)
              .send(
                '[' + timestamp.tz('America/Los_Angeles').format('MM-DD-YYYY hh:mm a') + ' PST][' + pm2Name + '] ' +
                msg.author.username +
                ' Put **' +
                member +
                ' ** in Timeout \nTimeouts: ' +
                gotProfile[0].times +
                ' times, this time for ' +
                gotProfile[0].timer +
                ' Minutes\nreason: ' +
                gotProfile[0].reason
              );
          } else {
          msg.channel.send('user has already been put in timeout for ' + gotProfile[0].timer + ' minutes on ' + moment(gotProfile[0].time).tz('America/Los_Angeles').format('MM-DD-YYYY hh:mm a'));
          return;
        }

      }
    }
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};

exports.custom = [
    'timeoutChecker'
]

exports.timeoutChecker = function(bot) {
  setInterval(function() {
    var msg = null;
    findEntry(bot, msg, 'timeout', false, false, findUsers);
    function findUsers(bot, msg, docs) {
      if (docs) {
      docs.forEach(function(results) {
        if (results.active) {
        var user = results.username;
        var userID = results.userID;
        var member = bot.guilds.find('id', '429127343165145089').members.find('id', userID);
        var timeoutStart = moment(results.time)
        var timeoutFor = results.timer;
        var then = moment(timeoutStart).add(Number(timeoutFor), 'minutes');
        var now = moment();
        console.log(timeoutStart)
        console.log(now);
        console.log(then);
        console.log(timeoutStart.unix())
        console.log(now.unix());
        console.log(then.unix());
        if (now > then) {
        var TimeoutUser = {
              active: false
            };
          member.removeRole(bot.guilds.find('id', '429127343165145089').roles.find('name', 'Timeout'))
          .then(
            updateEntry(bot, msg, 'timeout', 'userID', results.userID, TimeoutUser)
          )
        }
      }
      });
    }
    }
  }, 60 * 1000);
}
