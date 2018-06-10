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
        bot.channels.get(TimedStatsChannel).send(getError(response.statusCode));
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
            bot.channels
              .get(TimedStatsChannel)
              .send(getError(response.statusCode));
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
                  bot.channels
                    .get(TimedStatsChannel)
                    .send(getError(response.statusCode));
                } else {
                  data = response.body.data;
                  price_gbp = Number(data.quotes.GBP.price);
                  needle.get(
                    cmcApiUrl + 'ticker/' + coinID + '/?convert=EUR',
                    function(error, response) {
                      if (response.statusCode !== 200) {
                        bot.channels
                          .get(TimedStatsChannel)
                          .send(getError(response.statusCode));
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
