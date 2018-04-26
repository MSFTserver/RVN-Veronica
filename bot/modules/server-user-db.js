let inPrivate = require('../helpers.js').inPrivate;
let hasExcludedSpamChannels = require('../helpers.js').hasExcludedSpamChannels;
let findEntry = require('../db-helpers.js').findEntry;
let newEntry = require('../db-helpers.js').newEntry;
let updateEntry = require('../db-helpers.js').updateEntry;

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
      findEntry(bot, msg, 'users', 'accUserID', msg.author.id, findProfile);
      function findProfile(bot, msg, gotProfile) {
        if (!gotProfile) {
          if (
            !msg.guild ||
            !msg.guild.member(msg.author) ||
            !msg.guild.member(msg.author).joinedAt
          ) {
            var joindate = null;
          } else {
            var joindate = msg.guild.member(msg.author).joinedAt.toString();
          }
          var newProfile = {
            accUserID: msg.author.id,
            accUsername: msg.author.username,
            accDiscriminator: msg.author.discriminator,
            accAvatar: msg.author.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: msg.author.createdAt,
            accRep: 1
          };
          newEntry(bot, msg, 'users', newProfile);
        } else {
          var updateProfile = {
            accRep: Number(gotProfile[0].accRep) + 1
          };
          updateEntry(
            bot,
            msg,
            'users',
            'accUserID',
            msg.author.id,
            updateProfile
          );
        }
      }
    }
  });
};
