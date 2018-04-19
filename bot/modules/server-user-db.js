let moment = require('moment-timezone');
const mongoose = require('mongoose');
let isBotDev = require('../helpers.js').isBotDev;
let inPrivate = require('../helpers.js').inPrivate;
let hasExcludedSpamChannels = require('../helpers.js').hasExcludedSpamChannels;
let usersSchema = require('..\\' + '\\db-models\\user.js');
let config = require('config');
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;

exports.commands = ['syncdb'];

exports.syncdb = {
  usage: '',
  description: 'initiates a sync of database from user list',
  process: function(bot, msg) {
    var memCount = msg.guild.members.size;
    msg.channel.send('Starting to sync ' + memCount + ' Users to DB!');
    getProfiles(bot, msg, memCount);
    function getProfiles() {
      var users = mongoose.model('users');
      var userProfile = msg.guild.members;
      var memCount = userProfile.size;
      var counter = 0;
      userProfile.forEach(function(user) {
        counter++;
        if (counter === memCount) {
          msg.channel.send(
            'Saved ' + counter + '/' + memCount + ' Users to db!'
          );
        }
        users.count({ accUserID: user.user.id }, function(err, count) {
          users.find({ accUserID: user.user.id }, function(err, docs) {
            if (!docs || !docs[0]) {
              var userid = user.user.id;
              var username = user.user.username;
              var discriminator = user.user.discriminator;
              var ava = user.user.avatarURL;
              var joined = user.joinedAt;
              var created = user.user.createdAt;
              var userRep = 0;
            } else {
              var userid = docs[0].accUserID;
              var username = docs[0].accUsername;
              var discriminator = docs[0].accDiscriminator;
              var ava = docs[0].accAvatar;
              var joined = docs[0].accJoinedDate;
              var created = docs[0].accCreatedDate;
              var userRep = docs[0].accRep;
            }
            var newUserProfile = {
              accUserID: userid,
              accUsername: username,
              accDiscriminator: discriminator,
              accAvatar: ava,
              accJoinedDate: joined,
              accCreatedDate: created,
              accRep: userRep
            };
            if (count > 0) {
              users
                .updateOne(
                  { accUserID: msg.author.id },
                  { $set: newUserProfile }
                )
                .then(users => {
                  //bot.channels.get(logChannel).send('Updated user: ' + msg.author.username)
                  //console.log('Updated user: ' + msg.author.username)
                })
                .catch(err => {
                  var time = moment()
                    .tz('America/Los_Angeles')
                    .format('MM-DD-YYYY hh:mm a');
                  //bot.channels .get(logChannel) .send( '[' + time + ' PST][' + pm2Name + '] ERROR Updating Profile:\n' + err );
                  //console.log( '[' + time + ' PST][' + pm2Name + '] ERROR Updating Profile:\n' + err );
                });
            } else {
              var newUser = new users(newUserProfile);
              newUser
                .save()
                .then(newUser => {
                  var time = moment()
                    .tz('America/Los_Angeles')
                    .format('MM-DD-YYYY hh:mm a');
                  //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] Saved New user: ' + user.username)
                  //console.log('[' + time + ' PST][' + pm2Name + '] Saved New user: ' + user.username );
                })
                .catch(err => {
                  var time = moment()
                    .tz('America/Los_Angeles')
                    .format('MM-DD-YYYY hh:mm a');
                  //bot.channels.get(logChannel).send('[' + time + ' PST][' + pm2Name + '] ERROR saving Profile:\n' + err);
                  // console.log( '[' + time + ' PST][' + pm2Name + '] ERROR saving Profile:\n' + err );
                });
            }
          });
        });
      });
    }
  }
};

exports.custom = ['UserDBs'];

exports.UserDBs = function(bot) {
  bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if (inPrivate(msg)) {
        return;
      }
      if (hasExcludedSpamChannels(msg)) {
        return;
      }
      if (
        !msg.author.presence.status ||
        msg.author.presence.status == 'offline' ||
        msg.author.presence.status == 'invisible'
      ) {
        return;
      }
      var users = mongoose.model('users');
      users.count({ accUserID: msg.author.id }, function(err, count) {
        users.find({ accUserID: msg.author.id }, function(err, docs) {
          if (!docs || !docs[0]) {
            if (
              !msg.guild ||
              !msg.guild.member(msg.author) ||
              !msg.guild.member(msg.author).joinedAt
            ) {
              var joindate = null;
            } else {
              var joindate = msg.guild.member(msg.author).joinedAt.toString();
            }
            var newUserProfile = {
              accUserID: msg.author.id,
              accUsername: msg.author.username,
              accDiscriminator: msg.author.discriminator,
              accAvatar: msg.author.avatarURL,
              accJoinedDate: joindate,
              accCreatedDate: msg.author.createdAt,
              accRep: 0 + 1
            };
          } else {
            var newUserProfile = {
              accRep: docs[0].accRep + 1
            };
          }
          if (count > 0) {
            users
              .updateOne({ accUserID: msg.author.id }, { $set: newUserProfile })
              .then(users => {
                //bot.channels.get(logChannel).send('Updated user: ' + msg.author.username)
                //console.log('Updated user: ' + msg.author.username)
              })
              .catch(err => {
                var time = moment()
                  .tz('America/Los_Angeles')
                  .format('MM-DD-YYYY hh:mm a');
                bot.channels
                  .get(logChannel)
                  .send(
                    '[' +
                      time +
                      ' PST][' +
                      pm2Name +
                      '] ERROR Updating Profile:\n' +
                      err
                  );
                console.log(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    '] ERROR Updating Profile:\n' +
                    err
                );
              });
          } else {
            var newUser = new users(newUserProfile);
            newUser
              .save()
              .then(newUser => {
                bot.channels
                  .get(logChannel)
                  .send('Saved New user: ' + msg.author.username);
                console.log('Saved New user: ' + msg.author.username);
              })
              .catch(err => {
                var time = moment()
                  .tz('America/Los_Angeles')
                  .format('MM-DD-YYYY hh:mm a');
                bot.channels
                  .get(logChannel)
                  .send(
                    '[' +
                      time +
                      ' PST][' +
                      pm2Name +
                      '] ERROR saving Profile:\n' +
                      err
                  );
                console.log(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    '] ERROR saving Profile:\n' +
                    err
                );
              });
          }
        });
      });
      return;
    }
  });
};
