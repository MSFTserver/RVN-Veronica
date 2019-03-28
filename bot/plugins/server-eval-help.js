`use strict`;
let { inSpam } = require(`../helpers/cmd-helper.js`);
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
        `\`\`\`js\nlet fetch = require(\`node-fetch\`);${t}${t}\n` +
        `let qs = require(\`querystring\`);${t}${t}\n` +
        `let moment = require(\`moment-timezone\`);${t}${t}\n` +
        `let fs = require(\`fs\`);${t}${t}\n` +
        `let Twitter = require(\`twitter-stream-api\`);${t}${t}\n` +
        `let _ = require(\`underscore-node\`);${t}${t}\n` +
        `let probe = require(\`pmx\`).probe();${t}${t}\n` +
        `let tcpp = require(\`tcp-ping\`);${t}${t}\n` +
        `const path = require(\`path\`);${t}${t}\n` +
        `const Discord = require(\`discord.js\`);${t}${t}\n` +
        `const mongoose = require(\`mongoose\`);${t}${t}\n` +
        `const { performance } = require(\`perf_hooks\`);${t}${t}\n` +
        `const hastebin = require(\`hastebin-gen\`);${t}${t}\n\`\`\``
    };
    msg.channel.send({ embed });
  }
};
