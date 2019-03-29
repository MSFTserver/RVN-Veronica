`use strict`;
const Discord = require(`discord.js`);
let commands = require(`../../config/commands.json`);
let config = require(`config`);
let { prefix } = config.get(`bot`);
let initialized = !1;
let discordBot = null;
let commandsList = null;
exports.cmdHandler = function(discordBot_) {
  if (initialized) {
    throw new Error(`init was already called once`);
  }
  discordBot = discordBot_;
  discordBot.on(`message`, checkForCommand);
};
let checkForCommand = function(message) {
  let firstRun = !1;
  if (commandsList === null) {
    firstRun = !0;
    commandsList = ``;
  }
  Object.keys(commands).forEach(command => {
    discordBot.commands[command] = commands[command];
    if (firstRun) {
      commandsList += prefix + command + `, `;
    }
    if (
      !message.author.bot &&
      message.content.toLowerCase().indexOf(command.toLowerCase()) >= 0 &&
      commands[command].operation === `send`
    ) {
      message.channel.send(``, new Discord.RichEmbed(commands[command].bundle));
    }
  });
  commandFound(message);
};
function commandFound(message) {
  if (
    !message.author.bot &&
    message.content.toLowerCase().indexOf(`${prefix}helpcommands`) >= 0
  ) {
    let bundle = commands[`helpcommands`].bundle;
    commandsList = commandsList.replace(/,\s$/g, ``);
    bundle.description = `**${commandsList}**`;
    message.channel.send(``, new Discord.RichEmbed(bundle));
  }
}
