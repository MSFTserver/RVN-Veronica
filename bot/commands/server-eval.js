`use strict`;
let fetch = require(`node-fetch`);
let qs = require(`querystring`);
let moment = require(`moment-timezone`);
let fs = require(`fs`);
let Twitter = require(`twitter-stream-api`);
let _ = require(`underscore-node`);
let probe = require(`pmx`).probe();
let tcpp = require(`tcp-ping`);
const path = require(`path`);
const Discord = require(`discord.js`);
const mongoose = require(`mongoose`);
const { performance } = require(`perf_hooks`);
const hastebin = require(`hastebin-gen`);
let inSpam = require(`../helpers/cmd-helper.js`).inSpam;
let config = require(`config`);
let channelID = config.get(`General`).Channels.botspam;
exports.commands = [`eval`];
exports.eval = {
  usage: ``,
  description: ``,
  process: async function(bot, msg, suffix) {
    let node_modules = bot.node_modules;
    if (msg.author.id !== msg.guild.owner.id) return;
    if (!inSpam(msg)) {
      msg.channel.send(`Please use <#${channelID}> to talk to eval bot.`);
      return;
    }
    inSpam = null;
    const code = suffix.join(` `);
    try {
      var t0 = performance.now();
      let evaled = await eval(code);
      var t1 = performance.now();
      if (typeof evaled !== `string`) evaled = require(`util`).inspect(evaled);
      evaled = await clean(evaled);
      evaledt = `${(t1 - t0).toFixed(4)} ms`;
      let message;
      message = `**Eval**: \`${code}\`\n` + `**Evaluated**:🔵 (${evaledt})\n`;
      msg.channel.send(message);
      msg.channel.send(evaled, { split: true, code: "xl" });
      inSpam = require(`../helpers/cmd-helper.js`).inSpam;
    } catch (err) {
      err = await clean(err);
      msg.channel.send(
        `**Eval**:\n\`${code}\`\n` +
          `**Evaluated**:🔴\n\`\`\`xl\n${err}\n\`\`\``
      );
      inSpam = require(`../helpers/cmd-helper.js`).inSpam;
    }
    function clean(text) {
      if (typeof text === `string`) {
        return text
          .replace(/`/g, `\`` + String.fromCharCode(8203))
          .replace(/@/g, `@` + String.fromCharCode(8203));
      } else {
        return text;
      }
    }
  }
};
