let config = require('config');
let permRanks = config.get('moderation');
let admin = permRanks.admin;
let botDev = permRanks.botDev;
let poolOwner = permRanks.poolOwner;
let spamChannels = config.get('General').Channels.botspam;
let ExcludedSpam = config.get('spamdetection');
let rvnCalcPriceChannels = config.get('rvnCalcPrice');
let rvnStatsNetworkChannels = config.get('rvnStatsNetwork');
let rvnStatsMarketChannels = config.get('rvnStatsMarket');
let rvnPoolsChannels = config.get('rvnPools');
let serverWebsiteStatusChannels = config.get('serverWebsiteStatus');

// Checks if user is allowed to use a command only for mods/team members
exports.hasPerms = function(msg) {
  return msg.member.roles.some(r => permRanks.perms.includes(r.name));
};

// Checks if user is an Admin!
exports.isAdmin = function(msg) {
  return msg.member.roles.some(r => admin.includes(r.name));
};

// Checks if user is an Bot Dev!
exports.isBotDev = function(msg) {
  return msg.member.roles.some(r => botDev.includes(r.name));
};

// Checks if user is an pool Owner/Operator!
exports.isPoolOwner = function(msg) {
  return msg.member.roles.some(r => poolOwner.includes(r.name));
};

// Check if command was sent in dm
exports.inPrivate = function(msg) {
  return msg.channel.type == 'dm';
};

// Checks if Message was sent from spam Channel
exports.inSpam = function(msg) {
  return spamChannels == msg.channel.id;
};

// Checks if Message was sent from a Excluded Channel
exports.hasExcludedSpamChannels = function(msg) {
  return ExcludedSpam.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a Excluded user
exports.hasExcludedSpamUsers = function(msg) {
  return ExcludedSpam.users.includes(msg.author.id);
};

// Checks if Message was sent from a channel in rvnCalcPrice Channels list
exports.hasRvnCalcPriceChannels = function(msg) {
  return rvnCalcPriceChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in server-stats-network Channels list
exports.hasRvnStatsNetworkChannels = function(msg) {
  return rvnStatsNetworkChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in rvnStatsMarket Channels list
exports.hasRvnStatsMarketChannels = function(msg) {
  return rvnStatsMarketChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in RvnPools Channels list
exports.hasRvnPoolsChannels = function(msg) {
  return rvnPoolsChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in WebsiteStatus Channels list
exports.hasServerWebsiteStatusChannels = function(msg) {
  return serverWebsiteStatus.channels.includes(msg.channel.id);
};
