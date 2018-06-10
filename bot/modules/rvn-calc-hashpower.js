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
    'Displays potential Earnings For Given Hashrate\n     Supported Fiats: *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)',
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
    if (!suffix) {
      msg.channel.send('Please Specify a hashrate in Mh/s!\n!hash 10');
      return;
    }
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var offset = 0;
    if (words[0] == 'power') {
      var offset = 1;
    }
    var myhashrate = getValidatedAmount(words[0 + offset]);
    if (!myhashrate) {
      msg.channel.send('Please Specify a hashrate in Mh/s!\n!hash 10');
      return;
    }
    var checkFiat = words[1 + offset];
    if (!checkFiat) {
      var fiat = 'USD';
    } else {
      var fiat = words[1 + offset].toUpperCase();
    }
    needle.get(cmcApiUrl + 'listings/', function(error, response) {
      if (response.statusCode !== 200) {
        msg.channel.send(getError(response.statusCode));
      } else {
        var JSON1 = response.body.data;
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == coinSymbol)) != -1
        ) {
          var hasMatch1 = true;
          var index = Number(
            JSON1.findIndex(symbols => symbols.symbol == coinSymbol)
          );
        } else {
          var hasMatch1 = false;
        }
        if (!hasMatch1) {
          msg.channel.send(coinSymbol + ' Not Found!');
          return;
        } else {
          var coinJson = JSON1[index];
          var coinID = coinJson.id;
        }
        if (Number(JSON1.findIndex(symbols => symbols.symbol == fiat)) != -1) {
          var hasMatch2 = true;
        } else {
          var hasMatch2 = false;
        }
        if (
          fiat == 'USD' ||
          fiat == 'AUD' ||
          fiat == 'BRL' ||
          fiat == 'CAD' ||
          fiat == 'CHF' ||
          fiat == 'CLP' ||
          fiat == 'CNY' ||
          fiat == 'CZK' ||
          fiat == 'DKK' ||
          fiat == 'EUR' ||
          fiat == 'GBP' ||
          fiat == 'HKD' ||
          fiat == 'HUF' ||
          fiat == 'IDR' ||
          fiat == 'ILS' ||
          fiat == 'INR' ||
          fiat == 'JPY' ||
          fiat == 'KRW' ||
          fiat == 'MXN' ||
          fiat == 'MYR' ||
          fiat == 'NOK' ||
          fiat == 'NZD' ||
          fiat == 'PHP' ||
          fiat == 'PKR' ||
          fiat == 'PLN' ||
          fiat == 'RUB' ||
          fiat == 'SEK' ||
          fiat == 'SGD' ||
          fiat == 'THB' ||
          fiat == 'TRY' ||
          fiat == 'TWD' ||
          fiat == 'ZAR'
        ) {
          var hasMatch2 = true;
        }
        if (!hasMatch2) {
          msg.channel.send('Invalid Fiat/Alt!');
          return;
        }
        needle.get(
          cmcApiUrl + 'ticker/' + coinID + '/?convert=' + fiat,
          function(error, response) {
            if (response.statusCode !== 200) {
              msg.channel.send(getError(response.statusCode));
            } else {
              var Otherprice = Number(response.body.data.quotes[fiat].price);
              var sign = fiat;
              var fixamount = 8;
              if (fiat == 'USD') {
                var sign = '$';
                var fixamount = 4;
              }
              if (fiat == 'AUD') {
                var sign = 'AU$';
                var fixamount = 4;
              }
              if (fiat == 'BRL') {
                var sign = 'R$';
                var fixamount = 4;
              }
              if (fiat == 'CAD') {
                var sign = 'Can$';
                var fixamount = 4;
              }
              if (fiat == 'CHF') {
                var sign = 'Fr';
                var fixamount = 4;
              }
              if (fiat == 'CLP') {
                var sign = 'CLP$';
              }
              if (fiat == 'CNY') {
                var sign = '¥';
                var fixamount = 4;
              }
              if (fiat == 'CZK') {
                var sign = 'Kč';
                var fixamount = 4;
              }
              if (fiat == 'DKK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'EUR') {
                var sign = '€';
                var fixamount = 4;
              }
              if (fiat == 'GBP') {
                var sign = '£';
                var fixamount = 4;
              }
              if (fiat == 'HKD') {
                var sign = 'HKD$';
                var fixamount = 4;
              }
              if (fiat == 'HUF') {
                var sign = 'Ft';
                var fixamount = 4;
              }
              if (fiat == 'IDR') {
                var sign = 'Rp';
                var fixamount = 4;
              }
              if (fiat == 'ILS') {
                var sign = '₪';
                var fixamount = 4;
              }
              if (fiat == 'INR') {
                var sign = '₹';
                var fixamount = 4;
              }
              if (fiat == 'JPY') {
                var sign = '¥';
                var fixamount = 4;
              }
              if (fiat == 'KRW') {
                var sign = '‎₩';
                var fixamount = 4;
              }
              if (fiat == 'MXN') {
                var sign = 'MXN$';
                var fixamount = 4;
              }
              if (fiat == 'MYR') {
                var sign = 'RM';
                var fixamount = 4;
              }
              if (fiat == 'NOK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'NZD') {
                var sign = 'NZD$';
                var fixamount = 4;
              }
              if (fiat == 'PHP') {
                var sign = '₱';
                var fixamount = 4;
              }
              if (fiat == 'PKR') {
                var sign = '₨';
                var fixamount = 4;
              }
              if (fiat == 'PLN') {
                var sign = 'zł';
                var fixamount = 4;
              }
              if (fiat == 'RUB') {
                var sign = '₽';
                var fixamount = 4;
              }
              if (fiat == 'SEK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'SGD') {
                var sign = 'S$';
                var fixamount = 4;
              }
              if (fiat == 'THB') {
                var sign = '฿';
                var fixamount = 4;
              }
              if (fiat == 'TRY') {
                var sign = '₺';
                var fixamount = 4;
              }
              if (fiat == 'TWD') {
                var sign = 'NT$';
                var fixamount = 4;
              }
              if (fiat == 'ZAR') {
                var sign = 'R';
                var fixamount = 4;
              }
              var myRate = Number(Otherprice);
              needle.get(explorerApiUrl + 'api/status', function(
                error,
                response
              ) {
                if (response.statusCode !== 200) {
                  msg.channel.send(getError(response.statusCode));
                } else {
                  var Diff = Number(response.body.info.difficulty);
                  var myHash = Number(myhashrate);
                  var RVN =
                    Number(myHash) *
                    10 ** 6 *
                    5000 *
                    60 /
                    (Number(Diff) * 2 ** 32);
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
                        name: fiat.toUpperCase() + ' (' + sign + ') Rates',
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
          }
        );
      }
    });
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
    function getError(errCode) {
      if (errCode == 122) {
        var message = 'API ERROR: Request-URI too long';
        return message;
      }
      if (errCode == 300) {
        var message = 'API ERROR: Multiple Choices';
        return message;
      }
      if (errCode == 301) {
        var message = 'API ERROR: Moved Permanently';
        return message;
      }
      if (errCode == 303) {
        var message = 'API ERROR: See Other';
        return message;
      }
      if (errCode == 304) {
        var message = 'API ERROR: Not Modified';
        return message;
      }
      if (errCode == 305) {
        var message = 'API ERROR: Use Proxy';
        return message;
      }
      if (errCode == 306) {
        var message = 'API ERROR: Switch Proxy';
        return message;
      }
      if (errCode == 307) {
        var message = 'API ERROR: Temporary Redirect';
        return message;
      }
      if (errCode == 308) {
        var message = 'API ERROR: Permanent Redirect';
        return message;
      }
      if (errCode == 400) {
        var message = 'API ERROR: Bad Request';
        return message;
      }
      if (errCode == 401) {
        var message = 'API ERROR: Unauth­orized';
        return message;
      }
      if (errCode == 402) {
        var message = 'API ERROR: Payment Required';
        return message;
      }
      if (errCode == 403) {
        var message = 'API ERROR: Forbidden';
        return message;
      }
      if (errCode == 404) {
        var message = 'API ERROR: Not Found';
        return message;
      }
      if (errCode == 405) {
        var message = 'API ERROR: Method Not Allowed';
        return message;
      }
      if (errCode == 406) {
        var message = 'API ERROR: Not Acceptable';
        return message;
      }
      if (errCode == 407) {
        var message = 'API ERROR: Proxy Authen­tic­ation Required';
        return message;
      }
      if (errCode == 408) {
        var message = 'API ERROR: Request Timeout';
        return message;
      }
      if (errCode == 409) {
        var message = 'API ERROR: Conflict';
        return message;
      }
      if (errCode == 410) {
        var message = 'API ERROR: Gone';
        return message;
      }
      if (errCode == 411) {
        var message = 'API ERROR: Length Required';
        return message;
      }
      if (errCode == 412) {
        var message = 'API ERROR: Precondition Failed';
        return message;
      }
      if (errCode == 413) {
        var message = 'API ERROR: Request Entity Too Large';
        return message;
      }
      if (errCode == 414) {
        var message = 'API ERROR: Request-URI Too Long';
        return message;
      }
      if (errCode == 415) {
        var message = 'API ERROR: Unsupported Media Type';
        return message;
      }
      if (errCode == 416) {
        var message = 'API ERROR: Requested Range Not Satisf­iable';
        return message;
      }
      if (errCode == 417) {
        var message = 'API ERROR: Expectation Failed';
        return message;
      }
      if (errCode == 418) {
        var message = "API ERROR: I'm a teapot";
        return message;
      }
      if (errCode == 422) {
        var message = 'API ERROR: Unprocessable Entity';
        return message;
      }
      if (errCode == 423) {
        var message = 'API ERROR: Locked';
        return message;
      }
      if (errCode == 424) {
        var message = 'API ERROR: Failed Dependency';
        return message;
      }
      if (errCode == 425) {
        var message = 'API ERROR: Unordered Collection';
        return message;
      }
      if (errCode == 426) {
        var message = 'API ERROR: Upgrade Required';
        return message;
      }
      if (errCode == 428) {
        var message = 'API ERROR: Precondition Required ';
        return message;
      }
      if (errCode == 429) {
        var message = 'API ERROR: Too Many Requests ';
        return message;
      }
      if (errCode == 431) {
        var message = 'API ERROR: Request Header Fields Too Large ';
        return message;
      }
      if (errCode == 444) {
        var message = 'API ERROR: No Response ';
        return message;
      }
      if (errCode == 449) {
        var message = 'API ERROR: Retry With ';
        return message;
      }
      if (errCode == 450) {
        var message = 'API ERROR: Blocked By Windows Parental Controls ';
        return message;
      }
      if (errCode == 451) {
        var message = 'API ERROR: Unavailable For Legal Reasons';
        return message;
      }
      if (errCode == 499) {
        var message = 'API ERROR: Client Closed Request';
        return message;
      }
      if (errCode == 500) {
        var message = 'API ERROR: Internal Server Error';
        return message;
      }
      if (errCode == 501) {
        var message = 'API ERROR: Not Implemented';
        return message;
      }
      if (errCode == 502) {
        var message = 'API ERROR: Bad Gateway';
        return message;
      }
      if (errCode == 503) {
        var message = 'API ERROR: Service Unavailable';
        return message;
      }
      if (errCode == 504) {
        var message = 'API ERROR: Gateway Timeout';
        return message;
      }
      if (errCode == 505) {
        var message = 'API ERROR: HTTP Version Not Supported';
        return message;
      }
      if (errCode == 506) {
        var message = 'API ERROR: Variant Also Negotiates';
        return message;
      }
      if (errCode == 507) {
        var message = 'API ERROR: Insufficient Storage';
        return message;
      }
      if (errCode == 508) {
        var message = 'API ERROR: Loop Detected';
        return message;
      }
      if (errCode == 509) {
        var message = 'API ERROR: Bandwidth Limit Exceeded';
        return message;
      }
      if (errCode == 510) {
        var message = 'API ERROR: Not Extended';
        return message;
      }
      if (errCode == 511) {
        var message = 'API ERROR: Network Authentication Required';
        return message;
      }
      if (errCode == 598) {
        var message = 'API ERROR: Network read timeout error';
        return message;
      }
      if (errCode == 599) {
        var message = 'API ERROR: Network connect timeout error';
        return message;
      }
    }
  }
};
