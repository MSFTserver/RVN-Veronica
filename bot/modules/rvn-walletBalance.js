let needle = require('needle');
let config = require('config');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = [
  'balance' // command that is in this file, every command needs it own export as shown below
];

exports.balance = {
  usage: '<Address>',
  description:
    'Displays current balance of ' + coinSymbol + ' address supplied',
  process: function(bot, msg, suffix) {
    var command = '!balance';
    words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (
      words[0] == 'dev' ||
      words[0] == 'devfund' ||
      words[0] == 'market' ||
      words[0] == 'marketfund' ||
      words[0] == 'marketingfund' ||
      words[0] == 'marketing'
    ) {
      if (words[0] == 'dev' || words[0] == 'devfund') {
        var address = 'RW3x4EfTRAtPV2DeKexwFgp8wb4TSYebZA';
      } else {
        var address = 'RXYnS1zrMMSiphwaGemdck66fawqrUFJkv';
      }
    } else {
      var address = words[0];
    }
    if (!inPrivate(msg) && !hasRvnCalcPriceChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to balance bot.'
      );
      return;
    }
    if (address == undefined) {
      msg.channel.send('please supply a address!');
      return;
    }
    needle.get(explorerApiUrl + 'ext/getbalance/' + address, function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send(explorerApiUrl + ' API is not available');
      } else {
        var data = response.body;
        if (data.error) {
          msg.channel.send('Error: ' + data.error);
          return;
        }
        var balance = data.split('.');
        var description =
          'Current balance: ' +
          numberWithCommas(balance[0]) +
          '.' +
          balance[1] +
          ' ' +
          coinSymbol +
          '';
        msg.channel.send(description);
        return;
      }
    });
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
