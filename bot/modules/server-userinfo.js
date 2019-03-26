`use strict`;
let moment = require(`moment-timezone`);
let { inSpam } = require(`../helpers.js`);
let { inPrivate } = require(`../helpers.js`);
let { findEntry } = require(`../db-helpers.js`);
let { newEntry } = require(`../db-helpers.js`);
let config = require(`config`);
let { modLogChannel } = config.get(`moderation`);
let channelID = config.get(`General`).Channels.botspam;
let { pm2Name } = config.get(`General`);
exports.commands = [`userinfo`];
exports.userinfo = {
  usage: `@username`,
  description: `gets a users info in the server`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel
        .send(`can not use this command in DMs!`)
        .then(message => message.delete(5000));
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(`please use <#${channelID}> to talk to Profile Bot`);
      return;
    }
    var user = msg.mentions.users.first()
      ? msg.mentions.users.first()
      : msg.author;
    findEntry(bot, msg, `users`, `accUserID`, user.id, findProfile);
    function findProfile(bot, msg, docs) {
      if (!docs) {
        msg.channel.send(`user not found in database!`);
        return;
      }
      let member = msg.guild.member(user);
      if (!member) {
        nickname = `null`;
        join = `null`;
      } else {
        var join = member.joinedTimestamp;
        var nickname = member.nickname || `null`;
        var roles = member.roles.map(val => val.name);
        var inVoice = member.voiceChannelID || null;
        var index = roles.indexOf(`@everyone`);
        if (index > -1) roles.splice(index, 1);
        if (!inVoice) {
          inVoice = `null`;
        } else {
          var fetchVoice = msg.guild.channels.find(val => val.id === inVoice);
          if (!fetchVoice) {
            inVoice = `null`;
          } else {
            inVoice = fetchVoice.name;
          }
        }
        let game =
          !!user.presence &&
          user.presence !== null &&
          user.presence.game !== null &&
          user.presence.game.name !== null
            ? user.presence.game.name
            : `null`;
        if (!docs || !docs[0]) {
          var userid = user.id;
          var username = user.username;
          var discriminator = user.discriminator;
          var ava = user.avatarURL;
          var joined = join;
          var created = user.createdTimestamp;
          var userRep = 0;
          var msgChan = `null`;
          var msgCont = `null`;
          var msgID = `null`;
          var msgTime = `null`;
          var cmdChan = `null`;
          var cmdCont = `null`;
          var cmdID = `null`;
          var cmdTime = `null`;
          var newProfile = {
            accUserID: userid,
            accUsername: username,
            accDiscriminator: discriminator,
            accAvatar: ava,
            accJoinedDate: joined,
            accCreatedDate: created,
            accRep: userRep
          };
          newEntry(`users`, newProfile);
        } else {
          var userid = docs[0].accUserID;
          var username = docs[0].accUsername;
          var discriminator = docs[0].accDiscriminator;
          var ava = docs[0].accAvatar;
          var joined = moment(docs[0].accJoinedDate)
            .tz(`America/Los_Angeles`)
            .format(`MM-DD-YYYY hh:mm a z`);
          var created = moment(docs[0].accCreatedDate)
            .tz(`America/Los_Angeles`)
            .format(`MM-DD-YYYY hh:mm a z`);
          var userRep = docs[0].accRep;
          var msgTime =
            moment(docs[0].lastMsg.msgTime)
              .tz(`America/Los_Angeles`)
              .format(`MM-DD-YYYY hh:mm a z`) || `null`;
          var msgID = docs[0].lastMsg.msgID || `null`;
          var msgCont = docs[0].lastMsg.msgCont || `null`;
          var msgChan = docs[0].lastMsg.msgChan || `null`;
          var cmdTime =
            moment(docs[0].lastCMD.cmdTime)
              .tz(`America/Los_Angeles`)
              .format(`MM-DD-YYYY hh:mm a z`) || `null`;
          var cmdID = docs[0].lastCMD.cmdID || `null`;
          var cmdCont = docs[0].lastCMD.cmdCont || `null`;
          var cmdChan = docs[0].lastCMD.cmdChan || `null`;
        }
        if (userRep == 0) {
          var rep = `none`;
        } else {
          var rep = userRep;
        }
        if (joined == null) var joined = `error getting this data`;
        if (created == null) var created = `error getting this data`;
        ava =
          ava !== null
            ? ava
            : `https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png`;
        let status =
          user.presence !== null && user.presence.status !== null
            ? user.presence.status
            : `Offline`;
        let embed = {
          author: { name: `Who Is: ${username}`, icon_url: ava },
          color: 0x47d70c,
          thumbnail: { url: ava },
          fields: [
            { name: `User`, value: `${username}#${discriminator}`, inline: !0 },
            { name: `ID`, value: userid, inline: !0 },
            { name: `Nickname`, value: nickname, inline: !0 },
            { name: `Game`, value: game, inline: !0 },
            { name: `Status`, value: status, inline: !0 },
            { name: `Reputation`, value: rep, inline: !0 },
            { name: `Roles`, value: roles.join(`, `), inline: !0 },
            { name: `Voice Channel`, value: inVoice, inline: !0 },
            {
              name: `Last Message`,
              value:
                `${msgTime}\n` +
                `Channel: ${msgChan}\n` +
                `Content: ${msgCont}\n` +
                `ID: ${msgID}`,
              inline: !0
            },
            {
              name: `Last Command`,
              value:
                `${cmdTime}\n` +
                `Channel: ${cmdChan}\n` +
                `Content: ${cmdCont}\n` +
                `ID: ${cmdID}`,
              inline: !0
            },
            { name: `Joined On`, value: joined, inline: !1 },
            { name: `Account Created On`, value: created, inline: !1 }
          ]
        };
        msg.channel.send(``, { embed });
        var time = moment()
          .tz(`America/Los_Angeles`)
          .format(`MM-DD-YYYY hh:mm a`);
        bot.channels
          .get(modLogChannel)
          .send(
            `[${time} PST][${pm2Name}]` +
              ` ${msg.author.username} looked up profile for ${user.username}`
          );
      }
    }
  }
};
