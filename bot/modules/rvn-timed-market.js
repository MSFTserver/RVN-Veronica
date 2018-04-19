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
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    needle.get(cmcApiUrl + coinName + '/', function(error, response) {
      if (error || response.statusCode !== 200) {
        bot.channels
          .get(TimedStatsChannel)
          .send(cmcApiUrl + ' API is not available');
      } else {
        var data = response.body[0];
        var rank = data.rank;
        var price_usd = Number(data.price_usd);
        var price_btc = Number(data.price_btc);
        var market_cap_usd = Number(data.market_cap_usd);
        var total_supply = Number(data.total_supply);
        var max_supply = 21000000000;
        var percent_change_1h = Number(data.percent_change_1h);
        var percent_change_24h = Number(data.percent_change_24h);
        var json = response.body[0];
        var newjson = parse_obj(json);
        var parse = JSON.stringify(newjson);
        var volume24_usd = parse.replace(/[^0-9]/g, '');
        var hr_indicator = ':thumbsup:';
        var day_indicator = ':thumbsup:';
        if (percent_change_1h < 0) {
          hr_indicator = ':thumbsdown:';
        }
        if (percent_change_24h < 0) {
          day_indicator = ':thumbsdown:';
        }
        if (market_cap_usd == 0) {
          market_cap_usd = Number(price_usd * total_supply);
        }
        needle.get(cmcApiUrl + coinName + '/?convert=GBP', function(
          error,
          response
        ) {
          if (error || response.statusCode !== 200) {
            bot.channels
              .get(TimedStatsChannel)
              .send(cmcApiUrl + ' API is not available');
          } else {
            var data = response.body[0];
            var price_gbp = Number(data.price_gbp);
            needle.get(cmcApiUrl + coinName + '/?convert=EUR', function(
              error,
              response
            ) {
              if (error || response.statusCode !== 200) {
                bot.channels
                  .get(TimedStatsChannel)
                  .send(cmcApiUrl + ' API is not available');
              } else {
                var data = response.body[0];
                var price_eur = Number(data.price_eur);
                description =
                  '**Rank: [' +
                  rank +
                  '](' +
                  statsurl +
                  ')**\n' +
                  '**Data**\n' +
                  'Market Cap: [$' +
                  numberWithCommas(market_cap_usd) +
                  '](' +
                  statsurl +
                  ') \n' +
                  'Total Supply: [' +
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
                    text: 'Last Updated | ' + timestamp + ' PST'
                  },
                  author: {
                    name: 'Coin Market Cap Stats (' + coinSymbol + ')',
                    url: statsurl,
                    icon_url: 'https://i.imgur.com/ZoakSOl.png'
                  }
                };
                bot.channels.get(TimedStatsChannel).send({ embed });
              }
            });
          }
        });
      }
    });
    function parse_obj(obj) {
      var array = [];
      var prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var key = parseInt(prop, 10);
          var value = obj[prop];
          if (typeof value == 'object') {
            value = parse_obj(value);
          }
          array[key] = value;
        }
      }
      return array;
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
