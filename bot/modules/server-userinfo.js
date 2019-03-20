let findEntry = require('../db-helpers.js').findEntry;
let newEntry = require('../db-helpers.js').newEntry;
let moment = require('moment-timezone');
let inSpam = require('../helpers.js').inSpam;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
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
        'please use <#' + channelID + '> to talk to Profile Bot'
      );
      return;
    }
    var user = msg.mentions.users.first()
      ? msg.mentions.users.first()
      : msg.author;
    findEntry(bot, msg, 'users', 'accUserID', user.id, findProfile);
    function findProfile(bot, msg, docs) {
      if (!docs) {
        msg.channel.send('user not found in database!')
        return
      }
      let member = msg.guild.member(user);
      if (!member) {
        nickname = 'null';
        join = 'null';
      } else {
        var join = member.joinedAt.toString();
        var nickname = member.nickname !== null ? member.nickname : 'null';
        var roles = member.roles.map(val=> val.name);
        var inVoice = member.voiceChannelID ? member.voiceChannelID : null;
        var lastMsg = member.lastMessage;
        var lastMsgChan,lastMsgCont;
        console.log(lastMsg);
        if (lastMsg){
          lastMsgChan = lastMsg.channel ? lastMsg.channel.name : lastMsg.channel.name ? lastMsg.channel.name : 'null';
          lastMsgCont = lastMsg.content.replace(/^(.{20}[^\s]*).*/, "$1") ? lastMsg.content.replace(/^(.{20}[^\s]*).*/, "$1") : "null"
        } else {
          lastMsgChan = "null";
          lastMsgCont = "null";
        }
        console.log(lastMsgChan)
        var index = roles.indexOf("@everyone");
        if (index > -1) {
         roles.splice(index, 1);
        }
        if (!inVoice){
          inVoice = 'null';
        } else {
          var fetchVoice = msg.guild.channels.find(val=>val.id === inVoice);
          if (!fetchVoice) {
            inVoice = 'null';
          } else {
            inVoice = fetchVoice.name
          }
        }
      }
      let game =
        !!user.presence &&
        user.presence !== null &&
        user.presence.game !== null &&
        user.presence.game.name !== null
          ? user.presence.game.name
          : 'null';
      if (!docs || !docs[0]) {
        var userid = user.id;
        var username = user.username;
        var discriminator = user.discriminator;
        var ava = user.avatarURL;
        var joined = join;
        var created = user.createdAt;
        var userRep = 0;
        var newProfile = {
          accUserID: userid,
          accUsername: username,
          accDiscriminator: discriminator,
          accAvatar: ava,
          accJoinedDate: joined,
          accCreatedDate: created,
          accRep: userRep
        };
        newEntry('users', newProfile);
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
            value: game,
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
            name: 'Roles',
            value: roles.join(", "),
            inline: true
          },
          {
            name: 'Voice Channel',
            value: inVoice,
            inline: true
          },
          {
            name: 'Last Message',
            value: "Channel: "+lastMsgChan + "\n" +
              "Content: " + lastMsgCont + "\n" +
              "Test: ",
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
    }
  }
};
