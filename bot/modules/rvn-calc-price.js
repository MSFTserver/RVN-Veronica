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
    needle.get(cmcApiUrl + 'listings/', function(error, response) {
      if (response.statusCode !== 200) {
        msg.channel.send(getError(response.statusCode));
      } else {
        var JSON1 = response.body.data;
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
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == symbol1)) != -1
        ) {
          var hasMatch = true;
          var index = JSON1.findIndex(symbols => symbols.symbol == symbol1);
        } else {
          var hasMatch = false;
          var index = JSON1.findIndex(symbols => symbols.symbol == symbol1);
        }
        var coinJson = JSON1[index];
        if (!hasMatch || !coinJson) {
          msg.channel.send('Invalid Alt Coin, Please specify atleast 1!');
          return;
        }
        var coinID = coinJson.id;
        needle.get(
          cmcApiUrl + 'ticker/' + coinID + '/?convert=' + symbol2,
          function(error, response) {
            if (response.statusCode !== 200) {
              msg.channel.send(getError(response.statusCode));
            } else {
              var coinsym = symbol2.toUpperCase();
              var price = Number(response.body.data.quotes[coinsym].price);
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
