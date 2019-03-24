let inSpam = require(`../helpers.js`).inSpam;
exports.commands = [`evalhelp`];
exports.evalhelp = {
  usage: ``,
  description: ``,
  process: function(bot, msg, suffix) {
    if (msg.author.id !== msg.guild.owner.id) return;
    if (!inSpam(msg)) {
      msg.channel.send(`Please use <#${channelID}> to talk to eval docs bot.`);
      return;
    }
    let t = `    `;
    let embed = {
      description:
        `__**d.js Vars**__:\n` +
        `${t}**bot** :` +
        ` [<client>](https://discord.js.org/#/docs/main/stable/class/Client)\n` +
        `${t}**msg** :` +
        ` [<message>](https://discord.js.org/#/docs/main/stable/class/Message)\n` +
        `${t}**suffix** :` +
        ` [<args>]` +
        `(https://discordjs.guide/creating-your-bot/commands-with-user-input.html)\n` +
        `\n` +
        `__**Global Included Vars**__\n` +
        `${t}**fetch** :` +
        ` [<node-fetch>](https://www.npmjs.com/package/node-fetch)\n` +
        `${t}**qs** :` +
        ` [<querystring>](https://nodejs.org/api/querystring.html)\n` +
        `${t}**performance** :` +
        ` [<perf_hooks>.<peformance>]` +
        `(https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performance)`
    };
    msg.channel.send({ embed });
  }
};
