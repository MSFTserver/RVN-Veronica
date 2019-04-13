`use strict`;
const Discord = require(`discord.js`);
let tags = require(`../../config/tags.json`);
let config = require(`config`);
let { prefix } = config.get(`bot`);
let initialized = !1;
let discordBot = null;
let tagsList = null;
exports.tagHandler = function(discordBot_) {
  if (initialized) {
    throw new Error(`init was already called once`);
  }
  discordBot = discordBot_;
  discordBot.on(`message`, checkForTag);
};
let checkForTag = function(message) {
  let firstRun = !1;
  if (tagsList === null) {
    firstRun = !0;
    tagsList = ``;
  }
  Object.keys(tags).forEach(tag => {
    discordBot.commands[tag] = tags[tag];
    if (firstRun) {
      tagsList += prefix + tag + `, `;
    }
    if (
      !message.author.bot &&
      message.content.toLowerCase().indexOf(tag.toLowerCase()) >= 0 &&
      tags[tag].operation === `send`
    ) {
      message.channel.send(``, new Discord.RichEmbed(tags[tag].bundle));
    }
  });
  tagFound(message);
};
function tagFound(message) {
  if (
    !message.author.bot &&
    message.content.toLowerCase().indexOf(`${prefix}tags`) >= 0
  ) {
    let bundle = tags[`tags`].bundle;
    tagsList = tagsList.replace(/,\s$/g, ``);
    bundle.description = `**${tagsList}**`;
    message.channel.send(``, new Discord.RichEmbed(bundle));
  }
}
