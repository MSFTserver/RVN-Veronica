let TwitterStream = require('twitter-stream-api');
let fs = require('fs');
let config = require('config');
let keys = config.get('rvntweets').config;
let trackers = config.get('rvntweets').trackers;
let tweetChannel = config.get('General').Channels.twitterRSS;
let moment = require('moment-timezone');
let pm2MetricGet = require('../db-helpers.js').pm2MetricGet;
let pm2MetricSave = require('../db-helpers.js').pm2MetricSave;
let randColor = require('../helpers.js').randColor;
setInterval(function() {
  pm2MetricGet('tweets');
}, 100);


exports.custom = ['rvntweets'];

exports.rvntweets = function(bot) {
  var Twitter = GenerateTweetStream();
  Twitter.stream('statuses/filter', {
    track: trackers
  });
  Twitter.on('data', function(obj) {
    var dt = new Date();
    var time = moment()
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
    var randcolor = randColor();
    if (!tweet.startsWith('RT @')) {
      const embed = {
        description: tweet + '\n\n[View Tweet](' + url + ')',
        color: randcolor,
        footer: {
          text: 'Tweeted @ ' + time + ' PST'
        },
        thumbnail: {
          url: userpic
        },
        author: {
          name: username,
          url: 'https://twitter.com/' + username
        }
      };
      pm2MetricSave('tweets');
      bot.channels.get(tweetChannel).send({ embed });
    }
  });
  Twitter.on('data error', function (error) {
    console.log('data error', error);
    console.log('recreating twitter stream api');
    Twitter.close();
    GenerateTweetStream();
});
Twitter.on('data keep-alive', function () {
  //console.log('data keep-alive');
});
Twitter.on('connection error stall', function () {
    console.log('connection error stall');
    console.log('recreating twitter stream api');
    Twitter.close();
    GenerateTweetStream();
});
Twitter.on('connection aborted', function () {
    console.log('connection aborted');
    console.log('recreating twitter stream api');
    Twitter.close();
    GenerateTweetStream();
});
Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
    console.log('recreating twitter stream api');
    Twitter.close();
    GenerateTweetStream();
});
function GenerateTweetStream(){
  return new TwitterStream(keys, false);
}
};
