`use strict`;
const fs = require(`fs`),
  path = require(`path`);
function getPlugins(srcpath) {
  return fs.readdirSync(srcpath);
}
let plugin_directory = path.join(__dirname, `../`, `commands`);
let plugins = getPlugins(plugin_directory);
let moment = require(`moment-timezone`);
let config = require(`config`);
let { pm2Name } = config.get(`General`);
exports.pluginHandler = function(bot) {
  load_plugins(bot);
};
function load_plugins(bot) {
  const dbot = require(`./cmd-handler.js`);
  let commandCount = 0;
  let otherFunc = 0;
  for (let i = 0; i < plugins.length; i++) {
    let plugin;
    try {
      plugin = require(`${plugin_directory}/${plugins[i]}`);
    } catch (err) {
      var time = moment()
        .tz(`America/Los_Angeles`)
        .format(`MM-DD-YYYY hh:mm a`);
      console.log(
        `[${time} PST][${pm2Name}]` +
          ` Improper setup of the ${plugins[i]} plugin. : ${err}`
      );
    }
    if (plugin) {
      if (`commands` in plugin) {
        for (let j = 0; j < plugin.commands.length; j++) {
          if (plugin.commands[j] in plugin) {
            dbot.addCommand(
              bot,
              plugin.commands[j],
              plugin[plugin.commands[j]]
            );
            commandCount++;
          }
        }
      }
      if (`custom` in plugin) {
        for (let j = 0; j < plugin.custom.length; j++) {
          if (plugin.custom[j] in plugin) {
            dbot.addCustomFunc(bot, plugin[plugin.custom[j]]);
            otherFunc++;
          }
        }
      }
    }
  }
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  console.log(
    `[${time} PST][${pm2Name}]` +
      ` Loaded ${dbot.commandCount()} chat commands` +
      ` and ${otherFunc} custom functions.`
  );
}
