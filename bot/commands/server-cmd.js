`use strict`;
let cmd = require('node-run-cmd');
let inSpam = require(`../helpers/cmd-helper.js`).inSpam;
let config = require(`config`);
let channelID = config.get(`General`).Channels.botspam;
exports.commands = [`cmd`];
exports.cmd = {
  usage: ``,
  description: ``,
  process: async function(bot, msg, suffix) {
    if (msg.author.id !== msg.guild.owner.id) return;
    if (!inSpam(msg)) {
      msg.channel.send(`Please use <#${channelID}> to talk to cmd bot.`);
      return;
    }
    if (!suffix.length) {
      msg.channel.send(`Please supply command argument <bash>`);
      return;
    }
    cmd.run(suffix.join(` `),{shell:true}).then(function(err) {
      if(parseInt(err) !== 0){
      msg.channel.send(err);
      return;
      }
      msg.channel.send(`Done!`);
    });
  }
};
