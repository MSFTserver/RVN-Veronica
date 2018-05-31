let config = require('config');
let needle = require('needle');
let moment = require('moment-timezone');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;
let coinName = config.get('General').urls.CoinName;
let statsurl = config.get('General').urls.cmcUrl + coinName;

exports.commands = ['market'];

exports.market = {
  usage: '',
  description: 'gets market stats for ' + coinName + '(' + coinSymbol + ')',
  process: function(bot, msg, suffix) {
    if (!hasRvnCalcPriceChannels(msg) && !inPrivate(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to stats bot.'
      );
      return;
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
          Number(JSON1.findIndex(symbols => symbols.symbol == coinSymbol)) != -1
        ) {
          hasMatch = true;
        } else {
          hasMatch = false;
        }
        if (!hasMatch) {
          msg.channel.send('Invalid Alt Coin');
          return;
        }
        needle.get(cmcApiUrl + coinName + '/', function(error, response) {
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
            data = response.body[0];
            rank = data.rank;
            price_usd = Number(data.price_usd);
            price_btc = Number(data.price_btc);
            market_cap_usd = Number(data.market_cap_usd);
            total_supply = Number(data.total_supply);
            max_supply = 21000000000;
            percent_change_1h = Number(data.percent_change_1h);
            percent_change_24h = Number(data.percent_change_24h);
            json = response.body[0];
            newjson = parse_obj(json);
            parse = JSON.stringify(newjson);
            volume24_usd = parse.replace(/[^0-9]/g, '');
            dt = new Date();
            timestamp = moment()
              .tz('America/Los_Angeles')
              .format('MM-DD-YYYY hh:mm a');
            hr_indicator = ':thumbsup:';
            day_indicator = ':thumbsup:';
            if (percent_change_1h < 0) {
              hr_indicator = ':thumbsdown:';
            }
            if (percent_change_24h < 0) {
              day_indicator = ':thumbsdown:';
            }
            if (market_cap_usd == 0) {
              market_cap_usd = Number(price_usd * total_supply);
            }
            needle.get(cmcApiUrl + coinName + '/' + '?convert=GBP', function(
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
                    '<' +
                      cmcApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unsupported Media Type'
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
                  msg.channel.send(
                    '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked'
                  );
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
                    '<' +
                      cmcApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Precondition Required '
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
                    '<' +
                      cmcApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Variant Also Negotiates'
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
                data = response.body[0];
                price_gbp = Number(data.price_gbp);
                needle.get(
                  cmcApiUrl + coinName + '/' + '?convert=EUR',
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      if (response.statusCode == 122) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI too long'
                        );
                      }
                      if (response.statusCode == 300) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Multiple Choices'
                        );
                      }
                      if (response.statusCode == 301) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Moved Permanently'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Temporary Redirect'
                        );
                      }
                      if (response.statusCode == 308) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Permanent Redirect'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Payment Required'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Method Not Allowed'
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
                        msg.channel.send(
                          '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone'
                        );
                      }
                      if (response.statusCode == 411) {
                        msg.channel.send(
                          '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
                        );
                      }
                      if (response.statusCode == 412) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Failed'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI Too Long'
                        );
                      }
                      if (response.statusCode == 415) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unsupported Media Type'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Expectation Failed'
                        );
                      }
                      if (response.statusCode == 418) {
                        msg.channel.send(
                          '<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                        );
                      }
                      if (response.statusCode == 422) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unprocessable Entity'
                        );
                      }
                      if (response.statusCode == 423) {
                        msg.channel.send(
                          '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked'
                        );
                      }
                      if (response.statusCode == 424) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Failed Dependency'
                        );
                      }
                      if (response.statusCode == 425) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unordered Collection'
                        );
                      }
                      if (response.statusCode == 426) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Upgrade Required'
                        );
                      }
                      if (response.statusCode == 428) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Required '
                        );
                      }
                      if (response.statusCode == 429) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Too Many Requests '
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Client Closed Request'
                        );
                      }
                      if (response.statusCode == 500) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Internal Server Error'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Service Unavailable'
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
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Variant Also Negotiates'
                        );
                      }
                      if (response.statusCode == 507) {
                        msg.channel.send(
                          '<' +
                            cmcApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Insufficient Storage'
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
                      data = response.body[0];
                      price_eur = Number(data.price_eur);
                      description =
                        '**Rank: [' +
                        rank +
                        '](' +
                        statsurl +
                        ')**\n' +
                        '**Data**\n' +
                        'Market Cap: [$' +
                        numberWithCommas(market_cap_usd.toFixed(2)) +
                        '](' +
                        statsurl +
                        ') \n' +
                        'Max Supply: [' +
                        numberWithCommas(max_supply) +
                        ' ' +
                        coinSymbol +
                        '](' +
                        statsurl +
                        ')\n' +
                        'Circulating Supply: [' +
                        numberWithCommas(total_supply) +
                        ' ' +
                        coinSymbol +
                        '](' +
                        statsurl +
                        ')\n' +
                        '24 Hour Volume: [$' +
                        volume24_usd +
                        '](' +
                        statsurl +
                        ') \n\n' +
                        '**Price**\n' +
                        'BTC: [₿' +
                        price_btc.toFixed(8) +
                        '](' +
                        statsurl +
                        ')\n' +
                        'USD: [$' +
                        price_usd.toFixed(4) +
                        '](' +
                        statsurl +
                        ') \n' +
                        'EUR: [€' +
                        price_eur.toFixed(4) +
                        '](' +
                        statsurl +
                        ') \n' +
                        'GBP: [£' +
                        price_gbp.toFixed(4) +
                        '](' +
                        statsurl +
                        ') \n\n' +
                        '**% Change**\n' +
                        '1 Hour:  [' +
                        percent_change_1h +
                        '](' +
                        statsurl +
                        ')   ' +
                        hr_indicator +
                        ' \n\n' +
                        '1 Day:   [' +
                        percent_change_24h +
                        '](' +
                        statsurl +
                        ')   ' +
                        day_indicator +
                        ' \n\n';
                      const embed = {
                        description: description,
                        color: 7976557,
                        footer: {
                          text: 'Last Updated: ' + timestamp + ' PST'
                        },
                        author: {
                          name: 'Coin Market Cap Stats (' + coinSymbol + ')',
                          url: statsurl,
                          icon_url: 'https://i.imgur.com/aZ1WHCy.png?1'
                        }
                      };
                      msg.channel.send({ embed });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
    function parse_obj(obj) {
      let array = [];
      let prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          key = parseInt(prop, 10);
          value = obj[prop];
          if (typeof value == 'object') {
            value = parse_obj(value);
          }
          array[key] = value;
        }
      }
      return array;
    }
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
