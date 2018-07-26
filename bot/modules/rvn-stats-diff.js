let needle = require('needle');
let config = require('config');
let moment = require('moment-timezone');
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let hasRvnStatsNetworkChannels = require('../helpers.js').hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let findEntry = require('../db-helpers.js').findEntry;
let channelID = config.get('General').Channels.botspam;

exports.commands = [
  'difficulty'
]

exports.difficulty = {
  usage: '',
  description: 'shows current difficulty and retarget',
  process: function(bot,msg,suffix){
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to Diff bot.'
      );
      return;
    }
    needle.get(explorerApiUrl + 'api/status?q=getMiningInfo', function(
      error,
      response
    ) {
      if (response.statusCode !== 200) {
        msg.channel.send(getError(response.statusCode));
      } else {
        var diff = response.body.miningInfo.difficulty;
        var hashrate = response.body.miningInfo.networkhashps;
        needle.get(explorerApiUrl + 'api/status', function(
          error,
          response
        ) {
          if (response.statusCode !== 200) {
            msg.channel.send(getError(response.statusCode));
          } else {
        var blocks = response.body.info.blocks;
        var changedDiff = blocks / 2016;
        var changeOnBlock = (Math.floor(changedDiff) + 1) * 2016;
        var changeIn = changeOnBlock - blocks;
        findEntry(bot, msg, 'blockTime', false, false, getBlockTimes);
        function getBlockTimes(bot, msg, docs) {
          var blockTimesLog = [];
          docs.forEach(function(results) {
            blockTimesLog.push(results.Time);
          });
          const arrMax = arr => Math.max(...arr);
          const arrMin = arr => Math.min(...arr);
          const arrSum = arr => arr.reduce((a,b) => a + b, 0)
          const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
          const arrCount = arr => arr.length;
          var timeMax = arrMax(blockTimesLog);
          var timeMin = arrMin(blockTimesLog);
          var timeTotal = arrSum(blockTimesLog);
          var timeAvg = arrAvg(blockTimesLog);
          var timeCount = arrCount(blockTimesLog);
          var newDiff = (diff * 60) / (timeAvg * (2**32) / hashrate);
          var accuracy = timeCount / 2016 * 100;
          var oldTime = getDMHS(timeTotal);
          var newMath = (2016 - timeCount) * timeAvg
          var newTime = getDMHS(newMath);
          msg.channel.send(
            'Current Diff: **' + numberWithCommas(diff) +
            'Next Diff In: **' + numberWithCommas(changeIn) + ' Blocks**\n' +
            'Next Diff At: **Block ' + numberWithCommas(changeOnBlock) + '****\n' +
            'Estimated Next Diff: **' + numberWithCommas(newDiff) + '**\n' +
            'Estimate Accurency: **' + accuracy + '%**\n'
            'Estimated Time Till Change: ' + newTime + '\n' +
            'Time Since Last Change: **' + oldTime + '\n' +
            'Average Solve Time: **' + timeAvg + ' Seconds**\n' +
            'Longest Solve Time: **' + timeMax + ' Seconds**\n' +
            'Shortest Solve Time: **' + timeMin + ' Seconds**\n' +
            'Retargeted: **' + numberWithCommas(Math.floor(changedDiff)) + ' Times**\n' +
            'based off the last ' + timeCount + ' blocks since diff change!'
          );
        }
      }
    });
      }
    });
    function getDMHS(timeInSeconds){
      var seconds = parseInt(timeInSeconds, 10);
      var days = Math.floor(seconds / (3600*24));
      seconds  -= days*3600*24;
      var hrs   = Math.floor(seconds / 3600);
      seconds  -= hrs*3600;
      var mnts = Math.floor(seconds / 60);
      seconds  -= mnts*60;
      var DMHS = days + ' days, ' + hrs + ' Hrs, ' + mnts + ' Minutes, ' + seconds + ' Seconds'
      return DMHS;
    }
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
}
