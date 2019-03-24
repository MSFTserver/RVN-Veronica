let fetch = require(`node-fetch`);
let inSpam = require(`../helpers.js`).inSpam;
let qs = require(`querystring`);
const performance = require(`perf_hooks`).performance;
exports.commands = [`djsdocs`];
exports.djsdocs = {
  usage: ``,
  description: ``,
  process: async function(bot, msg, suffix) {
    if (!inSpam(msg)) {
      msg.channel.send(`Please use <#${channelID}> to talk to d.js docs bot.`);
      return;
    }
    query = suffix;
    let project = `main`;
    let branch = [`stable`, `master`, `rpc`, `commando`].includes(
      query.slice(-1)[0]
    )
      ? query.pop()
      : `stable`;
    if ([`rpc`, `commando`].includes(branch)) {
      project = branch;
      branch = `master`;
    }
    const queryString = qs.stringify({ q: query.join(` `), flag: `--force` });
    const res = await fetch(
      `https://djsdocs.sorta.moe/${project}/${branch}/embed?${queryString}`
    );
    const embed = await res.json();
    if (!embed) {
      return msg.channel.reply(
        `Veronica couldn't find the requested information. Maybe look for something that actually exists the next time!`
      );
    }
    if (
      msg.channel.type === `dm` ||
      !msg.channel
        .permissionsFor(msg.guild.me)
        .has([`ADD_REACTIONS`, `MANAGE_MESSAGES`], !1)
    ) {
      return msg.channel.send({ embed });
    }
    const message = await msg.channel.send({ embed });
    message.react(`🗑`);
    let react;
    try {
      react = await message.awaitReactions(
        (reaction, user) =>
          reaction.emoji.name === `🗑` && user.id === msg.author.id,
        { max: 1, time: 5000, errors: [`time`] }
      );
    } catch (error) {
      message.clearReactions();
      return msg;
    }
    react.first().message.delete();
    msg.delete();
    return msg;
  }
};
