let needle = require('needle');
let moment = require('moment-timezone');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let channelID = config.get('General').Channels.botspam;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['price'];

exports.price = {
  usage: '<fiat/coin> <amount> <fiat/coin>',
  description:
    'display price of specified coin/fiat in specified coin/fiat from crypto compare\n     Example: `!price RVN 100 USD`\n     Supported Fiats: *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)',
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
    }
    if (suffix !== '') {
      words = suffix
        .trim()
        .split(' ')
        .filter(function(n) {
          return n !== '';
        });
      if (words[0] == undefined) {
        var currency1 = coinSymbol;
      } else {
        var currency1 = words[0].toUpperCase();
      }
      if (words[2] == undefined) {
        var currency2 = 'BTC';
      } else {
        var currency2 = words[2].toUpperCase();
      }
      if (words[1] == undefined) {
        var amount = '1';
      } else {
        if (getValidatedAmount(words[1]) === null) {
          msg.reply(
            'Invalid Amount Please specify a number!\n!price <fiat/coin> <amount> <fiat/coin>'
          );
          return;
        }
        var amount = words[1].toUpperCase();
      }
    } else {
      var currency1 = coinSymbol;
      var currency2 = 'BTC';
      var amount = '1';
    }
    needle.get(cmcApiUrl + '?limit=0', function(error, response) {
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified');
        }
        if (response.statusCode == 305) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
        }
        if (response.statusCode == 306) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy');
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request');
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot");
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response ');
        }
        if (response.statusCode == 449) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With ');
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
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unavailable For Legal Reasons'
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway');
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
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended');
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
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Network connect timeout error'
          );
        }
      } else {
        JSON1 = response.body;
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == currency1)) != -1
        ) {
          var hasMatch1 = true;
        } else {
          var hasMatch1 = false;
        }
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == currency2)) != -1
        ) {
          var hasMatch2 = true;
        } else {
          var hasMatch2 = false;
        }
        if (
          currency1.toLowerCase() == 'usd' ||
          currency1.toLowerCase() == 'aud' ||
          currency1.toLowerCase() == 'brl' ||
          currency1.toLowerCase() == 'cad' ||
          currency1.toLowerCase() == 'chf' ||
          currency1.toLowerCase() == 'clp' ||
          currency1.toLowerCase() == 'cny' ||
          currency1.toLowerCase() == 'czk' ||
          currency1.toLowerCase() == 'dkk' ||
          currency1.toLowerCase() == 'eur' ||
          currency1.toLowerCase() == 'gbp' ||
          currency1.toLowerCase() == 'hkd' ||
          currency1.toLowerCase() == 'huf' ||
          currency1.toLowerCase() == 'idr' ||
          currency1.toLowerCase() == 'ils' ||
          currency1.toLowerCase() == 'inr' ||
          currency1.toLowerCase() == 'jpy' ||
          currency1.toLowerCase() == 'krw' ||
          currency1.toLowerCase() == 'mxn' ||
          currency1.toLowerCase() == 'myr' ||
          currency1.toLowerCase() == 'nok' ||
          currency1.toLowerCase() == 'nzd' ||
          currency1.toLowerCase() == 'php' ||
          currency1.toLowerCase() == 'pkr' ||
          currency1.toLowerCase() == 'pln' ||
          currency1.toLowerCase() == 'rub' ||
          currency1.toLowerCase() == 'sek' ||
          currency1.toLowerCase() == 'sgd' ||
          currency1.toLowerCase() == 'thb' ||
          currency1.toLowerCase() == 'try' ||
          currency1.toLowerCase() == 'twd' ||
          currency1.toLowerCase() == 'zar'
        ) {
          var symbol2 = currency1;
          var fiatToAlt = true;
        } else {
          if (!hasMatch1) {
            msg.channel.send('Invalid Fiat/Alt for first currency!');
            return;
          } else {
            var symbol1 = currency1;
            var fiatToAlt = false;
          }
        }
        if (
          currency2.toLowerCase() == 'usd' ||
          currency2.toLowerCase() == 'aud' ||
          currency2.toLowerCase() == 'brl' ||
          currency2.toLowerCase() == 'cad' ||
          currency2.toLowerCase() == 'chf' ||
          currency2.toLowerCase() == 'clp' ||
          currency2.toLowerCase() == 'cny' ||
          currency2.toLowerCase() == 'czk' ||
          currency2.toLowerCase() == 'dkk' ||
          currency2.toLowerCase() == 'eur' ||
          currency2.toLowerCase() == 'gbp' ||
          currency2.toLowerCase() == 'hkd' ||
          currency2.toLowerCase() == 'huf' ||
          currency2.toLowerCase() == 'idr' ||
          currency2.toLowerCase() == 'ils' ||
          currency2.toLowerCase() == 'inr' ||
          currency2.toLowerCase() == 'jpy' ||
          currency2.toLowerCase() == 'krw' ||
          currency2.toLowerCase() == 'mxn' ||
          currency2.toLowerCase() == 'myr' ||
          currency2.toLowerCase() == 'nok' ||
          currency2.toLowerCase() == 'nzd' ||
          currency2.toLowerCase() == 'php' ||
          currency2.toLowerCase() == 'pkr' ||
          currency2.toLowerCase() == 'pln' ||
          currency2.toLowerCase() == 'rub' ||
          currency2.toLowerCase() == 'sek' ||
          currency2.toLowerCase() == 'sgd' ||
          currency2.toLowerCase() == 'thb' ||
          currency2.toLowerCase() == 'try' ||
          currency2.toLowerCase() == 'twd' ||
          currency2.toLowerCase() == 'zar'
        ) {
          var symbol2 = currency2;
        } else {
          if (!hasMatch2) {
            msg.channel.send('Invalid Fiat/Alt for second currency!');
            return;
          } else {
            if (fiatToAlt) {
              var symbol1 = currency2;
            } else {
              var symbol2 = currency2;
            }
          }
        }
        position = Number(
          JSON1.findIndex(symbols => symbols.symbol == symbol1)
        );
        if (!response.body[position]) {
          msg.channel.send('please use atleast 1 crypto currency!');
          return;
        }
        name = response.body[position].id;
        needle.get(cmcApiUrl + name + '/' + '?convert=' + symbol2, function(
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
            var newdata = 'price_' + symbol2.toLowerCase();
            var price = Number(response.body[0][newdata]);
            if (!fiatToAlt) {
              var newprice = price * amount;
            } else {
              var newprice = amount / price;
            }
            var message =
              amount +
              ' ' +
              currency1 +
              ' = ' +
              newprice.toFixed(8) +
              ' ' +
              currency2 +
              '\n' +
              '*Updated: ' +
              timestamp +
              ' PST*';
            msg.channel.send(message);
          }
        });
      }
    });
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};
