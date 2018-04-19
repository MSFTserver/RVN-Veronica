let TwitterStream = require('twitter-stream-api');
let fs = require('fs');
let config = require('config');
let keys = config.get('rvntweets').config;
let trackers = config.get('rvntweets').trackers;
let tweetChannel = config.get('General').Channels.twitterRSS;
let moment = require('moment-timezone');
let Probe = require('pmx').probe();
let counter = 0;
setInterval(function() {
  let metric = Probe.metric({
    name: 'rvn tweets',
    value: function() {
      return counter;
    }
  });
}, 100);
let colors = [
  '37887',
  '65535',
  '65429',
  '851712',
  '16775424',
  '16729856',
  '16711831',
  '16515327',
  '9568511',
  '12262171',
  '12288027',
  '12299291',
  '10271008',
  '8173856',
  '6076704',
  '3324192',
  '2144612',
  '2144676',
  '2141881',
  '2133689',
  '2125497',
  '2117305',
  '2957497',
  '6758585',
  '8855737',
  '10952889',
  '12132517',
  '12132480',
  '12132453',
  '14176360',
  '14176388',
  '14176426',
  '14176469',
  '12538072',
  '9392344',
  '8482011',
  '7110363',
  '7122139',
  '7132123',
  '7134132',
  '7134105',
  '7134078',
  '8444780',
  '11000684',
  '13294444',
  '14401900',
  '14391148',
  '14380140',
  '16777215',
  '8274755',
  '8282179',
  '8286275',
  '8093251',
  '7044675',
  '4881987',
  '4423261',
  '4423286',
  '4418430',
  '4411774',
  '4998014',
  '6374270',
  '7422846',
  '8274810',
  '8274792',
  '8274776'
];

exports.custom = [
  'rvntweets' //change this to your function name
];

exports.rvntweets = function(bot) {
  var Twitter = new TwitterStream(keys, false);
  Twitter.stream('statuses/filter', {
    track: trackers
  });
  Twitter.on('data', function(obj) {
    var dt = new Date();
    var timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    var data = obj.toString();
    data = JSON.parse(data);
    var userdata = data.user;
    var username = userdata.screen_name;
    var tweetID = data.id_str;
    var userpic = userdata.profile_image_url_https;
    var url = 'https://twitter.com/' + username + '/status/' + tweetID;
    var tweet = data.text;
    var randcolor = colors[Math.floor(Math.random() * colors.length)];
    if (!tweet.startsWith('RT @')) {
      const embed = {
        description: tweet + '\n\n[View Tweet](' + url + ')',
        color: randcolor,
        footer: {
          text: 'Tweeted @ ' + timestamp + ' PST'
        },
        thumbnail: {
          url: userpic
        },
        author: {
          name: username,
          url: 'https://twitter.com/' + username
        }
      };
      counter++;
      bot.channels.get(tweetChannel).send({ embed });
    }
  });
};
