`use strict`;
let inPrivate = require(`../helpers.js`).inPrivate;
let hasExcludedSpamChannels = require(`../helpers.js`).hasExcludedSpamChannels;
let findEntry = require(`../db-helpers.js`).findEntry;
let newEntry = require(`../db-helpers.js`).newEntry;
let updateEntry = require(`../db-helpers.js`).updateEntry;
let { prefix } = require(`config`).bot;
exports.custom = [`UserDBs`];
exports.UserDBs = function(bot) {
  bot.on(`message`, msg => {
    if (msg.author.id != bot.user.id) {
      if (
        !msg.author.presence.status ||
        msg.author.presence.status == `offline` ||
        msg.author.presence.status == `invisible`
      ) {
        return;
      }
      findEntry(bot, msg, `users`, `accUserID`, msg.author.id, findProfile);
      function findProfile(bot, msg, gotProfile) {
        if (!gotProfile) {
          var guild = bot.guilds.find(
            guild => guild.name === `developer.ravencoin.online`
          );
          if (
            !guild ||
            !guild.member(msg.author) ||
            !guild.member(msg.author).joinedTimestamp
          ) {
            var joindate = null;
          } else {
            var joindate = guild.member(msg.author).joinedTimestamp;
          }
          var created = msg.author.createdTimestamp;
          var msgChan, msgCont, msgID, msgTime;
          var cmdChan, cmdCont, cmdID, cmdTime;
          if (msg.content.startsWith(prefix)) {
            cmdChan = msg.channel
              ? msg.channel.name
              : msg.channel.name || `null`;
            cmdCont = msg.content.replace(/^(.{20}[^\s]*).*/, `$1`) || `null`;
            cmdID = msg.id || `null`;
            cmdTime = msg.createdTimestamp;
            msgChan = msg.channel
              ? msg.channel.name
              : msg.channel.name || `null`;
            msgCont = msg.content.replace(/^(.{20}[^\s]*).*/, `$1`) || `null`;
            msgID = msg.id || `null`;
            msgTime = msg.createdTimestamp;
          } else if (!msg.content.startsWith(prefix)) {
            msgChan = msg.channel
              ? msg.channel.name
              : msg.channel.name || `null`;
            msgCont = msg.content.replace(/^(.{20}[^\s]*).*/, `$1`) || `null`;
            msgID = msg.id || `null`;
            msgTime = msg.createdTimestamp;
            cmdChan = `null`;
            cmdCont = `null`;
            cmdID = `null`;
            cmdTime = `null`;
          } else {
            msgChan = `null`;
            msgCont = `null`;
            msgID = `null`;
            msgTime = `null`;
            cmdChan = `null`;
            cmdCont = `null`;
            cmdID = `null`;
            cmdTime = `null`;
          }
          var newProfile = {
            accUserID: msg.author.id,
            accUsername: msg.author.username,
            accDiscriminator: msg.author.discriminator,
            accAvatar: msg.author.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: created,
            accRep: 1,
            lastMsg: {
              msgTime: msgTime,
              msgID: msgID,
              msgChan: msgChan,
              msgCont: msgCont
            },
            lastCMD: {
              cmdTime: cmdTime,
              cmdID: cmdID,
              cmdChan: cmdChan,
              cmdCont: cmdCont
            }
          };
          newEntry(bot, msg, `users`, newProfile);
        } else {
          var msgChan, msgCont, msgID;
          var cmdChan, cmdCont, cmdID;
          if (msg.content.startsWith(prefix)) {
            cmdChan = msg.channel
              ? msg.channel.name
              : msg.channel.name || `null`;
            cmdCont = msg.content.replace(/^(.{20}[^\s]*).*/, `$1`) || `null`;
            cmdID = msg.id || `null`;
            cmdTime = msg.createdTimestamp;
            msgChan = gotProfile[0].lastMsg.msgChan;
            msgCont = gotProfile[0].lastMsg.msgCont;
            msgID = gotProfile[0].lastMsg.msgID;
            msgTime = gotProfile[0].lastMsg.msgTime;
          } else if (!msg.content.startsWith(prefix)) {
            msgChan = msg.channel
              ? msg.channel.name
              : msg.channel.name || `null`;
            msgCont = msg.content.replace(/^(.{20}[^\s]*).*/, `$1`) || `null`;
            msgID = msg.id || `null`;
            msgTime = msg.createdTimestamp;
            cmdChan = gotProfile[0].lastCMD.cmdChan;
            cmdCont = gotProfile[0].lastCMD.cmdCont;
            cmdID = gotProfile[0].lastCMD.cmdID;
            cmdTime = gotProfile[0].lastCMD.cmdTime;
          } else {
            msgChan = `null`;
            msgCont = `null`;
            msgID = `null`;
            msgTime = `null`;
            cmdChan = `null`;
            cmdCont = `null`;
            cmdID = `null`;
            cmdTime = `null`;
          }
          var rep = Number(gotProfile[0].accRep);
          if (!hasExcludedSpamChannels(msg)) {
            rep = rep + 1;
          }
          var updateProfile = {
            accUsername: msg.author.username,
            accDiscriminator: msg.author.discriminator,
            accAvatar: msg.author.avatarURL,
            accRep: rep,
            lastMsg: {
              msgTime: msgTime,
              msgID: msgID,
              msgChan: msgChan,
              msgCont: msgCont
            },
            lastCMD: {
              cmdTime: cmdTime,
              cmdID: cmdID,
              cmdChan: cmdChan,
              cmdCont: cmdCont
            }
          };
          updateEntry(
            bot,
            msg,
            `users`,
            `accUserID`,
            msg.author.id,
            updateProfile
          );
        }
      }
    }
  });
  bot.on(`guildMemberAdd`, member => {
    if (!member) return;
    findEntry(bot, member, `users`, `accUserID`, member.id, findProfile);
    function findProfile(bot, member, gotProfile) {
      if (gotProfile) {
        var updateProfile = {
          accUsername: member.accUsername,
          accDiscriminator: member.accDiscriminator,
          accAvatar: member.accAvatar,
          accRep: Number(gotProfile[0].accRep) + 1
        };
        updateEntry(
          bot,
          msg,
          `users`,
          `accUserID`,
          msg.author.id,
          updateProfile
        );
      } else {
        var guild = bot.guilds.find(
          guild => guild.name === `developer.ravencoin.online`
        );
        if (
          !guild ||
          !guild.member(member) ||
          !guild.member(member).joinedTimestamp
        ) {
          var joindate = null;
        } else {
          var joindate = guild.member(member).joinedTimestamp;
        }
        var created = member.createdTimestamp;
        newEntry(`users`, {
          accUserID: member.id,
          accUsername: member.username,
          accDiscriminator: member.discriminator,
          accAvatar: member.avatarURL,
          accJoinedDate: joindate,
          accCreatedDate: created,
          accRep: 0
        });
      }
    }
  });
};
