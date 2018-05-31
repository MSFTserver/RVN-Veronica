let needle = require('needle');
let config = require('config');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['address'];

exports.address = {
  usage: '<Address>',
  description:
    'Displays current balance of ' + coinSymbol + ' address supplied',
  process: function(bot, msg, suffix) {
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
    needle.get(
      explorerApiUrl + 'api/addr/' + address + '/?noTxList=1',
      function(error, response) {
        if (error || response.statusCode !== 200) {
          msg.channel.send(explorerApiUrl + ' API is not available');
        }
        var data = response.body;
        var balance = data.balance;
        var totalReceived = data.totalReceived;
        var totalSent = data.totalSent;
        var unconfirmedBalance = data.unconfirmedBalance;
        var txApperances = data.txApperances;
        if (unconfirmedBalance > 0) {
          var unconfirmedTxApperances = data.unconfirmedTxApperances;
          var description =
            'Details for **' +
            address +
            '**\n' +
            'Balance: **' +
            numberWithCommas(balance) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Received: **' +
            numberWithCommas(totalReceived) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Sent: **' +
            numberWithCommas(totalSent) +
            ' ' +
            coinSymbol +
            '**\n\n' +
            '# of tx: **' +
            numberWithCommas(txApperances) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Unconfirmed Balance: **' +
            numberWithCommas(unconfirmedBalance) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Unconfirmed # of tx: **' +
            numberWithCommas(unconfirmedTxApperances) +
            '**';
        } else {
          var description =
            'Details for **' +
            address +
            '**\n' +
            'Balance: **' +
            numberWithCommas(balance) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Received: **' +
            numberWithCommas(totalReceived) +
            ' ' +
            coinSymbol +
            '**\n' +
            'Sent: **' +
            numberWithCommas(totalSent) +
            ' ' +
            coinSymbol +
            '**\n' +
            '# of tx: **' +
            numberWithCommas(txApperances) +
            '**';
        }
        msg.channel.send(description);
        return;
      }
    );
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
