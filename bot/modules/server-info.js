const discord = require('discord.js');
let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;

exports.commands = ['serverstats'];

exports.serverstats = {
  usage: '',
  description: ':desktop: :cop: Displays server stats :cop: :desktop:',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not Use This Command In DMs!');
      return;
    }
    if (hasPerms(msg)) {
      var data = msg.guild;
      var ServerName = data.name;
      var ServerImg = data.iconURL;
      var ServerOwner = data.owner.user;
      var Members = data.memberCount;
      var Online = data.members.filter(m => m.presence.status === 'online')
        .size;
      var Away = data.members.filter(m => m.presence.status === 'idle').size;
      var DND = data.members.filter(m => m.presence.status === 'dnd').size;
      var Offline = Members - (Online + Away);
      var Emojis = data.emojis.size;
      var Roles = data.roles.size;
      var TxtChannels = data.channels.filter(m => m.type === 'text').size;
      var VcChannels = data.channels.filter(m => m.type === 'voice').size;
      var Categories = data.channels.filter(m => m.type === 'category').size;
      var Region = data.region;
      var ServerID = data.id;
      var Created = data.createdAt;
      var Filtering = data.explicitContentFilter;
      var Verification = data.verificationLevel;
      var MFA = data.mfaLevel ? "Enabled" : "Disabled";
      var Notifications = data.defaultMessageNotifications
      if (!Filtering) {
        Filtering = "Don't scan any messages."
      } else if (Filtering === 2) {
        Filtering = "Scanning all messages sent"
      } else {
        Filtering = "Scan messages sent by all members."
      }
      if (!Verification) {
        Verification = "None."
      } else if (Verification === 2) {
        Verification = "Verified email also have been a member longer than 5min"
      } else if (Verification === 3) {
        Verification = "Verified email also have been a member longer than 10min"
      } else if (Verification === 4) {
        Verification = "Verified Phone Number!"
      } else {
        Verification = "Verified email"
      }
      const embed = new discord.RichEmbed();
      embed
        .setDescription("__**Owner Info**__\n" +
        "**Username**: " + ServerOwner.username + "#" + ServerOwner.discriminator + "\n" +
        "**ID**: " + ServerOwner.id + "\n\n" +
        "__**Server Info**__\n" +
        "**Invite URL**: http://discord.ravencoin.online\n" +
        '**Server ID**: ' + ServerID + "\n" +
        '**Created**: ' + Created + "\n" +
        '**Region**: ' + Region + "\n\n" +
        '__**Security Info**__\n' +
        '**Notifications**: ' + Notifications + "\n" +
        '**Verification**: ' + Verification + "\n" +
        '**Filtering**: ' + Filtering + "\n" +
        '**Multi-Factor**: ' + MFA + "\n\n" +
        "__**Server Stats**__\n" +
        '**Emojis**: ' + Emojis + "\n" +
        '**Roles**:' + Roles + "\n" +
        '**Catagories**: ' + Categories + "\n" +
        '**Text Channels**: ' + TxtChannels + "\n" +
        '**Voice Channels**: ' + VcChannels + "\n\n" +
        '__**User Stats**__\n' +
        '**Online**: ' + Online + "\n" +
        '**Idle**: ' + Away + "\n" +
        '**DND**: ' + DND + "\n" +
        '**Offline**: ' + Offline + "\n" +
        '**Total**: ' + Members)
        .setColor(7976557)
        .setAuthor(ServerName, ServerImg);
      msg.channel.send({ embed });
    } else {
      msg.channel
        .send('only Moderators can use this command')
        .then(message => message.delete(10000));
    }
  }
};
