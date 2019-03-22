let inPrivate = require("../helpers.js").inPrivate;
let hasExcludedSpamChannels = require("../helpers.js").hasExcludedSpamChannels;
let findEntry = require("../db-helpers.js").findEntry;
let newEntry = require("../db-helpers.js").newEntry;
let updateEntry = require("../db-helpers.js").updateEntry;

exports.custom = ["UserDBs"];

exports.UserDBs = function(bot) {
  bot.on("message", msg => {
    if (msg.author.id != bot.user.id) {
      if (inPrivate(msg)) {
        return;
      }
      if (hasExcludedSpamChannels(msg)) {
        return;
      }
      if (
        !msg.author.presence.status ||
        msg.author.presence.status == "offline" ||
        msg.author.presence.status == "invisible"
      ) {
        return;
      }
      findEntry(bot, msg, "users", "accUserID", msg.author.id, findProfile);
      function findProfile(bot, msg, gotProfile) {
        if (!gotProfile) {
          var guild = bot.guilds.find(
            guild => guild.name === "developer.ravencoin.online"
          );
          if (
            !guild ||
            !guild.member(msg.author) ||
            !guild.member(msg.author).joinedAt
          ) {
            var joindate = null;
          } else {
            var joindate = moment(guild.member(msg.author).joinedAt)
              .tz("America/Los_Angeles")
              .format("MM-DD-YYYY hh:mm a z");
          }
          var created = moment(msg.author.createdAt)
            .tz("America/Los_Angeles")
            .format("MM-DD-YYYY hh:mm a z");
          var newProfile = {
            accUserID: msg.author.id,
            accUsername: msg.author.username,
            accDiscriminator: msg.author.discriminator,
            accAvatar: msg.author.avatarURL,
            accJoinedDate: joindate,
            accCreatedDate: created,
            accRep: 1
          };
          newEntry(bot, msg, "users", newProfile);
        } else {
          var updateProfile = {
            accUsername: msg.author.username,
            accDiscriminator: msg.author.discriminator,
            accAvatar: msg.author.avatarURL,
            accRep: Number(gotProfile[0].accRep) + 1
          };
          updateEntry(
            bot,
            msg,
            "users",
            "accUserID",
            msg.author.id,
            updateProfile
          );
        }
      }
    }
  });
  bot.on("guildMemberAdd", member => {
    if (!member) return;
    findEntry(bot, member, "users", "accUserID", member.id, findProfile);
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
          "users",
          "accUserID",
          msg.author.id,
          updateProfile
        );
      } else {
        var guild = bot.guilds.find(
          guild => guild.name === "developer.ravencoin.online"
        );
        if (!guild || !guild.member(member) || !guild.member(member).joinedAt) {
          var joindate = null;
        } else {
          var joindate = moment(guild.member(member).joinedAt)
            .tz("America/Los_Angeles")
            .format("MM-DD-YYYY hh:mm a z");
        }
        var created = moment(member.createdAt)
          .tz("America/Los_Angeles")
          .format("MM-DD-YYYY hh:mm a z");
        newEntry("users", {
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
