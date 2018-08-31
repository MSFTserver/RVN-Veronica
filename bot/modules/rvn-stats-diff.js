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
        needle.get(explorerApiUrl + 'api/status', function(
          error,
          response
        ) {
          if (response.statusCode !== 200) {
            msg.channel.send(getError(response.statusCode));
          } else {
        var blocks = response.body.info.blocks;
        findEntry(bot, msg, 'blockTime', false, false, getBlockTimes);
        function getBlockTimes(bot, msg, docs) {
          var blockTimesLog = [];
          var blockDiffLog = [];
          if (!docs || docs.length <= 2) {
            msg.channel.send('no blocks in database set yet!!!');
            return;
          }
          docs.forEach(function(results1) {
            blockTimesLog.push(results1.SolveTime);
          });
          docs.forEach(function(results2) {
            blockDiffLog.push(results2.Diff);
          });
          const arrMax = arr => Math.max(...arr);
          const arrMin = arr => Math.min(...arr);
          const arrSum = arr => arr.reduce((a,b) => a + b, 0)
          const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
          const arrCount = arr => arr.length;
          var timeMax = arrMax(blockTimesLog.slice(-999999));
          var timeMin = arrMin(blockTimesLog.slice(-999999));
          //var timeTotal = arrSum(blockTimesLog.slice(0, 999999));
          var timeAvg = arrAvg(blockTimesLog.slice(-999999));
          var timeCount = arrCount(blockTimesLog.slice(-999999));
          var diffMax = arrMax(blockDiffLog.slice(-999999));
          var diffMin = arrMin(blockDiffLog.slice(-999999));
          var diffCount = arrCount(blockDiffLog.slice(-999999));
          var diffAvg = arrAvg(blockDiffLog);
          var newDiff = 2222222 / (((diff + 2600) / 9 ) ** 2);
          var message = '__**Dark Gravity Wave Calc!**__\n' +
          'Current Diff: **' + numberWithCommas(diff.toFixed(0)) + '**\n' +
          'Estimated Diff: **' + numberWithCommas(newDiff.toFixed(0)) + '**\n';
          if (diffCount > 100) {
            var diffAvg100 = arrAvg(blockDiffLog.slice(-99));
            message = message + 'Average Diff (100 blocks): **' + numberWithCommas(diffAvg100.toFixed(0)) + '**\n';
            if (diffCount > 1000) {
              var diffAvg1k = arrAvg(blockDiffLog.slice(-999));
              message = message + 'Average Diff (1k blocks): **' + numberWithCommas(diffAvg1k.toFixed(0)) + '**\n';
              if (diffCount > 10000) {
                var diffAvg10k = arrAvg(blockDiffLog.slice(-9999));
                message = message + 'Average Diff (10k blocks): **' + numberWithCommas(diffAvg10k.toFixed(0)) + '**\n';
                if (diffCount > 100000) {
                  var diffAvg100k = arrAvg(blockDiffLog.slice(-99999));
                  message = message + 'Average Diff (100k blocks): **' + numberWithCommas(diffAvg100k.toFixed(0)) + '**\n';
                  if (diffCount > 1000000) {
                    var diffAvg1m = arrAvg(blockDiffLog.slice(-999999));
                    message = message + 'Average Diff (1m blocks): **' + numberWithCommas(diffAvg1m.toFixed(0)) + '**\n';
                  }
                }
              }
            }
          }
          var message = message + '**based off ' + timeCount + ' Blocks!**\n' +
          'Average Difficulty: **' + numberWithCommas(diffAvg.toFixed(0)) +  '**\n' +
          'Highest Difficulty: **' + numberWithCommas(diffMax.toFixed(0)) +  '**\n' +
          'Lowest Difficulty: **' + numberWithCommas(diffMin.toFixed(0)) +  '**\n' +
          'Average Solve Time: **' + timeAvg.toFixed(0) + ' Seconds**\n' +
          'Longest Solve Time: **' + timeMax.toFixed(0) + ' Seconds**\n' +
          'Shortest Solve Time: **' + timeMin.toFixed(0) + ' Seconds**\n';
          msg.channel.send(message);
        }
      }
    });
      }
    });
    // function getDMHS(timeInSeconds){
    //   var seconds = parseInt(timeInSeconds, 10);
    //   var days = Math.floor(seconds / (3600*24));
    //   seconds  -= days*3600*24;
    //   var hrs   = Math.floor(seconds / 3600);
    //   seconds  -= hrs*3600;
    //   var mnts = Math.floor(seconds / 60);
    //   seconds  -= mnts*60;
    //   var DMHS = days + ' days, ' + hrs + ' Hrs, ' + mnts + ' Minutes, ' + seconds + ' Seconds'
    //   return DMHS;
    // }
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
