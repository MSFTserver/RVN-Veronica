`use strict`;
let TwitterStream = require(`twitter-stream-api`);
let fs = require(`fs`);
let moment = require(`moment-timezone`);
let { pm2MetricGet, pm2MetricSave } = require(`../helpers/db-helper.js`);
let { randColor } = require(`../helpers/cmd-helper.js`);
let config = require(`config`);
let keys = config.get(`rvntweets`).config;
let { trackers } = config.get(`rvntweets`);
let tweetChannel = config.get(`General`).Channels.twitterRSS;
setInterval(function() {
  pm2MetricGet(`tweets`);
}, 100);
exports.custom = [`rvntweets`];
exports.rvntweets = function(bot) {
  var Twitter = GenerateTweetStream();
  Twitter.stream(`statuses/filter`, { track: trackers });
  Twitter.on(`data`, function(obj) {
    var dt = new Date();
    var time = moment()
      .tz(`America/Los_Angeles`)
      .format(`MM-DD-YYYY hh:mm a`);
    var data = obj.toString();
    data = JSON.parse(data);
    var userdata = data.user;
    var username = userdata.screen_name;
    var tweetID = data.id_str;
    var userpic = userdata.profile_image_url_https;
    var url = `https://twitter.com/${username}/status/${tweetID}`;
    var tweet = data.text;
    var randcolor = randColor();
    if (!tweet.startsWith(`RT @`)) {
      const embed = {
        description: tweet + `\n\n[View Tweet](${url})`,
        color: randcolor,
        footer: { text: `Tweeted @ ${time} PST` },
        thumbnail: { url: userpic },
        author: { name: username, url: `https://twitter.com/${username}` }
      };
      pm2MetricSave(`tweets`);
      bot.channels.get(tweetChannel).send({ embed });
    }
  });
  Twitter.on(`data error`, function(error) {
    console.log(`data error`, error);
  });
  Twitter.on(`data keep-alive`, function() {});
  Twitter.on(`connection error stall`, function() {
    console.log(`connection error stall`);
  });
  Twitter.on(`connection aborted`, function() {
    console.log(`connection aborted`);
  });
  Twitter.on(`connection error network`, function(error) {
    console.log(`connection error network`, error);
  });
  function GenerateTweetStream() {
    return new TwitterStream(keys, !1);
  }
};