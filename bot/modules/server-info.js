const discord = require('discord.js');
let hasPerms = require('../helpers.js').hasPerms;

exports.commands = [
  'serverstats' // command name that will be used for next lines of code below
];

exports.serverstats = {
  usage: '', //command usage like !demo <@username>, exclude !demo
  description: 'Displays server stats', //the description of command for !help command
  process: function(bot, msg, suffix) {
    if (hasPerms(msg)) {
      var data = msg.guild;
      var ServerName = data.name;
      var ServerImg = data.iconURL;
      var ServerOwner = data.owner.user.username;
      var Members = data.memberCount;
      var Online = data.members.filter(m => m.presence.status === 'online')
        .size;
      var Away = data.members.filter(m => m.presence.status === 'idle').size;
      var Offline = Members - (Online + Away);
      var Emojis = data.emojis.size;
      var Roles = data.roles;
      var RolesList = Roles.map(g => g.name);
      var RolesArray = [];
      for (var i = 1; i <= Number(Roles.size) - 1; ++i) {
        RolesArray.push(
          RolesList[i] + ': ' + Roles.find('name', RolesList[i]).members.size
        );
      }
      var halfWayThough = Math.floor(RolesArray.length / 2);
      var arrayFirstHalf = RolesArray.slice(0, halfWayThough);
      var arraySecondHalf = RolesArray.slice(halfWayThough, RolesArray.length);
      const embed = new discord.RichEmbed();
      embed
        .addField('**Server Owner**: ', ServerOwner, true)
        .addField('**Emojis**: ', Emojis, true)
        .addField('**Total Users**: ', Members, true)
        .addField('**Online Users**: ', Online, true)
        .addField('**Idle Users**: ', Away, true)
        .addField('**Offline Users**: ', Offline, true)
        .addField('__**Total Roles**__:', Roles.size, false)
        .addField('*List of Servers Roles 1*', arrayFirstHalf, true)
        .addField('*List of Servers Roles 2*', arraySecondHalf, true)
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
