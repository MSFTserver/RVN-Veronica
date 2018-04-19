let moment = require('moment-timezone');
const mongoose = require('mongoose');
let usersSchema = require('..\\' + '\\db-models\\user.js');
let users = mongoose.model('users');
let inSpam = require('../helpers.js').inSpam;
let inPrivate = require('../helpers.js').inPrivate;
let hasPerms = require('../helpers.js').hasPerms;
let config = require('config');
let channelID = config.get('General').Channels.botspam;
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;

exports.commands = ['rep'];

exports.rep = {
  usage: '',
  description:
    'check your reputation\n**!rep give <@ username> <amount>**\n    gives specified amoutn of rep to user\n**!rep take <@ username> <amount>**\n    takes specified amount of rep from user\n   rep is awarded 1 per message sent\n    more features will be added in the future',
  process: function(bot, msg, suffix) {
    if (!inPrivate(msg) && !inSpam(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to reputation bot.'
      );
      return;
    }
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var user = msg.mentions.users.first()
      ? msg.mentions.users.first()
      : msg.author;
    var cmd = words[0];
    if (user == msg.author) {
      if (cmd == 'give' || cmd == 'take') {
        msg.channel.send(
          'you can not control points on your own account sorry!'
        );
      }
      getUserRep(bot, msg, user);
      return;
    } else {
      if (cmd.includes(msg.mentions.users.first().id)) {
        getUserRep(bot, msg, user);
        return;
      }
      if (cmd == 'give') {
        if (!hasPerms(msg)) {
          msg.channel.send('only staff can use this command');
          return;
        }
        if (words[2] == undefined) {
          msg.reply(
            'Invalid Amount Please specify a number!\n!rep give <@ username> <amount>'
          );
          return;
        }
        var amount = words[2];
        giveUserRep(bot, msg, user, amount);
        return;
      }
      if (cmd == 'take') {
        if (!hasPerms(msg)) {
          msg.channel.send('only staff can use this command');
          return;
        }
        if (words[2] == undefined) {
          msg.reply(
            'Invalid Amount Please specify a number!\n!rep take <@ username> <amount>'
          );
          return;
        }
        var amount = words[2];
        takeUserRep(bot, msg, user, amount);
        return;
      }
    }

    function takeUserRep(bot, msg, usr, amt) {
      if (words[0] == undefined || getValidatedAmount(amt) === null) {
        msg.reply(
          'Invalid Amount Please specify a number!\n!rep take <@ username> <amount>'
        );
        return;
      }
      users.find({ accUserID: usr.id }, function(err, docs) {
        if (!docs || !docs[0]) {
          if (
            !msg.guild ||
            !msg.guild.member(usr) ||
            !msg.guild.member(usr).joinedAt
          ) {
            var joindate = null;
          } else {
            var joindate = msg.guild.member(usr).joinedAt.toString();
          }
          var newUserProfile = {
            accUserID: usr.id,
            accUsername: usr.username,
            accDiscriminator: usr.discriminator,
            accAvatar: usr.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: usr.createdAt,
            accRep: 0
          };
          var newUser = new users(newUserProfile);
          newUser
            .save()
            .then(newUser => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Saved New user: ' + user.username)
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] Saved New user: ' +
                  usr.username
              );
              msg.channel.send(
                ' cant take reputation points from ' +
                  docs[0].accUsername +
                  ' with 0'
              );
            })
            .catch(err => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR saving Profile:\n' + err);
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] ERROR saving Profile:\n' +
                  err
              );
            });
          return;
        } else {
          if (Number(amt) > docs[0].accRep) {
            msg.channel.send(
              'user does not have that much rep to take setting to 0'
            );
            var userRep = 0;
          } else {
            var userRep = docs[0].accRep - Number(amt);
          }
          var newUserProfile = {
            accUserID: docs[0].accUserID,
            accUsername: docs[0].accUsername,
            accDiscriminator: docs[0].accDiscriminator,
            accAvatar: docs[0].accAvatar,
            accJoinedDate: docs[0].accJoinedDate,
            accCreatedDate: docs[0].accCreatedDate,
            accRep: userRep
          };
          users
            .updateOne({ accUserID: usr.id }, { $set: newUserProfile })
            .then(users => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Updated user: ' + user[1].username)
              //console.log('[' + time + ' PST][' + pm2Name + '] Updated user: ' + user.username)
              msg.channel.send(
                userRep +
                  ' reputation points has been taken from ' +
                  docs[0].accUsername +
                  ', totaling (' +
                  userRep +
                  ')'
              );
            })
            .catch(err => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR Updating Profile:\n' + err);
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] ERROR Updating Profile:\n' +
                  err
              );
            });
          return;
        }
      });
    }
    function giveUserRep(bot, msg, usr, amt) {
      if (getValidatedAmount(amt) === null) {
        msg.reply(
          'Invalid Amount Please specify a number!\n!rep give <@ username> <amount>'
        );
        return;
      }
      users.find({ accUserID: usr.id }, function(err, docs) {
        if (!docs || !docs[0]) {
          if (
            !msg.guild ||
            !msg.guild.member(usr) ||
            !msg.guild.member(usr).joinedAt
          ) {
            var joindate = null;
          } else {
            var joindate = msg.guild.member(usr).joinedAt.toString();
          }
          var newUserProfile = {
            accUserID: usr.id,
            accUsername: usr.username,
            accDiscriminator: usr.discriminator,
            accAvatar: usr.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: usr.createdAt,
            accRep: 0 + Number(amt)
          };
          var newUser = new users(newUserProfile);
          newUser
            .save()
            .then(newUser => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Saved New user: ' + user.username)
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] Saved New user: ' +
                  usr.username
              );
              msg.channel.send(
                docs[0].accUsername +
                  ' has been awarded ' +
                  amt +
                  ' reputation points, totaling (' +
                  (Number(docs[0].accRep) + Number(amt)) +
                  ')'
              );
            })
            .catch(err => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR saving Profile:\n' + err);
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] ERROR saving Profile:\n' +
                  err
              );
            });
          return;
        } else {
          var newUserProfile = {
            accUserID: docs[0].accUserID,
            accUsername: docs[0].accUsername,
            accDiscriminator: docs[0].accDiscriminator,
            accAvatar: docs[0].accAvatar,
            accJoinedDate: docs[0].accJoinedDate,
            accCreatedDate: docs[0].accCreatedDate,
            accRep: docs[0].accRep + Number(amt)
          };
          users
            .updateOne({ accUserID: usr.id }, { $set: newUserProfile })
            .then(users => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Updated user: ' + user[1].username)
              //console.log('[' + time + ' PST][' + pm2Name + '] Updated user: ' + user.username)
              msg.channel.send(
                docs[0].accUsername +
                  ' has been awarded ' +
                  amt +
                  ' reputation points, totaling (' +
                  (Number(docs[0].accRep) + Number(amt)) +
                  ')'
              );
            })
            .catch(err => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR Updating Profile:\n' + err);
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] ERROR Updating Profile:\n' +
                  err
              );
            });
          return;
        }
      });
    }
    function getUserRep(bot, msg, usr) {
      users.find({ accUserID: usr.id }, function(err, docs) {
        if (!docs || !docs[0]) {
          if (
            !msg.guild ||
            !msg.guild.member(usr) ||
            !msg.guild.member(usr).joinedAt
          ) {
            var joindate = null;
          } else {
            var joindate = msg.guild.member(usr).joinedAt.toString();
          }
          var newUserProfile = {
            accUserID: usr.id,
            accUsername: usr.username,
            accDiscriminator: usr.discriminator,
            accAvatar: usr.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: usr.createdAt,
            accRep: 0
          };
          var newUser = new users(newUserProfile);
          newUser
            .save()
            .then(newUser => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Saved New user: ' + user.username)
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] Saved New user: ' +
                  usr.username
              );
              msg.channel.send(
                usr.username +
                  ' has 0 reputation points!\n stay active to earn more and show you are active in this community'
              );
            })
            .catch(err => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR saving Profile:\n' + err);
              console.log(
                '[' +
                  time +
                  ' PST][' +
                  pm2Name +
                  '] ERROR saving Profile:\n' +
                  err
              );
            });
          return;
        } else {
          msg.channel.send(
            docs[0].accUsername +
              ' has ' +
              docs[0].accRep +
              ' reputation points!\n stay active to earn more and show you are active in this community'
          );
          return;
        }
      });
    }
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};
