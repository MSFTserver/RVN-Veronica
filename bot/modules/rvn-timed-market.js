let jp = require('jsonpath');
let moment = require('moment-timezone');
let numeral = require('numeral');
let request = require('request');
let config = require('config');
let needle = require('needle');
let TimedStatsChannel = config.get('TimedBots').stats;
let Timer = config.get('TimedBots').timerstats;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;
let coinName = config.get('General').urls.CoinName;
let statsurl = config.get('General').urls.cmcUrl + coinName;

exports.custom = ['TimedStats'];

exports.TimedStats = function(bot) {
  setInterval(function() {
    sendInfo(bot);
  }, Timer);

  function sendInfo(bot) {
    needle.get(cmcApiUrl + 'listings/', function(error, response) {
      if (response.statusCode !== 200) {
        if (response.statusCode == 122) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long');
        }
        if (response.statusCode == 300) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices');
        }
        if (response.statusCode == 301) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently');
        }
        if (response.statusCode == 303) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other');
        }
        if (response.statusCode == 304) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified');
        }
        if (response.statusCode == 305) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
        }
        if (response.statusCode == 306) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy');
        }
        if (response.statusCode == 307) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect');
        }
        if (response.statusCode == 308) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect');
        }
        if (response.statusCode == 400) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request');
        }
        if (response.statusCode == 401) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized');
        }
        if (response.statusCode == 402) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required');
        }
        if (response.statusCode == 403) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden');
        }
        if (response.statusCode == 404) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found');
        }
        if (response.statusCode == 405) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed');
        }
        if (response.statusCode == 406) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable');
        }
        if (response.statusCode == 407) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Proxy Authen­tic­ation Required'
            );
        }
        if (response.statusCode == 408) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout');
        }
        if (response.statusCode == 409) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict');
        }
        if (response.statusCode == 410) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
        }
        if (response.statusCode == 411) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required');
        }
        if (response.statusCode == 412) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed');
        }
        if (response.statusCode == 413) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Entity Too Large'
            );
        }
        if (response.statusCode == 414) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long');
        }
        if (response.statusCode == 415) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
            );
        }
        if (response.statusCode == 416) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Requested Range Not Satisf­iable'
            );
        }
        if (response.statusCode == 417) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed');
        }
        if (response.statusCode == 418) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot");
        }
        if (response.statusCode == 422) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity');
        }
        if (response.statusCode == 423) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
        }
        if (response.statusCode == 424) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency');
        }
        if (response.statusCode == 425) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection');
        }
        if (response.statusCode == 426) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required');
        }
        if (response.statusCode == 428) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
            );
        }
        if (response.statusCode == 429) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests ');
        }
        if (response.statusCode == 431) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Header Fields Too Large '
            );
        }
        if (response.statusCode == 444) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response ');
        }
        if (response.statusCode == 449) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With ');
        }
        if (response.statusCode == 450) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Blocked By Windows Parental Controls '
            );
        }
        if (response.statusCode == 451) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Unavailable For Legal Reasons'
            );
        }
        if (response.statusCode == 499) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request');
        }
        if (response.statusCode == 500) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error');
        }
        if (response.statusCode == 501) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented');
        }
        if (response.statusCode == 502) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway');
        }
        if (response.statusCode == 503) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable');
        }
        if (response.statusCode == 504) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout');
        }
        if (response.statusCode == 505) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'HTTP Version Not Supported'
            );
        }
        if (response.statusCode == 506) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
            );
        }
        if (response.statusCode == 507) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage');
        }
        if (response.statusCode == 508) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected');
        }
        if (response.statusCode == 509) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bandwidth Limit Exceeded'
            );
        }
        if (response.statusCode == 510) {
          bot.channels
            .get(TimedStatsChannel)
            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended');
        }
        if (response.statusCode == 511) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' +
                cmcApiUrl +
                '>' +
                ' ERROR: ' +
                'Network Authentication Required'
            );
        }
        if (response.statusCode == 598) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Network read timeout error'
            );
        }
        if (response.statusCode == 599) {
          bot.channels
            .get(TimedStatsChannel)
            .send(
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
          Number(JSON1.findIndex(symbols => symbols.symbol == coinSymbol)) != -1
        ) {
          var hasMatch = true;
          var index = JSON1.findIndex(symbols => symbols.symbol == coinSymbol);
        } else {
          var hasMatch = false;
          var index = JSON1.findIndex(symbols => symbols.symbol == coinSymbol);
        }
        var coinJson = JSON1[index];
        var coinID = coinJson.id;
        if (!hasMatch || !coinJson || !coinID) {
          bot.channels.get(TimedStatsChannel).send('Invalid Alt Coin');
          return;
        }
        needle.get(cmcApiUrl + 'ticker/' + coinID + '/?convert=BTC', function(
          error,
          response
        ) {
          if (response.statusCode !== 200) {
            if (response.statusCode == 122) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
                );
            }
            if (response.statusCode == 300) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices');
            }
            if (response.statusCode == 301) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently');
            }
            if (response.statusCode == 303) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other');
            }
            if (response.statusCode == 304) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified');
            }
            if (response.statusCode == 305) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
            }
            if (response.statusCode == 306) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy');
            }
            if (response.statusCode == 307) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
                );
            }
            if (response.statusCode == 308) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
                );
            }
            if (response.statusCode == 400) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request');
            }
            if (response.statusCode == 401) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized');
            }
            if (response.statusCode == 402) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required');
            }
            if (response.statusCode == 403) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden');
            }
            if (response.statusCode == 404) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found');
            }
            if (response.statusCode == 405) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
                );
            }
            if (response.statusCode == 406) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable');
            }
            if (response.statusCode == 407) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Proxy Authen­tic­ation Required'
                );
            }
            if (response.statusCode == 408) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout');
            }
            if (response.statusCode == 409) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict');
            }
            if (response.statusCode == 410) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
            }
            if (response.statusCode == 411) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required');
            }
            if (response.statusCode == 412) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
                );
            }
            if (response.statusCode == 413) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Entity Too Large'
                );
            }
            if (response.statusCode == 414) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
                );
            }
            if (response.statusCode == 415) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
                );
            }
            if (response.statusCode == 416) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Requested Range Not Satisf­iable'
                );
            }
            if (response.statusCode == 417) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
                );
            }
            if (response.statusCode == 418) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot");
            }
            if (response.statusCode == 422) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
                );
            }
            if (response.statusCode == 423) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
            }
            if (response.statusCode == 424) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency');
            }
            if (response.statusCode == 425) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
                );
            }
            if (response.statusCode == 426) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required');
            }
            if (response.statusCode == 428) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
                );
            }
            if (response.statusCode == 429) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
                );
            }
            if (response.statusCode == 431) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Header Fields Too Large '
                );
            }
            if (response.statusCode == 444) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response ');
            }
            if (response.statusCode == 449) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With ');
            }
            if (response.statusCode == 450) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Blocked By Windows Parental Controls '
                );
            }
            if (response.statusCode == 451) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Unavailable For Legal Reasons'
                );
            }
            if (response.statusCode == 499) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
                );
            }
            if (response.statusCode == 500) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
                );
            }
            if (response.statusCode == 501) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented');
            }
            if (response.statusCode == 502) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway');
            }
            if (response.statusCode == 503) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
                );
            }
            if (response.statusCode == 504) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout');
            }
            if (response.statusCode == 505) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'HTTP Version Not Supported'
                );
            }
            if (response.statusCode == 506) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
                );
            }
            if (response.statusCode == 507) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
                );
            }
            if (response.statusCode == 508) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected');
            }
            if (response.statusCode == 509) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Bandwidth Limit Exceeded'
                );
            }
            if (response.statusCode == 510) {
              bot.channels
                .get(TimedStatsChannel)
                .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended');
            }
            if (response.statusCode == 511) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network Authentication Required'
                );
            }
            if (response.statusCode == 598) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network read timeout error'
                );
            }
            if (response.statusCode == 599) {
              bot.channels
                .get(TimedStatsChannel)
                .send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network connect timeout error'
                );
            }
          } else {
            data = response.body.data;
            rank = data.rank;
            price_usd = Number(data.quotes.USD.price);
            market_cap_usd = Number(data.quotes.USD.market_cap);
            total_supply = Number(data.total_supply);
            volume24_usd = Number(data.quotes.USD.volume_24h);
            max_supply = Number(data.max_supply);
            percent_change_1h = Number(data.quotes.USD.percent_change_1h);
            percent_change_24h = Number(data.quotes.USD.percent_change_24h);
            price_btc = Number(data.quotes.BTC.price);
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
            needle.get(
              cmcApiUrl + 'ticker/' + coinID + '/?convert=GBP',
              function(error, response) {
                if (response.statusCode !== 200) {
                  if (response.statusCode == 122) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Request-URI too long'
                      );
                  }
                  if (response.statusCode == 300) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
                      );
                  }
                  if (response.statusCode == 301) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
                      );
                  }
                  if (response.statusCode == 303) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other');
                  }
                  if (response.statusCode == 304) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                      );
                  }
                  if (response.statusCode == 305) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
                  }
                  if (response.statusCode == 306) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                      );
                  }
                  if (response.statusCode == 307) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Temporary Redirect'
                      );
                  }
                  if (response.statusCode == 308) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Permanent Redirect'
                      );
                  }
                  if (response.statusCode == 400) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request');
                  }
                  if (response.statusCode == 401) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                      );
                  }
                  if (response.statusCode == 402) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required'
                      );
                  }
                  if (response.statusCode == 403) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden');
                  }
                  if (response.statusCode == 404) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found');
                  }
                  if (response.statusCode == 405) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Method Not Allowed'
                      );
                  }
                  if (response.statusCode == 406) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                      );
                  }
                  if (response.statusCode == 407) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Proxy Authen­tic­ation Required'
                      );
                  }
                  if (response.statusCode == 408) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
                      );
                  }
                  if (response.statusCode == 409) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict');
                  }
                  if (response.statusCode == 410) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
                  }
                  if (response.statusCode == 411) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
                      );
                  }
                  if (response.statusCode == 412) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Precondition Failed'
                      );
                  }
                  if (response.statusCode == 413) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Request Entity Too Large'
                      );
                  }
                  if (response.statusCode == 414) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Request-URI Too Long'
                      );
                  }
                  if (response.statusCode == 415) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Unsupported Media Type'
                      );
                  }
                  if (response.statusCode == 416) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Requested Range Not Satisf­iable'
                      );
                  }
                  if (response.statusCode == 417) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Expectation Failed'
                      );
                  }
                  if (response.statusCode == 418) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                      );
                  }
                  if (response.statusCode == 422) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Unprocessable Entity'
                      );
                  }
                  if (response.statusCode == 423) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
                  }
                  if (response.statusCode == 424) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
                      );
                  }
                  if (response.statusCode == 425) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Unordered Collection'
                      );
                  }
                  if (response.statusCode == 426) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
                      );
                  }
                  if (response.statusCode == 428) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Precondition Required '
                      );
                  }
                  if (response.statusCode == 429) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Too Many Requests '
                      );
                  }
                  if (response.statusCode == 431) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Request Header Fields Too Large '
                      );
                  }
                  if (response.statusCode == 444) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response '
                      );
                  }
                  if (response.statusCode == 449) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With ');
                  }
                  if (response.statusCode == 450) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Blocked By Windows Parental Controls '
                      );
                  }
                  if (response.statusCode == 451) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Unavailable For Legal Reasons'
                      );
                  }
                  if (response.statusCode == 499) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Client Closed Request'
                      );
                  }
                  if (response.statusCode == 500) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Internal Server Error'
                      );
                  }
                  if (response.statusCode == 501) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
                      );
                  }
                  if (response.statusCode == 502) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway');
                  }
                  if (response.statusCode == 503) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Service Unavailable'
                      );
                  }
                  if (response.statusCode == 504) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
                      );
                  }
                  if (response.statusCode == 505) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'HTTP Version Not Supported'
                      );
                  }
                  if (response.statusCode == 506) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Variant Also Negotiates'
                      );
                  }
                  if (response.statusCode == 507) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Insufficient Storage'
                      );
                  }
                  if (response.statusCode == 508) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                      );
                  }
                  if (response.statusCode == 509) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Bandwidth Limit Exceeded'
                      );
                  }
                  if (response.statusCode == 510) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                      );
                  }
                  if (response.statusCode == 511) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Network Authentication Required'
                      );
                  }
                  if (response.statusCode == 598) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Network read timeout error'
                      );
                  }
                  if (response.statusCode == 599) {
                    bot.channels
                      .get(TimedStatsChannel)
                      .send(
                        '<' +
                          cmcApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Network connect timeout error'
                      );
                  }
                } else {
                  data = response.body.data;
                  price_gbp = Number(data.quotes.GBP.price);
                  needle.get(
                    cmcApiUrl + 'ticker/' + coinID + '/?convert=EUR',
                    function(error, response) {
                      if (response.statusCode !== 200) {
                        if (response.statusCode == 122) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Request-URI too long'
                            );
                        }
                        if (response.statusCode == 300) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Multiple Choices'
                            );
                        }
                        if (response.statusCode == 301) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Moved Permanently'
                            );
                        }
                        if (response.statusCode == 303) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other'
                            );
                        }
                        if (response.statusCode == 304) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Not Modified'
                            );
                        }
                        if (response.statusCode == 305) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                            );
                        }
                        if (response.statusCode == 306) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Switch Proxy'
                            );
                        }
                        if (response.statusCode == 307) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Temporary Redirect'
                            );
                        }
                        if (response.statusCode == 308) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Permanent Redirect'
                            );
                        }
                        if (response.statusCode == 400) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                            );
                        }
                        if (response.statusCode == 401) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Unauth­orized'
                            );
                        }
                        if (response.statusCode == 402) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Payment Required'
                            );
                        }
                        if (response.statusCode == 403) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                            );
                        }
                        if (response.statusCode == 404) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found'
                            );
                        }
                        if (response.statusCode == 405) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Method Not Allowed'
                            );
                        }
                        if (response.statusCode == 406) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Not Acceptable'
                            );
                        }
                        if (response.statusCode == 407) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Proxy Authen­tic­ation Required'
                            );
                        }
                        if (response.statusCode == 408) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Request Timeout'
                            );
                        }
                        if (response.statusCode == 409) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict'
                            );
                        }
                        if (response.statusCode == 410) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
                        }
                        if (response.statusCode == 411) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Length Required'
                            );
                        }
                        if (response.statusCode == 412) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Precondition Failed'
                            );
                        }
                        if (response.statusCode == 413) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Request Entity Too Large'
                            );
                        }
                        if (response.statusCode == 414) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Request-URI Too Long'
                            );
                        }
                        if (response.statusCode == 415) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Unsupported Media Type'
                            );
                        }
                        if (response.statusCode == 416) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Requested Range Not Satisf­iable'
                            );
                        }
                        if (response.statusCode == 417) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Expectation Failed'
                            );
                        }
                        if (response.statusCode == 418) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                "I'm a teapot"
                            );
                        }
                        if (response.statusCode == 422) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Unprocessable Entity'
                            );
                        }
                        if (response.statusCode == 423) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked'
                            );
                        }
                        if (response.statusCode == 424) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Failed Dependency'
                            );
                        }
                        if (response.statusCode == 425) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Unordered Collection'
                            );
                        }
                        if (response.statusCode == 426) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Upgrade Required'
                            );
                        }
                        if (response.statusCode == 428) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Precondition Required '
                            );
                        }
                        if (response.statusCode == 429) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Too Many Requests '
                            );
                        }
                        if (response.statusCode == 431) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Request Header Fields Too Large '
                            );
                        }
                        if (response.statusCode == 444) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'No Response '
                            );
                        }
                        if (response.statusCode == 449) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With '
                            );
                        }
                        if (response.statusCode == 450) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Blocked By Windows Parental Controls '
                            );
                        }
                        if (response.statusCode == 451) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Unavailable For Legal Reasons'
                            );
                        }
                        if (response.statusCode == 499) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Client Closed Request'
                            );
                        }
                        if (response.statusCode == 500) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Internal Server Error'
                            );
                        }
                        if (response.statusCode == 501) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Not Implemented'
                            );
                        }
                        if (response.statusCode == 502) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                            );
                        }
                        if (response.statusCode == 503) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Service Unavailable'
                            );
                        }
                        if (response.statusCode == 504) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Gateway Timeout'
                            );
                        }
                        if (response.statusCode == 505) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'HTTP Version Not Supported'
                            );
                        }
                        if (response.statusCode == 506) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Variant Also Negotiates'
                            );
                        }
                        if (response.statusCode == 507) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Insufficient Storage'
                            );
                        }
                        if (response.statusCode == 508) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Loop Detected'
                            );
                        }
                        if (response.statusCode == 509) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Bandwidth Limit Exceeded'
                            );
                        }
                        if (response.statusCode == 510) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Not Extended'
                            );
                        }
                        if (response.statusCode == 511) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Network Authentication Required'
                            );
                        }
                        if (response.statusCode == 598) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Network read timeout error'
                            );
                        }
                        if (response.statusCode == 599) {
                          bot.channels
                            .get(TimedStatsChannel)
                            .send(
                              '<' +
                                cmcApiUrl +
                                '>' +
                                ' ERROR: ' +
                                'Network connect timeout error'
                            );
                        }
                      } else {
                        data = response.body.data;
                        price_eur = Number(data.quotes.EUR.price);
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
                        bot.channels.get(TimedStatsChannel).send({ embed });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
