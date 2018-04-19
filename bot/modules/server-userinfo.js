let moment = require('moment-timezone');
const mongoose = require('mongoose');
let usersSchema = require('..\\' + '\\db-models\\user.js');
let inSpam = require('../helpers.js').inSpam;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;

exports.commands = ['userinfo'];

exports.userinfo = {
  usage: '@username',
  description: 'gets a users info in the server',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel
        .send('can not use this command in DMs!')
        .then(message => message.delete(5000));
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(
        'please use <#' + channelID + '> to talk to RoleSetter Bot'
      );
      return;
    }
    var user = msg.mentions.users.first()
      ? msg.mentions.users.first()
      : msg.author;
    var users = mongoose.model('users');
    users.find({ accUserID: user.id }, function(err, docs) {
      let member = msg.guild.member(user);
      if (!member) {
        nickname = 'error getting this data';
        join = 'error getting this data';
      } else {
        var join = member.joinedAt.toString();
        var nickname = member.nickname !== null ? member.nickname : 'none';
      }
      let game =
        !!user.presence &&
        user.presence !== null &&
        user.presence.game !== null &&
        user.presence.game.name !== null
          ? user.presence.game.name
          : 'Nothing';
      if (!docs || !docs[0]) {
        var userid = user.id;
        var username = user.username;
        var discriminator = user.discriminator;
        var ava = user.avatarURL;
        var joined = join;
        var created = user.createdAt;
        var userRep = 0;
        var newUserProfile = {
          accUserID: userid,
          accUsername: username,
          accDiscriminator: discriminator,
          accAvatar: ava,
          accJoinedDate: joined,
          accCreatedDate: created,
          accRep: userRep
        };
        var newUser = new users(newUserProfile);
        newUser
          .save()
          .then(newUser => {
            //bot.channels.get(logChannel).send('Saved New user: ' + msg.author.username);
            //console.log('Saved New user: ' + msg.author.username);
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
      } else {
        var userid = docs[0].accUserID;
        var username = docs[0].accUsername;
        var discriminator = docs[0].accDiscriminator;
        var ava = docs[0].accAvatar;
        var joined = docs[0].accJoinedDate;
        var created = docs[0].accCreatedDate;
        var userRep = docs[0].accRep;
      }
      if (userRep == 0) {
        var rep = 'none';
      } else {
        var rep = userRep;
      }
      if (joined == null) {
        var joined = 'error getting this data';
      }
      if (created == null) {
        var created = 'error getting this data';
      }
      let embed = {
        author: {
          name: 'Who Is: ' + username,
          icon_url:
            ava !== null
              ? ava
              : 'https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png'
        },
        color: 0x47d70c,
        thumbnail: {
          url:
            ava !== null
              ? ava
              : 'https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png'
        },
        fields: [
          {
            name: 'User',
            value: username + '#' + discriminator,
            inline: true
          },
          {
            name: 'ID',
            value: userid,
            inline: true
          },
          {
            name: 'Nickname',
            value: nickname,
            inline: true
          },
          {
            name: 'Game',
            value: 'Playing ' + game,
            inline: true
          },
          {
            name: 'Status',
            value:
              user.presence !== null && user.presence.status !== null
                ? user.presence.status
                : 'Offline',
            inline: true
          },
          {
            name: 'Reputation',
            value: rep,
            inline: true
          },
          {
            name: 'Joined On',
            value: joined,
            inline: false
          },
          {
            name: 'Account Created On',
            value: created,
            inline: false
          }
        ]
      };
      msg.channel.send('', {
        embed
      });
      var time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      bot.channels
        .get(modLogChannel)
        .send(
          '[' +
            time +
            ' PST][' +
            pm2Name +
            '] ' +
            msg.author.username +
            ' looked up profile for ' +
            user.username
        );
    });
  }
};
