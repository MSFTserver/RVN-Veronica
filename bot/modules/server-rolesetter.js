let config = require('config');
let serverRolesetter = config.get('serverRolesetter');
let inPrivate = require('../helpers.js').inPrivate;
let inSpam = require('../helpers.js').inSpam;
let channelID = config.get('General').Channels.botspam;
let Probe = require('pmx').probe();
let counter = 0;
let metric = Probe.metric({
  name: 'roles set',
  value: function() {
    return counter;
  }
});

exports.commands = ['addrole', 'delrole', 'roles'];

exports.addrole = {
  usage: '<role>',
  description: 'Adds you to specified role',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not set roles In DMs!');
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(
        'please use <#' + channelID + '> to talk to RoleSetter Bot'
      );
      return;
    }
    var newrole = msg.guild.roles.find('name', suffix);
    if (suffix) {
      if (serverRolesetter.allowedroles.includes(suffix)) {
        if (newrole !== null) {
          if (!msg.member.roles.find('name', suffix)) {
            counter++;
            msg.member
              .addRole(newrole)
              .then(
                msg.channel.send(
                  msg.member + ' has been added to the ' + suffix + ' role!'
                )
              );
          } else {
            msg.channel.send('It seems that you already have that role!');
          }
        } else {
          msg.channel.send(
            'The role ' + '`' + suffix + '`' + ' does not exist!'
          );
        }
      } else {
        msg.channel.send(
          'That role is not one you can add yourself too! Please run the !roles command to find out which ones are allowed.'
        );
      }
    } else {
      msg.channel.send(
        'Please specify a role. Type !roles to see which you may add!'
      );
    }
  }
};
exports.delrole = {
  usage: '<role>',
  description: 'Deletes your role specified',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not set roles In DMs!');
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(
        'please use <#' + channelID + '> to talk to RoleSetter Bot'
      );
      return;
    }
    let oldrole = msg.guild.roles.find('name', suffix);
    if (suffix) {
      if (serverRolesetter.allowedroles.includes(suffix)) {
        if (oldrole !== null) {
          if (msg.member.roles.find('name', suffix)) {
            msg.member
              .removeRole(oldrole)
              .then(
                msg.channel.send(
                  msg.member + ' has been removed from the ' + suffix + ' role!'
                )
              );
          } else {
            msg.channel.send(
              'You do not seem to have that role! Try adding it first with the !addrole command!'
            );
          }
        } else {
          msg.channel.send(
            'The role ' + '`' + suffix + '`' + ' does not exist!'
          );
        }
      } else {
        msg.channel.send(
          'That role is not one you can add yourself too! Please run the !roles command to find out which ones are allowed.'
        );
      }
    } else {
      msg.channel.send(
        'Please specify a role. Type !roles to see which you may add!'
      );
    }
  }
};
exports.roles = {
  usage: '',
  description: 'displays roles you can give yourself',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Can Not set roles In DMs!');
      return;
    }
    if (!inSpam(msg)) {
      msg.channel.send(
        'please use <#' + channelID + '> to talk to RoleSetter Bot'
      );
      return;
    }
    msg.channel.send({
      embed: {
        color: 3447003,
        description: 'You have accessed the role setter function!',
        fields: [
          {
            name: 'List of roles',
            value: buildRoleString(serverRolesetter.allowedroles),
            inline: false
          },
          {
            name: 'How to add roles',
            value: '`!addrole miner` would add the role to yourself.',
            inline: false
          },
          {
            name: 'How to remove roles',
            value: '`!delrole miner` would remove the role from yourself.',
            inline: false
          }
        ],
        footer: {
          icon_url: msg.author.avatarURL,
          text: 'Requested by: ' + JSON.stringify(msg.author.username)
        }
      }
    });
  }
};

function buildRoleString(roles) {
  let str = '';
  for (let i = 0; i < roles.length; i++) {
    str += '`' + roles[i] + '`' + '\n';
  }
  return str;
}
