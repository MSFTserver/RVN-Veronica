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
let inSpam = require(`../helpers.js`).inSpam;
exports.commands = [`eval`];
exports.eval = {
  usage: ``,
  description: ``,
  process: async function(bot, msg, suffix) {
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
      if (evaled.length > 950) {
        post = evaled.replace(/^(.{950}[^\s]*).*/, `$1`);
        post = await hastebin(post, `js`);
        message =
          `**Eval**:\n\`${code}\`\n`+
          `**Evaluated**:🔵 (${evaledt})\n` +
          `response was to long instead i posted it to hastebin for you:\n` +
          ` ${post}`;
      } else {
        message =
          `**Eval**: \`${code}\`\n`+
          `**Evaluated**:🔵 (${evaledt})\n` + `\`\`\`xl\n${evaled}\n\`\`\``;
      }
      msg.channel.send(message);
      inSpam = require(`../helpers.js`).inSpam;
    } catch (err) {
      err = await clean(err);
      msg.channel.send(
        `**Eval**:\n\`${code}\`\n`+
        `**Evaluated**:🔴\n\`\`\`xl\n${err}\n\`\`\``
      );
      inSpam = require(`../helpers.js`).inSpam;
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
