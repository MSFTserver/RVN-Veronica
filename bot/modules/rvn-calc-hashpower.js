'use strict';
let needle = require('needle');
let config = require('config');
let moment = require('moment-timezone');
let hasRvnStatsNetworkChannels = require('../helpers.js')
  .hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['hashpower'];

exports.hashpower = {
  usage: '<Mh/s> <fiat/coin>',
  description:
    'Displays potential Earnings For Given Hashrate\n **Supported Fiats:** *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)',
  process: function(bot, msg, suffix) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to hash bot.'
      );
      return;
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var offset = 0;
    if (words[0] == 'power') {
      offset = 1;
    }
    var myhashrate = words[0 + offset];
    if (
      myhashrate == '' ||
      myhashrate == null ||
      myhashrate == undefined ||
      myhashrate == ' '
    ) {
      myhashrate = '10';
    }
    var otherfiat = words[1 + offset];
    if (
      otherfiat == '' ||
      otherfiat == null ||
      otherfiat == undefined ||
      otherfiat == ' '
    ) {
      otherfiat = 'USD';
    }
    needle.get(cmcApiUrl + coinName + '/?convert=' + otherfiat, function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send(cmcApiUrl + ' API is not available');
      } else {
        var newdata = 'price_' + otherfiat.toLowerCase();
        var Otherprice = Number(response.body[0][newdata]);
        var sign = otherfiat;
        var fixamount = 8;
        if (otherfiat == 'USD' || otherfiat == 'usd') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '$';
          var fixamount = 4;
        }
        if (otherfiat == 'AUD' || otherfiat == 'aud') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'AU$';
          var fixamount = 4;
        }
        if (otherfiat == 'BRL' || otherfiat == 'brl') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'R$';
          var fixamount = 4;
        }
        if (otherfiat == 'CAD' || otherfiat == 'cad') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'Can$';
          var fixamount = 4;
        }
        if (otherfiat == 'CHF' || otherfiat == 'chf') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'Fr';
          var fixamount = 4;
        }
        if (otherfiat == 'CLP' || otherfiat == 'clp') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'CLP$';
        }
        if (otherfiat == 'CNY' || otherfiat == 'cny') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '¥';
          var fixamount = 4;
        }
        if (otherfiat == 'CZK' || otherfiat == 'czk') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'Kč';
          var fixamount = 4;
        }
        if (otherfiat == 'DKK' || otherfiat == 'dkk') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'kr';
          var fixamount = 4;
        }
        if (otherfiat == 'EUR' || otherfiat == 'eur') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '€';
          var fixamount = 4;
        }
        if (otherfiat == 'GBP' || otherfiat == 'gbp') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '£';
          var fixamount = 4;
        }
        if (otherfiat == 'HKD' || otherfiat == 'hkd') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'HKD$';
          var fixamount = 4;
        }
        if (otherfiat == 'HUF' || otherfiat == 'huf') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'Ft';
          var fixamount = 4;
        }
        if (otherfiat == 'IDR' || otherfiat == 'idr') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'Rp';
          var fixamount = 4;
        }
        if (otherfiat == 'ILS' || otherfiat == 'ils') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₪';
          var fixamount = 4;
        }
        if (otherfiat == 'INR' || otherfiat == 'inr') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₹';
          var fixamount = 4;
        }
        if (otherfiat == 'JPY' || otherfiat == 'jpy') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '¥';
          var fixamount = 4;
        }
        if (otherfiat == 'KRW' || otherfiat == 'krw') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '‎₩';
          var fixamount = 4;
        }
        if (otherfiat == 'MXN' || otherfiat == 'mxn') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'MXN$';
          var fixamount = 4;
        }
        if (otherfiat == 'MYR' || otherfiat == 'myr') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'RM';
          var fixamount = 4;
        }
        if (otherfiat == 'NOK' || otherfiat == 'nok') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'kr';
          var fixamount = 4;
        }
        if (otherfiat == 'NZD' || otherfiat == 'nzd') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'NZD$';
          var fixamount = 4;
        }
        if (otherfiat == 'PHP' || otherfiat == 'php') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₱';
          var fixamount = 4;
        }
        if (otherfiat == 'PKR' || otherfiat == 'pkr') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₨';
          var fixamount = 4;
        }
        if (otherfiat == 'PLN' || otherfiat == 'pln') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'zł';
          var fixamount = 4;
        }
        if (otherfiat == 'RUB' || otherfiat == 'rub') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₽';
          var fixamount = 4;
        }
        if (otherfiat == 'SEK' || otherfiat == 'sek') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'kr';
          var fixamount = 4;
        }
        if (otherfiat == 'SGD' || otherfiat == 'sgd') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'S$';
          var fixamount = 4;
        }
        if (otherfiat == 'THB' || otherfiat == 'thb') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '฿';
          var fixamount = 4;
        }
        if (otherfiat == 'TRY' || otherfiat == 'try') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = '₺';
          var fixamount = 4;
        }
        if (otherfiat == 'TWD' || otherfiat == 'twd') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'NT$';
          var fixamount = 4;
        }
        if (otherfiat == 'ZAR' || otherfiat == 'zar') {
          var newdata = 'price_' + otherfiat.toLowerCase();
          var Otherprice = response.body[0][newdata];
          var sign = 'R';
          var fixamount = 4;
        }
        var myRate = Number(Otherprice);
        needle.get(explorerApiUrl + 'api/getmininginfo', function(
          error,
          response
        ) {
          if (error || response.statusCode !== 200) {
            msg.channel.send(explorerApiUrl + ' API is not available');
          } else {
            var data = response.body;
            var height = Number(data.blocks);
            var hashrate = data.networkhashps;
            var Diff = Number(data.difficulty);
            var Reward = 5000;
            var block_time = 60;
            var myHash = Number(myhashrate);
            var RVN =
              Number(myHash) * 10 ** 6 * Reward * 60 / (Number(Diff) * 2 ** 32);
            var RVN1 = RVN * 60;
            var RVN24 = RVN * 1440;
            var Other = myRate * RVN;
            var Other1 = myRate * RVN1;
            var Other24 = myRate * RVN24;
            var message =
              'With **' +
              myHash +
              ' Mh/s** and Difficulty: **' +
              Diff.toFixed(0) +
              '**\nYou can potentially earn the following: \n';
            var rvnrates =
              '1 Minute = **' +
              RVN.toFixed(4) +
              '** \n' +
              '1 Hour = **' +
              RVN1.toFixed(4) +
              '** \n' +
              '1 Day = **' +
              RVN24.toFixed(4) +
              '** \n';
            var otherrates =
              '1 Minute = **' +
              sign +
              ' ' +
              Other.toFixed(fixamount) +
              '** \n' +
              '1 Hour = **' +
              sign +
              ' ' +
              Other1.toFixed(fixamount) +
              '** \n' +
              '1 Day = **' +
              sign +
              ' ' +
              Other24.toFixed(fixamount) +
              '** \n';
            const embed = {
              description: message,
              color: 7976557,
              footer: {
                text: 'Last Updated | ' + timestamp + ' PST'
              },
              author: {
                name: 'Hashing Power Calculator!',
                icon_url: 'https://i.imgur.com/nKHVQgq.png'
              },
              fields: [
                {
                  name: coinSymbol + ' Rates',
                  value: rvnrates,
                  inline: true
                },
                {
                  name: otherfiat.toUpperCase() + ' (' + sign + ') Rates',
                  value: otherrates,
                  inline: true
                }
              ]
            };
            msg.channel.send({ embed });
            return;
          }
        });
      }
    });
  }
};
