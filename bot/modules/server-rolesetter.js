`use strict`;
let moment = require(`moment-timezone`);
let inPrivate = require(`../helpers.js`).inPrivate;
let inSpam = require(`../helpers.js`).inSpam;
let config = require(`config`);
let serverRolesetter = config.get(`serverRolesetter`);
let channelID = config.get(`General`).Channels.botspam;
exports.commands = [`addrole`, `delrole`, `roles`];
exports.addrole = {
  usage: `<role>`,
  description: `Adds you to specified role`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send(`You Can Not set roles In DMs!`);
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(`please use <#${channelID}> to talk to RoleSetter Bot`);
      return;
    }
    var role = suffix[0];
    if (!role) {
      msg.channel.send(
        `Please specify a role. Type !roles to see which you may add!`
      );
      return;
    }
    if (!serverRolesetter.allowedroles.includes(role)) {
      msg.channel.send(
        `That role is not one you can add yourself too! Please run the !roles command to find out which ones are allowed.`
      );
      return;
    }
    var newrole = msg.guild.roles.find(val => val.name === role);
    if (!newrole) {
      msg.channel.send(`The role \`${role}\` does not exist!`);
      return;
    }
    if (msg.member.roles.find(val => val.name === role)) {
      msg.channel.send(`It seems that you already have that role!`);
      return;
    }
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    var roles = [];
    for (i = 0; i < serverRolesetter.allowedroles.length; i++) {
      if (
        msg.member.roles.find(
          val => val.name === serverRolesetter.allowedroles[i]
        )
      ) {
        roles.push(
          msg.guild.roles.find(
            val => val.name === serverRolesetter.allowedroles[i]
          )
        );
      }
    }
    msg.member
      .removeRoles(roles)
      .then(() => msg.member.addRole(newrole))
      .then(() =>
        msg.channel.send(`${msg.member} has been added to the ${role} role!`)
      )
      .catch(console.error);
  }
};
exports.delrole = {
  usage: `<role>`,
  description: `Deletes your role specified`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send(`You Can Not set roles In DMs!`);
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(`please use <#${channelID}> to talk to RoleSetter Bot`);
      return;
    }
    var role = suffix[0];
    if (!role) {
      msg.channel.send(
        `Please specify a role. Type !roles to see which you may add!`
      );
    }
    if (!serverRolesetter.allowedroles.includes(role)) {
      msg.channel.send(
        `That role is not one you can add yourself too! Please run the !roles command to find out which ones are allowed.`
      );
    }
    let oldrole = msg.guild.roles.find(val => val.name === role);
    if (!oldrole) {
      msg.channel.send(`The role \`${role}\` does not exist!`);
    }
    if (!msg.member.roles.find(val => val.name === role)) {
      msg.channel.send(
        `You do not seem to have that role! Try adding it first with the !addrole command!`
      );
    }
    msg.member
      .removeRole(oldrole)
      .then(
        msg.channel.send(
          `${msg.member} has been removed from the ${role} role!`
        )
      );
  }
};
exports.roles = {
  usage: ``,
  description: `displays roles you can give yourself`,
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send(`You Can Not set roles In DMs!`);
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(`please use <#${channelID}> to talk to RoleSetter Bot`);
      return;
    }
    msg.channel.send({
      embed: {
        color: 3447003,
        description: `You have accessed the role setter function!`,
        fields: [
          {
            name: `List of roles`,
            value: buildRoleString(serverRolesetter.allowedroles),
            inline: !1
          },
          {
            name: `How to add roles`,
            value: `\`!addrole green\` would add the role to yourself.`,
            inline: !1
          },
          {
            name: `How to remove roles`,
            value: `\`!delrole green\` would remove the role from yourself.`,
            inline: !1
          }
        ],
        footer: {
          icon_url: msg.author.avatarURL,
          text: `Requested by: ${JSON.stringify(msg.author.username)}`
        }
      }
    });
  }
};
function buildRoleString(roles) {
  let str = ``;
  for (let i = 0; i < roles.length; i++) {
    str += `\`` + roles[i] + `\`` + `\n`;
  }
  return str;
}
