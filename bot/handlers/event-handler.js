let moment = require(`moment-timezone`);
let { checkMessageForCommand } = require(`./cmd-handler.js`);
let config = require(`config`);
let { logChannel } = config.get(`moderation`);
let { pm2Name } = config.get(`General`);
let { prefix } = config.get(`bot`);
exports.eventHandler = function(bot) {
  bot.on(`ready`, async function() {
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    console.log(
      `[${time} PST][${pm2Name}]` +
        ` Logged in! Serving in ${bot.guilds.array().length} servers`
    );
    bot.user.setActivity(`${prefix}help`);
    bot.channels
      .get(logChannel)
      .send(`[${time} PST][${pm2Name}] Bot Activated :rocket:`);
    bot.channels
      .get(logChannel)
      .send(
        `[${time} PST][${pm2Name}]` +
          ` Logged in! Serving in ${bot.guilds.array().length} servers`
      );
  });
  bot.on(`message`, msg => {
    checkMessageForCommand(msg, bot, !1);
  });
  bot.on(`messageUpdate`, (oldMessage, newMessage) => {
    checkMessageForCommand(newMessage, bot, !0);
  });
};
