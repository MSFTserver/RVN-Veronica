`use strict`;
let moment = require(`moment-timezone`);
let { inSpam } = require(`../helpers/cmd-helper.js`);
let config = require(`config`);
let { pm2Name } = config.get(`General`);
let channelID = config.get(`General`).Channels.botspam;
exports.commands = [`uptime`];
exports.uptime = {
  usage: ``,
  description: `gets Uptime for Bot`,
  process: function(bot, msg, suffix) {
    if (!inSpam(msg)) {
      msg.channel.send(`Please use <#${channelID}> to talk to uptime bot.`);
      return;
    }
    var started = moment(bot.readyAt)
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm:ss a z`);
    let sec = Math.floor(bot.uptime / 1000);
    let min = Math.floor(sec / 60);
    sec = sec % 60;
    let hrs = Math.floor(min / 60);
    min = min % 60;
    let days = Math.floor(hrs / 24);
    hrs = hrs % 24;
    if (!sec) {
      sec = `00s`;
    } else if (sec < 10) {
      sec = `0${sec}s`;
    } else {
      sec += `s`;
    }
    if (!min) {
      min = `00m:`;
    } else if (min < 10) {
      min = `0${min}m:`;
    } else {
      min += `m:`;
    }
    if (!hrs) {
      hrs = `00h:`;
    } else if (hrs < 10) {
      hrs = `0${hrs}h:`;
    } else {
      hrs += `h:`;
    }
    if (!days) {
      days = `000d:`;
    } else if (days < 10) {
      days = `00${days}d:`;
    } else if (days >= 10) {
      days = `0${days}d:`;
    } else {
      days += `d:`;
    }
    var t = `    `;
    msg.channel.send(
      `**Started**:\n${t}${started}\n` +
        `**Uptime**:\n${t}${days}${hrs}${min}${sec}\n`
    );
  }
};
