'use strict';
let jp = require('jsonpath');
let moment = require('moment-timezone');
let numeral = require('numeral');
let request = require('request');
let config = require('config');
let needle = require('needle');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['lambo'];

exports.lambo = {
  usage: '<amount-optional>',
  description:
    'displays amount of given alt coin to get a lambo\n    if <amount> is supplied that will be deducted from total price towards 1 Lambo!',
  process: function(bot, msg, suffix) {
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');

    if (!hasRvnCalcPriceChannels(msg) && !inPrivate(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to price bot.'
      );
      return;
    } else {
      lamboCalc(bot, msg, suffix);
    }

    function lamboCalc(bot, msg, suffix) {
      var words = suffix
        .trim()
        .split(' ')
        .filter(function(n) {
          return n !== '';
        });
      if (!words[0]) {
        var coin = 'RVN';
      } else {
        var coin = words[0].toUpperCase();
      }
      if (!words[1]) {
        var amount = 1;
      } else {
        var amount = words[1];
      }
      needle.get(cmcApiUrl + 'listings/', function(error, response) {
        if (response.statusCode !== 200) {
          if (response.statusCode == 122) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
            );
          }
          if (response.statusCode == 300) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
            );
          }
          if (response.statusCode == 301) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
            );
          }
          if (response.statusCode == 303) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other');
          }
          if (response.statusCode == 304) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified'
            );
          }
          if (response.statusCode == 305) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
          }
          if (response.statusCode == 306) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
            );
          }
          if (response.statusCode == 307) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
            );
          }
          if (response.statusCode == 308) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
            );
          }
          if (response.statusCode == 400) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request'
            );
          }
          if (response.statusCode == 401) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
            );
          }
          if (response.statusCode == 402) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required'
            );
          }
          if (response.statusCode == 403) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden');
          }
          if (response.statusCode == 404) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found');
          }
          if (response.statusCode == 405) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
            );
          }
          if (response.statusCode == 406) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
            );
          }
          if (response.statusCode == 407) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Proxy Authen­tic­ation Required'
            );
          }
          if (response.statusCode == 408) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
            );
          }
          if (response.statusCode == 409) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict');
          }
          if (response.statusCode == 410) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
          }
          if (response.statusCode == 411) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
            );
          }
          if (response.statusCode == 412) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
            );
          }
          if (response.statusCode == 413) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Entity Too Large'
            );
          }
          if (response.statusCode == 414) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
            );
          }
          if (response.statusCode == 415) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
            );
          }
          if (response.statusCode == 416) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Requested Range Not Satisf­iable'
            );
          }
          if (response.statusCode == 417) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
            );
          }
          if (response.statusCode == 418) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
            );
          }
          if (response.statusCode == 422) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
            );
          }
          if (response.statusCode == 423) {
            msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
          }
          if (response.statusCode == 424) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
            );
          }
          if (response.statusCode == 425) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
            );
          }
          if (response.statusCode == 426) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
            );
          }
          if (response.statusCode == 428) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
            );
          }
          if (response.statusCode == 429) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
            );
          }
          if (response.statusCode == 431) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Header Fields Too Large '
            );
          }
          if (response.statusCode == 444) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response '
            );
          }
          if (response.statusCode == 449) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With '
            );
          }
          if (response.statusCode == 450) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Blocked By Windows Parental Controls '
            );
          }
          if (response.statusCode == 451) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Unavailable For Legal Reasons'
            );
          }
          if (response.statusCode == 499) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
            );
          }
          if (response.statusCode == 500) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
            );
          }
          if (response.statusCode == 501) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
            );
          }
          if (response.statusCode == 502) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
            );
          }
          if (response.statusCode == 503) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
            );
          }
          if (response.statusCode == 504) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
            );
          }
          if (response.statusCode == 505) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'HTTP Version Not Supported'
            );
          }
          if (response.statusCode == 506) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
            );
          }
          if (response.statusCode == 507) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
            );
          }
          if (response.statusCode == 508) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
            );
          }
          if (response.statusCode == 509) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bandwidth Limit Exceeded'
            );
          }
          if (response.statusCode == 510) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended'
            );
          }
          if (response.statusCode == 511) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Network Authentication Required'
            );
          }
          if (response.statusCode == 598) {
            msg.channel.send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Network read timeout error'
            );
          }
          if (response.statusCode == 599) {
            msg.channel.send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Network connect timeout error'
            );
          }
        } else {
          var JSON1 = response.body.data;
          if (
            Number(JSON1.findIndex(symbols => symbols.symbol == coin)) != -1
          ) {
            var hasMatch = true;
            var index = JSON1.findIndex(symbols => symbols.symbol == coin);
          } else {
            var hasMatch = false;
            var index = JSON1.findIndex(symbols => symbols.symbol == coin);
          }
          var coinJson = JSON1[index];
          if (!hasMatch || !coinJson) {
            msg.channel.send('Invalid Alt Coin');
            return;
          }
          var coinID = coinJson.id;
          needle.get(cmcApiUrl + 'ticker/' + coinID + '/?convert=USD', function(
            error,
            response
          ) {
            if (response.statusCode !== 200) {
              if (response.statusCode == 122) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
                );
              }
              if (response.statusCode == 300) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
                );
              }
              if (response.statusCode == 301) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
                );
              }
              if (response.statusCode == 303) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other'
                );
              }
              if (response.statusCode == 304) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                );
              }
              if (response.statusCode == 305) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                );
              }
              if (response.statusCode == 306) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                );
              }
              if (response.statusCode == 307) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
                );
              }
              if (response.statusCode == 308) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
                );
              }
              if (response.statusCode == 400) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                );
              }
              if (response.statusCode == 401) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                );
              }
              if (response.statusCode == 402) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required'
                );
              }
              if (response.statusCode == 403) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                );
              }
              if (response.statusCode == 404) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found'
                );
              }
              if (response.statusCode == 405) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
                );
              }
              if (response.statusCode == 406) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                );
              }
              if (response.statusCode == 407) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Proxy Authen­tic­ation Required'
                );
              }
              if (response.statusCode == 408) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
                );
              }
              if (response.statusCode == 409) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict'
                );
              }
              if (response.statusCode == 410) {
                msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
              }
              if (response.statusCode == 411) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
                );
              }
              if (response.statusCode == 412) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
                );
              }
              if (response.statusCode == 413) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Entity Too Large'
                );
              }
              if (response.statusCode == 414) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
                );
              }
              if (response.statusCode == 415) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
                );
              }
              if (response.statusCode == 416) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Requested Range Not Satisf­iable'
                );
              }
              if (response.statusCode == 417) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
                );
              }
              if (response.statusCode == 418) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                );
              }
              if (response.statusCode == 422) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
                );
              }
              if (response.statusCode == 423) {
                msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
              }
              if (response.statusCode == 424) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
                );
              }
              if (response.statusCode == 425) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
                );
              }
              if (response.statusCode == 426) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
                );
              }
              if (response.statusCode == 428) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
                );
              }
              if (response.statusCode == 429) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
                );
              }
              if (response.statusCode == 431) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Header Fields Too Large '
                );
              }
              if (response.statusCode == 444) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response '
                );
              }
              if (response.statusCode == 449) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With '
                );
              }
              if (response.statusCode == 450) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Blocked By Windows Parental Controls '
                );
              }
              if (response.statusCode == 451) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Unavailable For Legal Reasons'
                );
              }
              if (response.statusCode == 499) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
                );
              }
              if (response.statusCode == 500) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
                );
              }
              if (response.statusCode == 501) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
                );
              }
              if (response.statusCode == 502) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                );
              }
              if (response.statusCode == 503) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
                );
              }
              if (response.statusCode == 504) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
                );
              }
              if (response.statusCode == 505) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'HTTP Version Not Supported'
                );
              }
              if (response.statusCode == 506) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
                );
              }
              if (response.statusCode == 507) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
                );
              }
              if (response.statusCode == 508) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                );
              }
              if (response.statusCode == 509) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Bandwidth Limit Exceeded'
                );
              }
              if (response.statusCode == 510) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                );
              }
              if (response.statusCode == 511) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network Authentication Required'
                );
              }
              if (response.statusCode == 598) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network read timeout error'
                );
              }
              if (response.statusCode == 599) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network connect timeout error'
                );
              }
            } else {
              var rate = Number(response.body.data.quotes.USD.price);
              var cost = 250000 / rate;
              if (amount <= 1) {
                var message =
                  cost.toFixed(0) + ' ' + coin + ' = 1 Lambo Huracan';
              } else {
                var cost = cost - amount;
                var message =
                  'Need **' +
                  cost.toFixed(0) +
                  ' ' +
                  coin +
                  '** for 1 Lambo Huracan';
              }
              const embed = {
                description: message,
                color: 7976557,
                footer: {
                  text: 'Last Updated | ' + timestamp + ' PST'
                },
                author: {
                  name: coin + ' to 1 Lambo Calc'
                }
              };
              msg.channel.send({ embed });
            }
          });
        }
      });
    }
  }
};
