'use strict';
let needle = require('needle');
let config = require('config');
let moment = require('moment-timezone');
let hasRvnStatsNetworkChannels = require('../helpers.js')
  .hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;
let algolist = {
  '0': 'blake',
  '1': 'bmw',
  '2': 'groestl',
  '3': 'jh',
  '4': 'keccak',
  '5': 'skein',
  '6': 'luffa',
  '7': 'cubehash',
  '8': 'shavite',
  '9': 'simd',
  a: 'echo',
  b: 'hamsi',
  c: 'fugue',
  d: 'shabal',
  e: 'whirlpool',
  f: 'sha512'
};

exports.commands = ['block'];

exports.block = {
  usage: '',
  description:
    'Displays current block info\n**!block number** <#>\n     displays block info using blocks Height\n**!block hash** <block-hash>\n     displays block info using blocks Hash',
  process: function(bot, msg, suffix) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to hash bot.'
      );
      return;
    }
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (words[0] == 'number') {
      var block = getValidatedAmount(words[1]);
      getBlockbyNumber(block);
    }
    if (words[0] == 'hash') {
      var block = words[1];
      getBlockbyHash(block);
    }
    if (!words[0]) {
      var block = NaN;
      getBlockbyNumber(block);
    }
    function getBlockbyHash(block) {
      needle.get(explorerApiUrl + 'api/block/' + block, function(
        error,
        response
      ) {
        if (response.statusCode !== 200) {
          if (response.statusCode == 122) {
             msg.channel.send('ERROR: ' + 'Request-URI too long');
           }
          if (response.statusCode == 300) {
             msg.channel.send('ERROR: ' + 'Multiple Choices');
             }
          if (response.statusCode == 301) {
             msg.channel.send('ERROR: ' + 'Moved Permanently');
             }
          if (response.statusCode == 303) {
             msg.channel.send('ERROR: ' + 'See Other');
             }
          if (response.statusCode == 304) {
             msg.channel.send('ERROR: ' + 'Not Modified');
             }
          if (response.statusCode == 305) {
             msg.channel.send('ERROR: ' + 'Use Proxy');
             }
          if (response.statusCode == 306) {
             msg.channel.send('ERROR: ' + 'Switch Proxy');
             }
          if (response.statusCode == 307) {
             msg.channel.send('ERROR: ' + 'Temporary Redirect');
             }
          if (response.statusCode == 308) {
             msg.channel.send('ERROR: ' + 'Permanent Redirect');
             }
          if (response.statusCode == 400) {
             msg.channel.send('ERROR: ' + 'Bad Request');
             }
          if (response.statusCode == 401) {
             msg.channel.send('ERROR: ' + 'Unauth­orized');
             }
          if (response.statusCode == 402) {
             msg.channel.send('ERROR: ' + 'Payment Required');
             }
          if (response.statusCode == 403) {
             msg.channel.send('ERROR: ' + 'Forbidden');
             }
          if (response.statusCode == 404) {
             msg.channel.send('ERROR: ' + 'Not Found');
             }
          if (response.statusCode == 405) {
             msg.channel.send('ERROR: ' + 'Method Not Allowed');
             }
          if (response.statusCode == 406) {
             msg.channel.send('ERROR: ' + 'Not Acceptable');
             }
          if (response.statusCode == 407) {
             msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
             }
          if (response.statusCode == 408) {
             msg.channel.send('ERROR: ' + 'Request Timeout');
             }
          if (response.statusCode == 409) {
             msg.channel.send('ERROR: ' + 'Conflict');
             }
          if (response.statusCode == 410) {
             msg.channel.send('ERROR: ' + 'Gone');
             }
          if (response.statusCode == 411) {
             msg.channel.send('ERROR: ' + 'Length Required');
             }
          if (response.statusCode == 412) {
             msg.channel.send('ERROR: ' + 'Precondition Failed');
             }
          if (response.statusCode == 413) {
             msg.channel.send('ERROR: ' + 'Request Entity Too Large');
             }
          if (response.statusCode == 414) {
             msg.channel.send('ERROR: ' + 'Request-URI Too Long');
             }
          if (response.statusCode == 415) {
             msg.channel.send('ERROR: ' + 'Unsupported Media Type');
             }
          if (response.statusCode == 416) {
             msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
             }
          if (response.statusCode == 417) {
             msg.channel.send('ERROR: ' + 'Expectation Failed');
             }
          if (response.statusCode == 418) {
             msg.channel.send('ERROR: ' + 'I\'m a teapot');
             }
          if (response.statusCode == 422) {
             msg.channel.send('ERROR: ' + 'Unprocessable Entity');
             }
          if (response.statusCode == 423) {
             msg.channel.send('ERROR: ' + 'Locked');
             }
          if (response.statusCode == 424) {
             msg.channel.send('ERROR: ' + 'Failed Dependency');
             }
          if (response.statusCode == 425) {
             msg.channel.send('ERROR: ' + 'Unordered Collection');
             }
          if (response.statusCode == 426) {
             msg.channel.send('ERROR: ' + 'Upgrade Required');
             }
          if (response.statusCode == 428) {
             msg.channel.send('ERROR: ' + 'Precondition Required ');
             }
          if (response.statusCode == 429) {
             msg.channel.send('ERROR: ' + 'Too Many Requests ');
             }
          if (response.statusCode == 431) {
             msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
             }
          if (response.statusCode == 444) {
             msg.channel.send('ERROR: ' + 'No Response ');
             }
          if (response.statusCode == 449) {
             msg.channel.send('ERROR: ' + 'Retry With ');
             }
          if (response.statusCode == 450) {
             msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
             }
          if (response.statusCode == 451) {
             msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
             }
          if (response.statusCode == 499) {
             msg.channel.send('ERROR: ' + 'Client Closed Request');
             }
          if (response.statusCode == 500) {
             msg.channel.send('ERROR: ' + 'Internal Server Error');
             }
          if (response.statusCode == 501) {
             msg.channel.send('ERROR: ' + 'Not Implemented');
             }
          if (response.statusCode == 502) {
             msg.channel.send('ERROR: ' + 'Bad Gateway');
             }
          if (response.statusCode == 503) {
             msg.channel.send('ERROR: ' + 'Service Unavailable');
             }
          if (response.statusCode == 504) {
             msg.channel.send('ERROR: ' + 'Gateway Timeout');
             }
          if (response.statusCode == 505) {
             msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
             }
          if (response.statusCode == 506) {
             msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
             }
          if (response.statusCode == 507) {
             msg.channel.send('ERROR: ' + 'Insufficient Storage');
             }
          if (response.statusCode == 508) {
             msg.channel.send('ERROR: ' + 'Loop Detected');
             }
          if (response.statusCode == 509) {
             msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
             }
          if (response.statusCode == 510) {
             msg.channel.send('ERROR: ' + 'Not Extended');
             }
          if (response.statusCode == 511) {
             msg.channel.send('ERROR: ' + 'Network Authentication Required');
             }
          if (response.statusCode == 598) {
             msg.channel.send('ERROR: ' + 'Network read timeout error');
             }
          if (response.statusCode == 599) {
             msg.channel.send('ERROR: ' + 'Network connect timeout error');
             }
        } else {
          var currentHeight = response.body.height;
          var previousHeight = currentHeight - 1;
          var difficulty = response.body.difficulty;
          var currentTime = Number(response.body.time);
          var currentReward = Number(response.body.reward);
          var currentBlockAlgo = block.substr(
            block.length - 16
          );
          var currentAlgo = currentBlockAlgo.split('');
          var currentAlgoOrder =
            algolist[currentAlgo[0]] +
            '->' +
            algolist[currentAlgo[1]] +
            '->' +
            algolist[currentAlgo[2]] +
            '->' +
            algolist[currentAlgo[3]] +
            '->' +
            algolist[currentAlgo[4]] +
            '->' +
            algolist[currentAlgo[5]] +
            '->' +
            algolist[currentAlgo[6]] +
            '->' +
            algolist[currentAlgo[7]] +
            '->\n' +
            algolist[currentAlgo[8]] +
            '->' +
            algolist[currentAlgo[9]] +
            '->' +
            algolist[currentAlgo[10]] +
            '->' +
            algolist[currentAlgo[11]] +
            '->' +
            algolist[currentAlgo[12]] +
            '->' +
            algolist[currentAlgo[13]] +
            '->' +
            algolist[currentAlgo[14]] +
            '->' +
            algolist[currentAlgo[15]];
          needle.get(
            explorerApiUrl + 'api/txs?block=' + currentHeight,
            function(error, response) {
              if (response.statusCode !== 200) {
                if (response.statusCode == 122) {
                   msg.channel.send('ERROR: ' + 'Request-URI too long');
                 }
                if (response.statusCode == 300) {
                   msg.channel.send('ERROR: ' + 'Multiple Choices');
                   }
                if (response.statusCode == 301) {
                   msg.channel.send('ERROR: ' + 'Moved Permanently');
                   }
                if (response.statusCode == 303) {
                   msg.channel.send('ERROR: ' + 'See Other');
                   }
                if (response.statusCode == 304) {
                   msg.channel.send('ERROR: ' + 'Not Modified');
                   }
                if (response.statusCode == 305) {
                   msg.channel.send('ERROR: ' + 'Use Proxy');
                   }
                if (response.statusCode == 306) {
                   msg.channel.send('ERROR: ' + 'Switch Proxy');
                   }
                if (response.statusCode == 307) {
                   msg.channel.send('ERROR: ' + 'Temporary Redirect');
                   }
                if (response.statusCode == 308) {
                   msg.channel.send('ERROR: ' + 'Permanent Redirect');
                   }
                if (response.statusCode == 400) {
                   msg.channel.send('ERROR: ' + 'Bad Request');
                   }
                if (response.statusCode == 401) {
                   msg.channel.send('ERROR: ' + 'Unauth­orized');
                   }
                if (response.statusCode == 402) {
                   msg.channel.send('ERROR: ' + 'Payment Required');
                   }
                if (response.statusCode == 403) {
                   msg.channel.send('ERROR: ' + 'Forbidden');
                   }
                if (response.statusCode == 404) {
                   msg.channel.send('ERROR: ' + 'Not Found');
                   }
                if (response.statusCode == 405) {
                   msg.channel.send('ERROR: ' + 'Method Not Allowed');
                   }
                if (response.statusCode == 406) {
                   msg.channel.send('ERROR: ' + 'Not Acceptable');
                   }
                if (response.statusCode == 407) {
                   msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                   }
                if (response.statusCode == 408) {
                   msg.channel.send('ERROR: ' + 'Request Timeout');
                   }
                if (response.statusCode == 409) {
                   msg.channel.send('ERROR: ' + 'Conflict');
                   }
                if (response.statusCode == 410) {
                   msg.channel.send('ERROR: ' + 'Gone');
                   }
                if (response.statusCode == 411) {
                   msg.channel.send('ERROR: ' + 'Length Required');
                   }
                if (response.statusCode == 412) {
                   msg.channel.send('ERROR: ' + 'Precondition Failed');
                   }
                if (response.statusCode == 413) {
                   msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                   }
                if (response.statusCode == 414) {
                   msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                   }
                if (response.statusCode == 415) {
                   msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                   }
                if (response.statusCode == 416) {
                   msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                   }
                if (response.statusCode == 417) {
                   msg.channel.send('ERROR: ' + 'Expectation Failed');
                   }
                if (response.statusCode == 418) {
                   msg.channel.send('ERROR: ' + 'I\'m a teapot');
                   }
                if (response.statusCode == 422) {
                   msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                   }
                if (response.statusCode == 423) {
                   msg.channel.send('ERROR: ' + 'Locked');
                   }
                if (response.statusCode == 424) {
                   msg.channel.send('ERROR: ' + 'Failed Dependency');
                   }
                if (response.statusCode == 425) {
                   msg.channel.send('ERROR: ' + 'Unordered Collection');
                   }
                if (response.statusCode == 426) {
                   msg.channel.send('ERROR: ' + 'Upgrade Required');
                   }
                if (response.statusCode == 428) {
                   msg.channel.send('ERROR: ' + 'Precondition Required ');
                   }
                if (response.statusCode == 429) {
                   msg.channel.send('ERROR: ' + 'Too Many Requests ');
                   }
                if (response.statusCode == 431) {
                   msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                   }
                if (response.statusCode == 444) {
                   msg.channel.send('ERROR: ' + 'No Response ');
                   }
                if (response.statusCode == 449) {
                   msg.channel.send('ERROR: ' + 'Retry With ');
                   }
                if (response.statusCode == 450) {
                   msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                   }
                if (response.statusCode == 451) {
                   msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                   }
                if (response.statusCode == 499) {
                   msg.channel.send('ERROR: ' + 'Client Closed Request');
                   }
                if (response.statusCode == 500) {
                   msg.channel.send('ERROR: ' + 'Internal Server Error');
                   }
                if (response.statusCode == 501) {
                   msg.channel.send('ERROR: ' + 'Not Implemented');
                   }
                if (response.statusCode == 502) {
                   msg.channel.send('ERROR: ' + 'Bad Gateway');
                   }
                if (response.statusCode == 503) {
                   msg.channel.send('ERROR: ' + 'Service Unavailable');
                   }
                if (response.statusCode == 504) {
                   msg.channel.send('ERROR: ' + 'Gateway Timeout');
                   }
                if (response.statusCode == 505) {
                   msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                   }
                if (response.statusCode == 506) {
                   msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                   }
                if (response.statusCode == 507) {
                   msg.channel.send('ERROR: ' + 'Insufficient Storage');
                   }
                if (response.statusCode == 508) {
                   msg.channel.send('ERROR: ' + 'Loop Detected');
                   }
                if (response.statusCode == 509) {
                   msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                   }
                if (response.statusCode == 510) {
                   msg.channel.send('ERROR: ' + 'Not Extended');
                   }
                if (response.statusCode == 511) {
                   msg.channel.send('ERROR: ' + 'Network Authentication Required');
                   }
                if (response.statusCode == 598) {
                   msg.channel.send('ERROR: ' + 'Network read timeout error');
                   }
                if (response.statusCode == 599) {
                   msg.channel.send('ERROR: ' + 'Network connect timeout error');
                   }
              } else {
                var currentWinnerArray = response.body;
                var currentWinner = [];
                var currentWinnerAddys = [];
                for (var i = 0; i < currentWinnerArray.txs.length; i++) {
                  var position = i++;
                  if (
                    currentWinnerArray.txs[position].hasOwnProperty(
                      'isCoinBase'
                    )
                  ) {
                    currentWinner.push(currentWinnerArray.txs[position]);
                  }
                }
                for (var l = 0; l < currentWinner[0].vout.length; l++) {
                  var addys = currentWinner[0].vout[l].scriptPubKey.addresses;
                  if (addys) {
                    currentWinnerAddys.push(addys);
                  }
                }
                var currentBlockWinner = currentWinnerAddys.join(' \n');
                if (
                  currentBlockWinner.includes(
                    'RFgNoNzd8KEHbeFxnvJamy4yCV8ZDvR4jD'
                  )
                ) {
                  currentBlockWinner = '[suprnova](https://rvn.suprnova.cc/)';
                } else if (
                  currentBlockWinner.includes(
                    'RHQRGxCsVLwW6GYMkNHDRnzWaMHinXsGDt'
                  )
                ) {
                  currentBlockWinner = '[Yiimp](http://yiimp.eu/)';
                } else if (
                  currentBlockWinner.includes(
                    'RNJMLCLiss7hf23rZSq9BzhoQ94H5EDQTy'
                  )
                ) {
                  currentBlockWinner =
                    '[Raven Miner](http://www.ravenminer.com/)';
                } else if (
                  currentBlockWinner.includes(
                    'RVG96MbaKEDFzzj9NzbAuxkDt86KAm2Qj5'
                  )
                ) {
                  currentBlockWinner = '[f2pool](https://labs.f2pool.com/labs)';
                } else if (
                  currentBlockWinner.includes(
                    'RTUYcbkJo9zuW74brFc3bwxXyKpCiogxT7'
                  )
                ) {
                  currentBlockWinner = '[Pickaxe Pro](https://pickaxe.pro/)';
                } else if (
                  currentBlockWinner.includes(
                    'RN6vJ31K3Ycj7S4obdtYckXPPSAy7z5g2p'
                  )
                ) {
                  currentBlockWinner =
                    '[Mining Panda](https://miningpanda.site)';
                } else if (
                  currentBlockWinner.includes(
                    'RG2tNoZpm6VKgpnUDqHr8L9gDL7kh43JnW'
                  )
                ) {
                  currentBlockWinner =
                    '[Crypto Pool Party](https://cryptopool.party/)';
                } else if (
                  currentBlockWinner.includes(
                    'RGdHyWTLp9rR5mfUX2hGdAjCuYaDqa3hDo'
                  )
                ) {
                  currentBlockWinner =
                    '[KRAWWW Miner](http://krawww-miner.eu/)';
                } else if (
                  currentBlockWinner.includes(
                    'RHLJmCnpZ9JKBxYj1RWc7teD8gHSxkTozs'
                  )
                ) {
                  currentBlockWinner = '[minepool](https://www.minepool.com/)';
                } else if (
                  currentBlockWinner.includes(
                    'RF7FaQRQq9DdVcaZZikdahdacTiJh17NDU'
                  )
                ) {
                  currentBlockWinner =
                    '[Virtopia](https://mineit.virtopia.ca/)';
                } else if (
                  currentBlockWinner.includes(
                    'RGBjnf4gpXsJLvcGqvU1yc6ZwKQMEPqaTf'
                  )
                ) {
                  currentBlockWinner =
                    '[OMEGA Pool](https://www.omegapool.cc/?page=dashboard&coin=raven)';
                } else if (
                  currentBlockWinner.includes(
                    'RAFmhKe26pSinN9eERhqWk1nUMnx33LDi2'
                  )
                ) {
                  currentBlockWinner =
                    '[Evocatioin Network](https://evocation.network/stats.html)';
                } else if (
                  currentBlockWinner.includes(
                    'RK4GiCpC6nvX2sswH3pre1nwbng8S8ViCn'
                  )
                ) {
                  currentBlockWinner =
                    '[Coin Blockers](https://rvn.coinblockers.com/)';
                } else if (
                  currentBlockWinner.includes(
                    'RQZS8LBvv2VWuAEWF5BXoRikoG6MRp5asH'
                  )
                ) {
                  currentBlockWinner = '[BSOD](https://bsod.pw/site/mining)';
                } else if (
                  currentBlockWinner.includes(
                    'R9JkHdoFVMmuhDnQX3W8L6KDKfzueWNQuj'
                  )
                ) {
                  currentBlockWinner = '[Hash 4 Life](https://hash4.life/)';
                } else if (
                  currentBlockWinner.includes(
                    'REESXgjhAuarm3Vs9rxPZpEmuAoSmbHBXV'
                  )
                ) {
                  currentBlockWinner =
                    '[Ominous Network](http://pool.ominousnetwork.com/)';
                }
                needle.get(
                  explorerApiUrl + 'api/block-index/' + previousHeight,
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      if (response.statusCode == 122) {
                         msg.channel.send('ERROR: ' + 'Request-URI too long');
                       }
                      if (response.statusCode == 300) {
                         msg.channel.send('ERROR: ' + 'Multiple Choices');
                         }
                      if (response.statusCode == 301) {
                         msg.channel.send('ERROR: ' + 'Moved Permanently');
                         }
                      if (response.statusCode == 303) {
                         msg.channel.send('ERROR: ' + 'See Other');
                         }
                      if (response.statusCode == 304) {
                         msg.channel.send('ERROR: ' + 'Not Modified');
                         }
                      if (response.statusCode == 305) {
                         msg.channel.send('ERROR: ' + 'Use Proxy');
                         }
                      if (response.statusCode == 306) {
                         msg.channel.send('ERROR: ' + 'Switch Proxy');
                         }
                      if (response.statusCode == 307) {
                         msg.channel.send('ERROR: ' + 'Temporary Redirect');
                         }
                      if (response.statusCode == 308) {
                         msg.channel.send('ERROR: ' + 'Permanent Redirect');
                         }
                      if (response.statusCode == 400) {
                         msg.channel.send('ERROR: ' + 'Bad Request');
                         }
                      if (response.statusCode == 401) {
                         msg.channel.send('ERROR: ' + 'Unauth­orized');
                         }
                      if (response.statusCode == 402) {
                         msg.channel.send('ERROR: ' + 'Payment Required');
                         }
                      if (response.statusCode == 403) {
                         msg.channel.send('ERROR: ' + 'Forbidden');
                         }
                      if (response.statusCode == 404) {
                         msg.channel.send('ERROR: ' + 'Not Found');
                         }
                      if (response.statusCode == 405) {
                         msg.channel.send('ERROR: ' + 'Method Not Allowed');
                         }
                      if (response.statusCode == 406) {
                         msg.channel.send('ERROR: ' + 'Not Acceptable');
                         }
                      if (response.statusCode == 407) {
                         msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                         }
                      if (response.statusCode == 408) {
                         msg.channel.send('ERROR: ' + 'Request Timeout');
                         }
                      if (response.statusCode == 409) {
                         msg.channel.send('ERROR: ' + 'Conflict');
                         }
                      if (response.statusCode == 410) {
                         msg.channel.send('ERROR: ' + 'Gone');
                         }
                      if (response.statusCode == 411) {
                         msg.channel.send('ERROR: ' + 'Length Required');
                         }
                      if (response.statusCode == 412) {
                         msg.channel.send('ERROR: ' + 'Precondition Failed');
                         }
                      if (response.statusCode == 413) {
                         msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                         }
                      if (response.statusCode == 414) {
                         msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                         }
                      if (response.statusCode == 415) {
                         msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                         }
                      if (response.statusCode == 416) {
                         msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                         }
                      if (response.statusCode == 417) {
                         msg.channel.send('ERROR: ' + 'Expectation Failed');
                         }
                      if (response.statusCode == 418) {
                         msg.channel.send('ERROR: ' + 'I\'m a teapot');
                         }
                      if (response.statusCode == 422) {
                         msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                         }
                      if (response.statusCode == 423) {
                         msg.channel.send('ERROR: ' + 'Locked');
                         }
                      if (response.statusCode == 424) {
                         msg.channel.send('ERROR: ' + 'Failed Dependency');
                         }
                      if (response.statusCode == 425) {
                         msg.channel.send('ERROR: ' + 'Unordered Collection');
                         }
                      if (response.statusCode == 426) {
                         msg.channel.send('ERROR: ' + 'Upgrade Required');
                         }
                      if (response.statusCode == 428) {
                         msg.channel.send('ERROR: ' + 'Precondition Required ');
                         }
                      if (response.statusCode == 429) {
                         msg.channel.send('ERROR: ' + 'Too Many Requests ');
                         }
                      if (response.statusCode == 431) {
                         msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                         }
                      if (response.statusCode == 444) {
                         msg.channel.send('ERROR: ' + 'No Response ');
                         }
                      if (response.statusCode == 449) {
                         msg.channel.send('ERROR: ' + 'Retry With ');
                         }
                      if (response.statusCode == 450) {
                         msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                         }
                      if (response.statusCode == 451) {
                         msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                         }
                      if (response.statusCode == 499) {
                         msg.channel.send('ERROR: ' + 'Client Closed Request');
                         }
                      if (response.statusCode == 500) {
                         msg.channel.send('ERROR: ' + 'Internal Server Error');
                         }
                      if (response.statusCode == 501) {
                         msg.channel.send('ERROR: ' + 'Not Implemented');
                         }
                      if (response.statusCode == 502) {
                         msg.channel.send('ERROR: ' + 'Bad Gateway');
                         }
                      if (response.statusCode == 503) {
                         msg.channel.send('ERROR: ' + 'Service Unavailable');
                         }
                      if (response.statusCode == 504) {
                         msg.channel.send('ERROR: ' + 'Gateway Timeout');
                         }
                      if (response.statusCode == 505) {
                         msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                         }
                      if (response.statusCode == 506) {
                         msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                         }
                      if (response.statusCode == 507) {
                         msg.channel.send('ERROR: ' + 'Insufficient Storage');
                         }
                      if (response.statusCode == 508) {
                         msg.channel.send('ERROR: ' + 'Loop Detected');
                         }
                      if (response.statusCode == 509) {
                         msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                         }
                      if (response.statusCode == 510) {
                         msg.channel.send('ERROR: ' + 'Not Extended');
                         }
                      if (response.statusCode == 511) {
                         msg.channel.send('ERROR: ' + 'Network Authentication Required');
                         }
                      if (response.statusCode == 598) {
                         msg.channel.send('ERROR: ' + 'Network read timeout error');
                         }
                      if (response.statusCode == 599) {
                         msg.channel.send('ERROR: ' + 'Network connect timeout error');
                         }
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/block/' + previousBlockHash,
                        function(error, response) {
                          if (response.statusCode !== 200) {
                            if (response.statusCode == 122) {
                               msg.channel.send('ERROR: ' + 'Request-URI too long');
                             }
                            if (response.statusCode == 300) {
                               msg.channel.send('ERROR: ' + 'Multiple Choices');
                               }
                            if (response.statusCode == 301) {
                               msg.channel.send('ERROR: ' + 'Moved Permanently');
                               }
                            if (response.statusCode == 303) {
                               msg.channel.send('ERROR: ' + 'See Other');
                               }
                            if (response.statusCode == 304) {
                               msg.channel.send('ERROR: ' + 'Not Modified');
                               }
                            if (response.statusCode == 305) {
                               msg.channel.send('ERROR: ' + 'Use Proxy');
                               }
                            if (response.statusCode == 306) {
                               msg.channel.send('ERROR: ' + 'Switch Proxy');
                               }
                            if (response.statusCode == 307) {
                               msg.channel.send('ERROR: ' + 'Temporary Redirect');
                               }
                            if (response.statusCode == 308) {
                               msg.channel.send('ERROR: ' + 'Permanent Redirect');
                               }
                            if (response.statusCode == 400) {
                               msg.channel.send('ERROR: ' + 'Bad Request');
                               }
                            if (response.statusCode == 401) {
                               msg.channel.send('ERROR: ' + 'Unauth­orized');
                               }
                            if (response.statusCode == 402) {
                               msg.channel.send('ERROR: ' + 'Payment Required');
                               }
                            if (response.statusCode == 403) {
                               msg.channel.send('ERROR: ' + 'Forbidden');
                               }
                            if (response.statusCode == 404) {
                               msg.channel.send('ERROR: ' + 'Not Found');
                               }
                            if (response.statusCode == 405) {
                               msg.channel.send('ERROR: ' + 'Method Not Allowed');
                               }
                            if (response.statusCode == 406) {
                               msg.channel.send('ERROR: ' + 'Not Acceptable');
                               }
                            if (response.statusCode == 407) {
                               msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                               }
                            if (response.statusCode == 408) {
                               msg.channel.send('ERROR: ' + 'Request Timeout');
                               }
                            if (response.statusCode == 409) {
                               msg.channel.send('ERROR: ' + 'Conflict');
                               }
                            if (response.statusCode == 410) {
                               msg.channel.send('ERROR: ' + 'Gone');
                               }
                            if (response.statusCode == 411) {
                               msg.channel.send('ERROR: ' + 'Length Required');
                               }
                            if (response.statusCode == 412) {
                               msg.channel.send('ERROR: ' + 'Precondition Failed');
                               }
                            if (response.statusCode == 413) {
                               msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                               }
                            if (response.statusCode == 414) {
                               msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                               }
                            if (response.statusCode == 415) {
                               msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                               }
                            if (response.statusCode == 416) {
                               msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                               }
                            if (response.statusCode == 417) {
                               msg.channel.send('ERROR: ' + 'Expectation Failed');
                               }
                            if (response.statusCode == 418) {
                               msg.channel.send('ERROR: ' + 'I\'m a teapot');
                               }
                            if (response.statusCode == 422) {
                               msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                               }
                            if (response.statusCode == 423) {
                               msg.channel.send('ERROR: ' + 'Locked');
                               }
                            if (response.statusCode == 424) {
                               msg.channel.send('ERROR: ' + 'Failed Dependency');
                               }
                            if (response.statusCode == 425) {
                               msg.channel.send('ERROR: ' + 'Unordered Collection');
                               }
                            if (response.statusCode == 426) {
                               msg.channel.send('ERROR: ' + 'Upgrade Required');
                               }
                            if (response.statusCode == 428) {
                               msg.channel.send('ERROR: ' + 'Precondition Required ');
                               }
                            if (response.statusCode == 429) {
                               msg.channel.send('ERROR: ' + 'Too Many Requests ');
                               }
                            if (response.statusCode == 431) {
                               msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                               }
                            if (response.statusCode == 444) {
                               msg.channel.send('ERROR: ' + 'No Response ');
                               }
                            if (response.statusCode == 449) {
                               msg.channel.send('ERROR: ' + 'Retry With ');
                               }
                            if (response.statusCode == 450) {
                               msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                               }
                            if (response.statusCode == 451) {
                               msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                               }
                            if (response.statusCode == 499) {
                               msg.channel.send('ERROR: ' + 'Client Closed Request');
                               }
                            if (response.statusCode == 500) {
                               msg.channel.send('ERROR: ' + 'Internal Server Error');
                               }
                            if (response.statusCode == 501) {
                               msg.channel.send('ERROR: ' + 'Not Implemented');
                               }
                            if (response.statusCode == 502) {
                               msg.channel.send('ERROR: ' + 'Bad Gateway');
                               }
                            if (response.statusCode == 503) {
                               msg.channel.send('ERROR: ' + 'Service Unavailable');
                               }
                            if (response.statusCode == 504) {
                               msg.channel.send('ERROR: ' + 'Gateway Timeout');
                               }
                            if (response.statusCode == 505) {
                               msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                               }
                            if (response.statusCode == 506) {
                               msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                               }
                            if (response.statusCode == 507) {
                               msg.channel.send('ERROR: ' + 'Insufficient Storage');
                               }
                            if (response.statusCode == 508) {
                               msg.channel.send('ERROR: ' + 'Loop Detected');
                               }
                            if (response.statusCode == 509) {
                               msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                               }
                            if (response.statusCode == 510) {
                               msg.channel.send('ERROR: ' + 'Not Extended');
                               }
                            if (response.statusCode == 511) {
                               msg.channel.send('ERROR: ' + 'Network Authentication Required');
                               }
                            if (response.statusCode == 598) {
                               msg.channel.send('ERROR: ' + 'Network read timeout error');
                               }
                            if (response.statusCode == 599) {
                               msg.channel.send('ERROR: ' + 'Network connect timeout error');
                               }
                          } else {
                            var previousTime = Number(response.body.time);
                            var currentBlockTime = currentTime - previousTime;
                            var timestamp = moment()
                              .tz('America/Los_Angeles')
                              .format('MM-DD-YYYY hh:mm a');
                            var description =
                              'Difficulty: ' +
                              numberWithCommas(difficulty.toFixed(0)) +
                              '\n' +
                              'Block: ' +
                              currentHeight +
                              '\n' +
                              'Block Solved in: ' +
                              currentBlockTime +
                              ' seconds ' +
                              '\n' +
                              'Block Solved by: \n' +
                              currentBlockWinner +
                              '\n' +
                              'Block Reward: ' +
                              numberWithCommas(currentReward) +
                              ' ' +
                              coinSymbol +
                              '\n' +
                              'Algo Hash: ' +
                              currentBlockAlgo +
                              '\n' +
                              'Algo Order: \n' +
                              currentAlgoOrder +
                              '\n\n' +
                              'Sources: ' +
                              explorerApiUrl;
                            const embed = {
                              description: description,
                              color: 7976557,
                              footer: {
                                text: 'Last Updated | ' + timestamp + ' PST'
                              },
                              author: {
                                name:
                                  coinName +
                                  '(' +
                                  coinSymbol +
                                  ') Network Stats',
                                icon_url: 'https://i.imgur.com/yWf5USu.png'
                              }
                            };
                            msg.channel.send({ embed });
                            return;
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
    function getBlockbyNumber(block) {
      needle.get(explorerApiUrl + 'api/status', function(error, response) {
        if (response.statusCode !== 200) {
          if (response.statusCode == 122) {
              msg.channel.send('ERROR: ' + 'Request-URI too long');
             }
          if (response.statusCode == 300) {
             msg.channel.send('ERROR: ' + 'Multiple Choices');
             }
          if (response.statusCode == 301) {
             msg.channel.send('ERROR: ' + 'Moved Permanently');
             }
          if (response.statusCode == 303) {
             msg.channel.send('ERROR: ' + 'See Other');
             }
          if (response.statusCode == 304) {
             msg.channel.send('ERROR: ' + 'Not Modified');
             }
          if (response.statusCode == 305) {
             msg.channel.send('ERROR: ' + 'Use Proxy');
             }
          if (response.statusCode == 306) {
             msg.channel.send('ERROR: ' + 'Switch Proxy');
             }
          if (response.statusCode == 307) {
             msg.channel.send('ERROR: ' + 'Temporary Redirect');
             }
          if (response.statusCode == 308) {
             msg.channel.send('ERROR: ' + 'Permanent Redirect');
             }
          if (response.statusCode == 400) {
             msg.channel.send('ERROR: ' + 'Bad Request');
             }
          if (response.statusCode == 401) {
             msg.channel.send('ERROR: ' + 'Unauth­orized');
             }
          if (response.statusCode == 402) {
             msg.channel.send('ERROR: ' + 'Payment Required');
             }
          if (response.statusCode == 403) {
             msg.channel.send('ERROR: ' + 'Forbidden');
             }
          if (response.statusCode == 404) {
             msg.channel.send('ERROR: ' + 'Not Found');
             }
          if (response.statusCode == 405) {
             msg.channel.send('ERROR: ' + 'Method Not Allowed');
             }
          if (response.statusCode == 406) {
             msg.channel.send('ERROR: ' + 'Not Acceptable');
             }
          if (response.statusCode == 407) {
             msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
             }
          if (response.statusCode == 408) {
             msg.channel.send('ERROR: ' + 'Request Timeout');
             }
          if (response.statusCode == 409) {
             msg.channel.send('ERROR: ' + 'Conflict');
             }
          if (response.statusCode == 410) {
             msg.channel.send('ERROR: ' + 'Gone');
             }
          if (response.statusCode == 411) {
             msg.channel.send('ERROR: ' + 'Length Required');
             }
          if (response.statusCode == 412) {
             msg.channel.send('ERROR: ' + 'Precondition Failed');
             }
          if (response.statusCode == 413) {
             msg.channel.send('ERROR: ' + 'Request Entity Too Large');
             }
          if (response.statusCode == 414) {
             msg.channel.send('ERROR: ' + 'Request-URI Too Long');
             }
          if (response.statusCode == 415) {
             msg.channel.send('ERROR: ' + 'Unsupported Media Type');
             }
          if (response.statusCode == 416) {
             msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
             }
          if (response.statusCode == 417) {
             msg.channel.send('ERROR: ' + 'Expectation Failed');
             }
          if (response.statusCode == 418) {
             msg.channel.send('ERROR: ' + 'I\'m a teapot');
             }
          if (response.statusCode == 422) {
             msg.channel.send('ERROR: ' + 'Unprocessable Entity');
             }
          if (response.statusCode == 423) {
             msg.channel.send('ERROR: ' + 'Locked');
             }
          if (response.statusCode == 424) {
             msg.channel.send('ERROR: ' + 'Failed Dependency');
             }
          if (response.statusCode == 425) {
             msg.channel.send('ERROR: ' + 'Unordered Collection');
             }
          if (response.statusCode == 426) {
             msg.channel.send('ERROR: ' + 'Upgrade Required');
             }
          if (response.statusCode == 428) {
             msg.channel.send('ERROR: ' + 'Precondition Required ');
             }
          if (response.statusCode == 429) {
             msg.channel.send('ERROR: ' + 'Too Many Requests ');
             }
          if (response.statusCode == 431) {
             msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
             }
          if (response.statusCode == 444) {
             msg.channel.send('ERROR: ' + 'No Response ');
             }
          if (response.statusCode == 449) {
             msg.channel.send('ERROR: ' + 'Retry With ');
             }
          if (response.statusCode == 450) {
             msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
             }
          if (response.statusCode == 451) {
             msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
             }
          if (response.statusCode == 499) {
             msg.channel.send('ERROR: ' + 'Client Closed Request');
             }
          if (response.statusCode == 500) {
             msg.channel.send('ERROR: ' + 'Internal Server Error');
             }
          if (response.statusCode == 501) {
             msg.channel.send('ERROR: ' + 'Not Implemented');
             }
          if (response.statusCode == 502) {
             msg.channel.send('ERROR: ' + 'Bad Gateway');
             }
          if (response.statusCode == 503) {
             msg.channel.send('ERROR: ' + 'Service Unavailable');
             }
          if (response.statusCode == 504) {
             msg.channel.send('ERROR: ' + 'Gateway Timeout');
             }
          if (response.statusCode == 505) {
             msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
             }
          if (response.statusCode == 506) {
             msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
             }
          if (response.statusCode == 507) {
             msg.channel.send('ERROR: ' + 'Insufficient Storage');
             }
          if (response.statusCode == 508) {
             msg.channel.send('ERROR: ' + 'Loop Detected');
             }
          if (response.statusCode == 509) {
             msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
             }
          if (response.statusCode == 510) {
             msg.channel.send('ERROR: ' + 'Not Extended');
             }
          if (response.statusCode == 511) {
             msg.channel.send('ERROR: ' + 'Network Authentication Required');
             }
          if (response.statusCode == 598) {
             msg.channel.send('ERROR: ' + 'Network read timeout error');
             }
          if (response.statusCode == 599) {
             msg.channel.send('ERROR: ' + 'Network connect timeout error');
             }
        } else {
          if (!block) {
            var currentHeight = response.body.info.blocks;
            var previousHeight = Number(response.body.info.blocks) - 1;
          } else {
            var currentHeight = block;
            var previousHeight = block - 1;
          }
          needle.get(
            explorerApiUrl + 'api/block-index/' + currentHeight,
            function(error, response) {
              if (response.statusCode !== 200) {
                if (response.statusCode == 122) {
                    msg.channel.send('ERROR: ' + 'Request-URI too long');
                   }
                if (response.statusCode == 300) {
                   msg.channel.send('ERROR: ' + 'Multiple Choices');
                   }
                if (response.statusCode == 301) {
                   msg.channel.send('ERROR: ' + 'Moved Permanently');
                   }
                if (response.statusCode == 303) {
                   msg.channel.send('ERROR: ' + 'See Other');
                   }
                if (response.statusCode == 304) {
                   msg.channel.send('ERROR: ' + 'Not Modified');
                   }
                if (response.statusCode == 305) {
                   msg.channel.send('ERROR: ' + 'Use Proxy');
                   }
                if (response.statusCode == 306) {
                   msg.channel.send('ERROR: ' + 'Switch Proxy');
                   }
                if (response.statusCode == 307) {
                   msg.channel.send('ERROR: ' + 'Temporary Redirect');
                   }
                if (response.statusCode == 308) {
                   msg.channel.send('ERROR: ' + 'Permanent Redirect');
                   }
                if (response.statusCode == 400) {
                   msg.channel.send('ERROR: ' + 'Bad Request');
                   }
                if (response.statusCode == 401) {
                   msg.channel.send('ERROR: ' + 'Unauth­orized');
                   }
                if (response.statusCode == 402) {
                   msg.channel.send('ERROR: ' + 'Payment Required');
                   }
                if (response.statusCode == 403) {
                   msg.channel.send('ERROR: ' + 'Forbidden');
                   }
                if (response.statusCode == 404) {
                   msg.channel.send('ERROR: ' + 'Not Found');
                   }
                if (response.statusCode == 405) {
                   msg.channel.send('ERROR: ' + 'Method Not Allowed');
                   }
                if (response.statusCode == 406) {
                   msg.channel.send('ERROR: ' + 'Not Acceptable');
                   }
                if (response.statusCode == 407) {
                   msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                   }
                if (response.statusCode == 408) {
                   msg.channel.send('ERROR: ' + 'Request Timeout');
                   }
                if (response.statusCode == 409) {
                   msg.channel.send('ERROR: ' + 'Conflict');
                   }
                if (response.statusCode == 410) {
                   msg.channel.send('ERROR: ' + 'Gone');
                   }
                if (response.statusCode == 411) {
                   msg.channel.send('ERROR: ' + 'Length Required');
                   }
                if (response.statusCode == 412) {
                   msg.channel.send('ERROR: ' + 'Precondition Failed');
                   }
                if (response.statusCode == 413) {
                   msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                   }
                if (response.statusCode == 414) {
                   msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                   }
                if (response.statusCode == 415) {
                   msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                   }
                if (response.statusCode == 416) {
                   msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                   }
                if (response.statusCode == 417) {
                   msg.channel.send('ERROR: ' + 'Expectation Failed');
                   }
                if (response.statusCode == 418) {
                   msg.channel.send('ERROR: ' + 'I\'m a teapot');
                   }
                if (response.statusCode == 422) {
                   msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                   }
                if (response.statusCode == 423) {
                   msg.channel.send('ERROR: ' + 'Locked');
                   }
                if (response.statusCode == 424) {
                   msg.channel.send('ERROR: ' + 'Failed Dependency');
                   }
                if (response.statusCode == 425) {
                   msg.channel.send('ERROR: ' + 'Unordered Collection');
                   }
                if (response.statusCode == 426) {
                   msg.channel.send('ERROR: ' + 'Upgrade Required');
                   }
                if (response.statusCode == 428) {
                   msg.channel.send('ERROR: ' + 'Precondition Required ');
                   }
                if (response.statusCode == 429) {
                   msg.channel.send('ERROR: ' + 'Too Many Requests ');
                   }
                if (response.statusCode == 431) {
                   msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                   }
                if (response.statusCode == 444) {
                   msg.channel.send('ERROR: ' + 'No Response ');
                   }
                if (response.statusCode == 449) {
                   msg.channel.send('ERROR: ' + 'Retry With ');
                   }
                if (response.statusCode == 450) {
                   msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                   }
                if (response.statusCode == 451) {
                   msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                   }
                if (response.statusCode == 499) {
                   msg.channel.send('ERROR: ' + 'Client Closed Request');
                   }
                if (response.statusCode == 500) {
                   msg.channel.send('ERROR: ' + 'Internal Server Error');
                   }
                if (response.statusCode == 501) {
                   msg.channel.send('ERROR: ' + 'Not Implemented');
                   }
                if (response.statusCode == 502) {
                   msg.channel.send('ERROR: ' + 'Bad Gateway');
                   }
                if (response.statusCode == 503) {
                   msg.channel.send('ERROR: ' + 'Service Unavailable');
                   }
                if (response.statusCode == 504) {
                   msg.channel.send('ERROR: ' + 'Gateway Timeout');
                   }
                if (response.statusCode == 505) {
                   msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                   }
                if (response.statusCode == 506) {
                   msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                   }
                if (response.statusCode == 507) {
                   msg.channel.send('ERROR: ' + 'Insufficient Storage');
                   }
                if (response.statusCode == 508) {
                   msg.channel.send('ERROR: ' + 'Loop Detected');
                   }
                if (response.statusCode == 509) {
                   msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                   }
                if (response.statusCode == 510) {
                   msg.channel.send('ERROR: ' + 'Not Extended');
                   }
                if (response.statusCode == 511) {
                   msg.channel.send('ERROR: ' + 'Network Authentication Required');
                   }
                if (response.statusCode == 598) {
                   msg.channel.send('ERROR: ' + 'Network read timeout error');
                   }
                if (response.statusCode == 599) {
                   msg.channel.send('ERROR: ' + 'Network connect timeout error');
                   }
              } else {
                var currentBlockHash = response.body.blockHash;
                needle.get(
                  explorerApiUrl + 'api/block-index/' + previousHeight,
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      if (response.statusCode == 122) {
                          msg.channel.send('ERROR: ' + 'Request-URI too long');
                         }
                      if (response.statusCode == 300) {
                         msg.channel.send('ERROR: ' + 'Multiple Choices');
                         }
                      if (response.statusCode == 301) {
                         msg.channel.send('ERROR: ' + 'Moved Permanently');
                         }
                      if (response.statusCode == 303) {
                         msg.channel.send('ERROR: ' + 'See Other');
                         }
                      if (response.statusCode == 304) {
                         msg.channel.send('ERROR: ' + 'Not Modified');
                         }
                      if (response.statusCode == 305) {
                         msg.channel.send('ERROR: ' + 'Use Proxy');
                         }
                      if (response.statusCode == 306) {
                         msg.channel.send('ERROR: ' + 'Switch Proxy');
                         }
                      if (response.statusCode == 307) {
                         msg.channel.send('ERROR: ' + 'Temporary Redirect');
                         }
                      if (response.statusCode == 308) {
                         msg.channel.send('ERROR: ' + 'Permanent Redirect');
                         }
                      if (response.statusCode == 400) {
                         msg.channel.send('ERROR: ' + 'Bad Request');
                         }
                      if (response.statusCode == 401) {
                         msg.channel.send('ERROR: ' + 'Unauth­orized');
                         }
                      if (response.statusCode == 402) {
                         msg.channel.send('ERROR: ' + 'Payment Required');
                         }
                      if (response.statusCode == 403) {
                         msg.channel.send('ERROR: ' + 'Forbidden');
                         }
                      if (response.statusCode == 404) {
                         msg.channel.send('ERROR: ' + 'Not Found');
                         }
                      if (response.statusCode == 405) {
                         msg.channel.send('ERROR: ' + 'Method Not Allowed');
                         }
                      if (response.statusCode == 406) {
                         msg.channel.send('ERROR: ' + 'Not Acceptable');
                         }
                      if (response.statusCode == 407) {
                         msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                         }
                      if (response.statusCode == 408) {
                         msg.channel.send('ERROR: ' + 'Request Timeout');
                         }
                      if (response.statusCode == 409) {
                         msg.channel.send('ERROR: ' + 'Conflict');
                         }
                      if (response.statusCode == 410) {
                         msg.channel.send('ERROR: ' + 'Gone');
                         }
                      if (response.statusCode == 411) {
                         msg.channel.send('ERROR: ' + 'Length Required');
                         }
                      if (response.statusCode == 412) {
                         msg.channel.send('ERROR: ' + 'Precondition Failed');
                         }
                      if (response.statusCode == 413) {
                         msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                         }
                      if (response.statusCode == 414) {
                         msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                         }
                      if (response.statusCode == 415) {
                         msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                         }
                      if (response.statusCode == 416) {
                         msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                         }
                      if (response.statusCode == 417) {
                         msg.channel.send('ERROR: ' + 'Expectation Failed');
                         }
                      if (response.statusCode == 418) {
                         msg.channel.send('ERROR: ' + 'I\'m a teapot');
                         }
                      if (response.statusCode == 422) {
                         msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                         }
                      if (response.statusCode == 423) {
                         msg.channel.send('ERROR: ' + 'Locked');
                         }
                      if (response.statusCode == 424) {
                         msg.channel.send('ERROR: ' + 'Failed Dependency');
                         }
                      if (response.statusCode == 425) {
                         msg.channel.send('ERROR: ' + 'Unordered Collection');
                         }
                      if (response.statusCode == 426) {
                         msg.channel.send('ERROR: ' + 'Upgrade Required');
                         }
                      if (response.statusCode == 428) {
                         msg.channel.send('ERROR: ' + 'Precondition Required ');
                         }
                      if (response.statusCode == 429) {
                         msg.channel.send('ERROR: ' + 'Too Many Requests ');
                         }
                      if (response.statusCode == 431) {
                         msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                         }
                      if (response.statusCode == 444) {
                         msg.channel.send('ERROR: ' + 'No Response ');
                         }
                      if (response.statusCode == 449) {
                         msg.channel.send('ERROR: ' + 'Retry With ');
                         }
                      if (response.statusCode == 450) {
                         msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                         }
                      if (response.statusCode == 451) {
                         msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                         }
                      if (response.statusCode == 499) {
                         msg.channel.send('ERROR: ' + 'Client Closed Request');
                         }
                      if (response.statusCode == 500) {
                         msg.channel.send('ERROR: ' + 'Internal Server Error');
                         }
                      if (response.statusCode == 501) {
                         msg.channel.send('ERROR: ' + 'Not Implemented');
                         }
                      if (response.statusCode == 502) {
                         msg.channel.send('ERROR: ' + 'Bad Gateway');
                         }
                      if (response.statusCode == 503) {
                         msg.channel.send('ERROR: ' + 'Service Unavailable');
                         }
                      if (response.statusCode == 504) {
                         msg.channel.send('ERROR: ' + 'Gateway Timeout');
                         }
                      if (response.statusCode == 505) {
                         msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                         }
                      if (response.statusCode == 506) {
                         msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                         }
                      if (response.statusCode == 507) {
                         msg.channel.send('ERROR: ' + 'Insufficient Storage');
                         }
                      if (response.statusCode == 508) {
                         msg.channel.send('ERROR: ' + 'Loop Detected');
                         }
                      if (response.statusCode == 509) {
                         msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                         }
                      if (response.statusCode == 510) {
                         msg.channel.send('ERROR: ' + 'Not Extended');
                         }
                      if (response.statusCode == 511) {
                         msg.channel.send('ERROR: ' + 'Network Authentication Required');
                         }
                      if (response.statusCode == 598) {
                         msg.channel.send('ERROR: ' + 'Network read timeout error');
                         }
                      if (response.statusCode == 599) {
                         msg.channel.send('ERROR: ' + 'Network connect timeout error');
                         }
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/txs?block=' + currentHeight,
                        function(error, response) {
                          if (response.statusCode !== 200) {
                            if (response.statusCode == 122) {
                                msg.channel.send('ERROR: ' + 'Request-URI too long');
                               }
                            if (response.statusCode == 300) {
                               msg.channel.send('ERROR: ' + 'Multiple Choices');
                               }
                            if (response.statusCode == 301) {
                               msg.channel.send('ERROR: ' + 'Moved Permanently');
                               }
                            if (response.statusCode == 303) {
                               msg.channel.send('ERROR: ' + 'See Other');
                               }
                            if (response.statusCode == 304) {
                               msg.channel.send('ERROR: ' + 'Not Modified');
                               }
                            if (response.statusCode == 305) {
                               msg.channel.send('ERROR: ' + 'Use Proxy');
                               }
                            if (response.statusCode == 306) {
                               msg.channel.send('ERROR: ' + 'Switch Proxy');
                               }
                            if (response.statusCode == 307) {
                               msg.channel.send('ERROR: ' + 'Temporary Redirect');
                               }
                            if (response.statusCode == 308) {
                               msg.channel.send('ERROR: ' + 'Permanent Redirect');
                               }
                            if (response.statusCode == 400) {
                               msg.channel.send('ERROR: ' + 'Bad Request');
                               }
                            if (response.statusCode == 401) {
                               msg.channel.send('ERROR: ' + 'Unauth­orized');
                               }
                            if (response.statusCode == 402) {
                               msg.channel.send('ERROR: ' + 'Payment Required');
                               }
                            if (response.statusCode == 403) {
                               msg.channel.send('ERROR: ' + 'Forbidden');
                               }
                            if (response.statusCode == 404) {
                               msg.channel.send('ERROR: ' + 'Not Found');
                               }
                            if (response.statusCode == 405) {
                               msg.channel.send('ERROR: ' + 'Method Not Allowed');
                               }
                            if (response.statusCode == 406) {
                               msg.channel.send('ERROR: ' + 'Not Acceptable');
                               }
                            if (response.statusCode == 407) {
                               msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                               }
                            if (response.statusCode == 408) {
                               msg.channel.send('ERROR: ' + 'Request Timeout');
                               }
                            if (response.statusCode == 409) {
                               msg.channel.send('ERROR: ' + 'Conflict');
                               }
                            if (response.statusCode == 410) {
                               msg.channel.send('ERROR: ' + 'Gone');
                               }
                            if (response.statusCode == 411) {
                               msg.channel.send('ERROR: ' + 'Length Required');
                               }
                            if (response.statusCode == 412) {
                               msg.channel.send('ERROR: ' + 'Precondition Failed');
                               }
                            if (response.statusCode == 413) {
                               msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                               }
                            if (response.statusCode == 414) {
                               msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                               }
                            if (response.statusCode == 415) {
                               msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                               }
                            if (response.statusCode == 416) {
                               msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                               }
                            if (response.statusCode == 417) {
                               msg.channel.send('ERROR: ' + 'Expectation Failed');
                               }
                            if (response.statusCode == 418) {
                               msg.channel.send('ERROR: ' + 'I\'m a teapot');
                               }
                            if (response.statusCode == 422) {
                               msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                               }
                            if (response.statusCode == 423) {
                               msg.channel.send('ERROR: ' + 'Locked');
                               }
                            if (response.statusCode == 424) {
                               msg.channel.send('ERROR: ' + 'Failed Dependency');
                               }
                            if (response.statusCode == 425) {
                               msg.channel.send('ERROR: ' + 'Unordered Collection');
                               }
                            if (response.statusCode == 426) {
                               msg.channel.send('ERROR: ' + 'Upgrade Required');
                               }
                            if (response.statusCode == 428) {
                               msg.channel.send('ERROR: ' + 'Precondition Required ');
                               }
                            if (response.statusCode == 429) {
                               msg.channel.send('ERROR: ' + 'Too Many Requests ');
                               }
                            if (response.statusCode == 431) {
                               msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                               }
                            if (response.statusCode == 444) {
                               msg.channel.send('ERROR: ' + 'No Response ');
                               }
                            if (response.statusCode == 449) {
                               msg.channel.send('ERROR: ' + 'Retry With ');
                               }
                            if (response.statusCode == 450) {
                               msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                               }
                            if (response.statusCode == 451) {
                               msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                               }
                            if (response.statusCode == 499) {
                               msg.channel.send('ERROR: ' + 'Client Closed Request');
                               }
                            if (response.statusCode == 500) {
                               msg.channel.send('ERROR: ' + 'Internal Server Error');
                               }
                            if (response.statusCode == 501) {
                               msg.channel.send('ERROR: ' + 'Not Implemented');
                               }
                            if (response.statusCode == 502) {
                               msg.channel.send('ERROR: ' + 'Bad Gateway');
                               }
                            if (response.statusCode == 503) {
                               msg.channel.send('ERROR: ' + 'Service Unavailable');
                               }
                            if (response.statusCode == 504) {
                               msg.channel.send('ERROR: ' + 'Gateway Timeout');
                               }
                            if (response.statusCode == 505) {
                               msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                               }
                            if (response.statusCode == 506) {
                               msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                               }
                            if (response.statusCode == 507) {
                               msg.channel.send('ERROR: ' + 'Insufficient Storage');
                               }
                            if (response.statusCode == 508) {
                               msg.channel.send('ERROR: ' + 'Loop Detected');
                               }
                            if (response.statusCode == 509) {
                               msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                               }
                            if (response.statusCode == 510) {
                               msg.channel.send('ERROR: ' + 'Not Extended');
                               }
                            if (response.statusCode == 511) {
                               msg.channel.send('ERROR: ' + 'Network Authentication Required');
                               }
                            if (response.statusCode == 598) {
                               msg.channel.send('ERROR: ' + 'Network read timeout error');
                               }
                            if (response.statusCode == 599) {
                               msg.channel.send('ERROR: ' + 'Network connect timeout error');
                               }
                          } else {
                            var currentWinnerArray = response.body;
                            var currentWinner = [];
                            var currentWinnerAddys = [];
                            for (
                              var i = 0;
                              i < currentWinnerArray.txs.length;
                              i++
                            ) {
                              var position = i++;
                              if (
                                currentWinnerArray.txs[position].hasOwnProperty(
                                  'isCoinBase'
                                )
                              ) {
                                currentWinner.push(
                                  currentWinnerArray.txs[position]
                                );
                              }
                            }
                            for (
                              var l = 0;
                              l < currentWinner[0].vout.length;
                              l++
                            ) {
                              var addys =
                                currentWinner[0].vout[l].scriptPubKey.addresses;
                              if (addys) {
                                currentWinnerAddys.push(addys);
                              }
                            }
                            var currentBlockWinner = currentWinnerAddys.join(
                              ' \n'
                            );
                            if (
                              currentBlockWinner.includes(
                                'RFgNoNzd8KEHbeFxnvJamy4yCV8ZDvR4jD'
                              )
                            ) {
                              currentBlockWinner =
                                '[suprnova](https://rvn.suprnova.cc/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RHQRGxCsVLwW6GYMkNHDRnzWaMHinXsGDt'
                              )
                            ) {
                              currentBlockWinner = '[Yiimp](http://yiimp.eu/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RNJMLCLiss7hf23rZSq9BzhoQ94H5EDQTy'
                              )
                            ) {
                              currentBlockWinner =
                                '[Raven Miner](http://www.ravenminer.com/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RVG96MbaKEDFzzj9NzbAuxkDt86KAm2Qj5'
                              )
                            ) {
                              currentBlockWinner =
                                '[f2pool](https://labs.f2pool.com/labs)';
                            } else if (
                              currentBlockWinner.includes(
                                'RTUYcbkJo9zuW74brFc3bwxXyKpCiogxT7'
                              )
                            ) {
                              currentBlockWinner =
                                '[Pickaxe Pro](https://pickaxe.pro/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RN6vJ31K3Ycj7S4obdtYckXPPSAy7z5g2p'
                              )
                            ) {
                              currentBlockWinner =
                                '[Mining Panda](https://miningpanda.site)';
                            } else if (
                              currentBlockWinner.includes(
                                'RG2tNoZpm6VKgpnUDqHr8L9gDL7kh43JnW'
                              )
                            ) {
                              currentBlockWinner =
                                '[Crypto Pool Party](https://cryptopool.party/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RGdHyWTLp9rR5mfUX2hGdAjCuYaDqa3hDo'
                              )
                            ) {
                              currentBlockWinner =
                                '[KRAWWW Miner](http://krawww-miner.eu/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RHLJmCnpZ9JKBxYj1RWc7teD8gHSxkTozs'
                              )
                            ) {
                              currentBlockWinner =
                                '[minepool](https://www.minepool.com/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RF7FaQRQq9DdVcaZZikdahdacTiJh17NDU'
                              )
                            ) {
                              currentBlockWinner =
                                '[Virtopia](https://mineit.virtopia.ca/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RGBjnf4gpXsJLvcGqvU1yc6ZwKQMEPqaTf'
                              )
                            ) {
                              currentBlockWinner =
                                '[OMEGA Pool](https://www.omegapool.cc/?page=dashboard&coin=raven)';
                            } else if (
                              currentBlockWinner.includes(
                                'RAFmhKe26pSinN9eERhqWk1nUMnx33LDi2'
                              )
                            ) {
                              currentBlockWinner =
                                '[Evocatioin Network](https://evocation.network/stats.html)';
                            } else if (
                              currentBlockWinner.includes(
                                'RK4GiCpC6nvX2sswH3pre1nwbng8S8ViCn'
                              )
                            ) {
                              currentBlockWinner =
                                '[Coin Blockers](https://rvn.coinblockers.com/)';
                            } else if (
                              currentBlockWinner.includes(
                                'RQZS8LBvv2VWuAEWF5BXoRikoG6MRp5asH'
                              )
                            ) {
                              currentBlockWinner =
                                '[BSOD](https://bsod.pw/site/mining)';
                            } else if (
                              currentBlockWinner.includes(
                                'R9JkHdoFVMmuhDnQX3W8L6KDKfzueWNQuj'
                              )
                            ) {
                              currentBlockWinner =
                                '[Hash 4 Life](https://hash4.life/)';
                            } else if (
                              currentBlockWinner.includes(
                                'REESXgjhAuarm3Vs9rxPZpEmuAoSmbHBXV'
                              )
                            ) {
                              currentBlockWinner =
                                '[Ominous Network](http://pool.ominousnetwork.com/)';
                            }
                            needle.get(
                              explorerApiUrl + 'api/block/' + currentBlockHash,
                              function(error, response) {
                                if (response.statusCode !== 200) {
                                  if (response.statusCode == 122) {
                                      msg.channel.send('ERROR: ' + 'Request-URI too long');
                                     }
                                  if (response.statusCode == 300) {
                                     msg.channel.send('ERROR: ' + 'Multiple Choices');
                                     }
                                  if (response.statusCode == 301) {
                                     msg.channel.send('ERROR: ' + 'Moved Permanently');
                                     }
                                  if (response.statusCode == 303) {
                                     msg.channel.send('ERROR: ' + 'See Other');
                                     }
                                  if (response.statusCode == 304) {
                                     msg.channel.send('ERROR: ' + 'Not Modified');
                                     }
                                  if (response.statusCode == 305) {
                                     msg.channel.send('ERROR: ' + 'Use Proxy');
                                     }
                                  if (response.statusCode == 306) {
                                     msg.channel.send('ERROR: ' + 'Switch Proxy');
                                     }
                                  if (response.statusCode == 307) {
                                     msg.channel.send('ERROR: ' + 'Temporary Redirect');
                                     }
                                  if (response.statusCode == 308) {
                                     msg.channel.send('ERROR: ' + 'Permanent Redirect');
                                     }
                                  if (response.statusCode == 400) {
                                     msg.channel.send('ERROR: ' + 'Bad Request');
                                     }
                                  if (response.statusCode == 401) {
                                     msg.channel.send('ERROR: ' + 'Unauth­orized');
                                     }
                                  if (response.statusCode == 402) {
                                     msg.channel.send('ERROR: ' + 'Payment Required');
                                     }
                                  if (response.statusCode == 403) {
                                     msg.channel.send('ERROR: ' + 'Forbidden');
                                     }
                                  if (response.statusCode == 404) {
                                     msg.channel.send('ERROR: ' + 'Not Found');
                                     }
                                  if (response.statusCode == 405) {
                                     msg.channel.send('ERROR: ' + 'Method Not Allowed');
                                     }
                                  if (response.statusCode == 406) {
                                     msg.channel.send('ERROR: ' + 'Not Acceptable');
                                     }
                                  if (response.statusCode == 407) {
                                     msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                                     }
                                  if (response.statusCode == 408) {
                                     msg.channel.send('ERROR: ' + 'Request Timeout');
                                     }
                                  if (response.statusCode == 409) {
                                     msg.channel.send('ERROR: ' + 'Conflict');
                                     }
                                  if (response.statusCode == 410) {
                                     msg.channel.send('ERROR: ' + 'Gone');
                                     }
                                  if (response.statusCode == 411) {
                                     msg.channel.send('ERROR: ' + 'Length Required');
                                     }
                                  if (response.statusCode == 412) {
                                     msg.channel.send('ERROR: ' + 'Precondition Failed');
                                     }
                                  if (response.statusCode == 413) {
                                     msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                                     }
                                  if (response.statusCode == 414) {
                                     msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                                     }
                                  if (response.statusCode == 415) {
                                     msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                                     }
                                  if (response.statusCode == 416) {
                                     msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                                     }
                                  if (response.statusCode == 417) {
                                     msg.channel.send('ERROR: ' + 'Expectation Failed');
                                     }
                                  if (response.statusCode == 418) {
                                     msg.channel.send('ERROR: ' + 'I\'m a teapot');
                                     }
                                  if (response.statusCode == 422) {
                                     msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                                     }
                                  if (response.statusCode == 423) {
                                     msg.channel.send('ERROR: ' + 'Locked');
                                     }
                                  if (response.statusCode == 424) {
                                     msg.channel.send('ERROR: ' + 'Failed Dependency');
                                     }
                                  if (response.statusCode == 425) {
                                     msg.channel.send('ERROR: ' + 'Unordered Collection');
                                     }
                                  if (response.statusCode == 426) {
                                     msg.channel.send('ERROR: ' + 'Upgrade Required');
                                     }
                                  if (response.statusCode == 428) {
                                     msg.channel.send('ERROR: ' + 'Precondition Required ');
                                     }
                                  if (response.statusCode == 429) {
                                     msg.channel.send('ERROR: ' + 'Too Many Requests ');
                                     }
                                  if (response.statusCode == 431) {
                                     msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                                     }
                                  if (response.statusCode == 444) {
                                     msg.channel.send('ERROR: ' + 'No Response ');
                                     }
                                  if (response.statusCode == 449) {
                                     msg.channel.send('ERROR: ' + 'Retry With ');
                                     }
                                  if (response.statusCode == 450) {
                                     msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                                     }
                                  if (response.statusCode == 451) {
                                     msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                                     }
                                  if (response.statusCode == 499) {
                                     msg.channel.send('ERROR: ' + 'Client Closed Request');
                                     }
                                  if (response.statusCode == 500) {
                                     msg.channel.send('ERROR: ' + 'Internal Server Error');
                                     }
                                  if (response.statusCode == 501) {
                                     msg.channel.send('ERROR: ' + 'Not Implemented');
                                     }
                                  if (response.statusCode == 502) {
                                     msg.channel.send('ERROR: ' + 'Bad Gateway');
                                     }
                                  if (response.statusCode == 503) {
                                     msg.channel.send('ERROR: ' + 'Service Unavailable');
                                     }
                                  if (response.statusCode == 504) {
                                     msg.channel.send('ERROR: ' + 'Gateway Timeout');
                                     }
                                  if (response.statusCode == 505) {
                                     msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                                     }
                                  if (response.statusCode == 506) {
                                     msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                                     }
                                  if (response.statusCode == 507) {
                                     msg.channel.send('ERROR: ' + 'Insufficient Storage');
                                     }
                                  if (response.statusCode == 508) {
                                     msg.channel.send('ERROR: ' + 'Loop Detected');
                                     }
                                  if (response.statusCode == 509) {
                                     msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                                     }
                                  if (response.statusCode == 510) {
                                     msg.channel.send('ERROR: ' + 'Not Extended');
                                     }
                                  if (response.statusCode == 511) {
                                     msg.channel.send('ERROR: ' + 'Network Authentication Required');
                                     }
                                  if (response.statusCode == 598) {
                                     msg.channel.send('ERROR: ' + 'Network read timeout error');
                                     }
                                  if (response.statusCode == 599) {
                                     msg.channel.send('ERROR: ' + 'Network connect timeout error');
                                     }
                                } else {
                                  var difficulty = response.body.difficulty;
                                  var currentTime = Number(response.body.time);
                                  var currentReward = Number(
                                    response.body.reward
                                  );
                                  var currentBlockAlgo = currentBlockHash.substr(
                                    currentBlockHash.length - 16
                                  );
                                  var currentAlgo = currentBlockAlgo.split('');
                                  var currentAlgoOrder =
                                    algolist[currentAlgo[0]] +
                                    '->' +
                                    algolist[currentAlgo[1]] +
                                    '->' +
                                    algolist[currentAlgo[2]] +
                                    '->' +
                                    algolist[currentAlgo[3]] +
                                    '->' +
                                    algolist[currentAlgo[4]] +
                                    '->' +
                                    algolist[currentAlgo[5]] +
                                    '->' +
                                    algolist[currentAlgo[6]] +
                                    '->' +
                                    algolist[currentAlgo[7]] +
                                    '->\n' +
                                    algolist[currentAlgo[8]] +
                                    '->' +
                                    algolist[currentAlgo[9]] +
                                    '->' +
                                    algolist[currentAlgo[10]] +
                                    '->' +
                                    algolist[currentAlgo[11]] +
                                    '->' +
                                    algolist[currentAlgo[12]] +
                                    '->' +
                                    algolist[currentAlgo[13]] +
                                    '->' +
                                    algolist[currentAlgo[14]] +
                                    '->' +
                                    algolist[currentAlgo[15]];
                                  needle.get(
                                    explorerApiUrl +
                                      'api/block/' +
                                      previousBlockHash,
                                    function(error, response) {
                                      if (
                                        response.statusCode !== 200
                                      ) {
                                        if (response.statusCode == 122) {
                                            msg.channel.send('ERROR: ' + 'Request-URI too long');
                                           }
                                        if (response.statusCode == 300) {
                                           msg.channel.send('ERROR: ' + 'Multiple Choices');
                                           }
                                        if (response.statusCode == 301) {
                                           msg.channel.send('ERROR: ' + 'Moved Permanently');
                                           }
                                        if (response.statusCode == 303) {
                                           msg.channel.send('ERROR: ' + 'See Other');
                                           }
                                        if (response.statusCode == 304) {
                                           msg.channel.send('ERROR: ' + 'Not Modified');
                                           }
                                        if (response.statusCode == 305) {
                                           msg.channel.send('ERROR: ' + 'Use Proxy');
                                           }
                                        if (response.statusCode == 306) {
                                           msg.channel.send('ERROR: ' + 'Switch Proxy');
                                           }
                                        if (response.statusCode == 307) {
                                           msg.channel.send('ERROR: ' + 'Temporary Redirect');
                                           }
                                        if (response.statusCode == 308) {
                                           msg.channel.send('ERROR: ' + 'Permanent Redirect');
                                           }
                                        if (response.statusCode == 400) {
                                           msg.channel.send('ERROR: ' + 'Bad Request');
                                           }
                                        if (response.statusCode == 401) {
                                           msg.channel.send('ERROR: ' + 'Unauth­orized');
                                           }
                                        if (response.statusCode == 402) {
                                           msg.channel.send('ERROR: ' + 'Payment Required');
                                           }
                                        if (response.statusCode == 403) {
                                           msg.channel.send('ERROR: ' + 'Forbidden');
                                           }
                                        if (response.statusCode == 404) {
                                           msg.channel.send('ERROR: ' + 'Not Found');
                                           }
                                        if (response.statusCode == 405) {
                                           msg.channel.send('ERROR: ' + 'Method Not Allowed');
                                           }
                                        if (response.statusCode == 406) {
                                           msg.channel.send('ERROR: ' + 'Not Acceptable');
                                           }
                                        if (response.statusCode == 407) {
                                           msg.channel.send('ERROR: ' + 'Proxy Authen­tic­ation Required');
                                           }
                                        if (response.statusCode == 408) {
                                           msg.channel.send('ERROR: ' + 'Request Timeout');
                                           }
                                        if (response.statusCode == 409) {
                                           msg.channel.send('ERROR: ' + 'Conflict');
                                           }
                                        if (response.statusCode == 410) {
                                           msg.channel.send('ERROR: ' + 'Gone');
                                           }
                                        if (response.statusCode == 411) {
                                           msg.channel.send('ERROR: ' + 'Length Required');
                                           }
                                        if (response.statusCode == 412) {
                                           msg.channel.send('ERROR: ' + 'Precondition Failed');
                                           }
                                        if (response.statusCode == 413) {
                                           msg.channel.send('ERROR: ' + 'Request Entity Too Large');
                                           }
                                        if (response.statusCode == 414) {
                                           msg.channel.send('ERROR: ' + 'Request-URI Too Long');
                                           }
                                        if (response.statusCode == 415) {
                                           msg.channel.send('ERROR: ' + 'Unsupported Media Type');
                                           }
                                        if (response.statusCode == 416) {
                                           msg.channel.send('ERROR: ' + 'Requested Range Not Satisf­iable');
                                           }
                                        if (response.statusCode == 417) {
                                           msg.channel.send('ERROR: ' + 'Expectation Failed');
                                           }
                                        if (response.statusCode == 418) {
                                           msg.channel.send('ERROR: ' + 'I\'m a teapot');
                                           }
                                        if (response.statusCode == 422) {
                                           msg.channel.send('ERROR: ' + 'Unprocessable Entity');
                                           }
                                        if (response.statusCode == 423) {
                                           msg.channel.send('ERROR: ' + 'Locked');
                                           }
                                        if (response.statusCode == 424) {
                                           msg.channel.send('ERROR: ' + 'Failed Dependency');
                                           }
                                        if (response.statusCode == 425) {
                                           msg.channel.send('ERROR: ' + 'Unordered Collection');
                                           }
                                        if (response.statusCode == 426) {
                                           msg.channel.send('ERROR: ' + 'Upgrade Required');
                                           }
                                        if (response.statusCode == 428) {
                                           msg.channel.send('ERROR: ' + 'Precondition Required ');
                                           }
                                        if (response.statusCode == 429) {
                                           msg.channel.send('ERROR: ' + 'Too Many Requests ');
                                           }
                                        if (response.statusCode == 431) {
                                           msg.channel.send('ERROR: ' + 'Request Header Fields Too Large ');
                                           }
                                        if (response.statusCode == 444) {
                                           msg.channel.send('ERROR: ' + 'No Response ');
                                           }
                                        if (response.statusCode == 449) {
                                           msg.channel.send('ERROR: ' + 'Retry With ');
                                           }
                                        if (response.statusCode == 450) {
                                           msg.channel.send('ERROR: ' + 'Blocked By Windows Parental Controls ');
                                           }
                                        if (response.statusCode == 451) {
                                           msg.channel.send('ERROR: ' + 'Unavailable For Legal Reasons');
                                           }
                                        if (response.statusCode == 499) {
                                           msg.channel.send('ERROR: ' + 'Client Closed Request');
                                           }
                                        if (response.statusCode == 500) {
                                           msg.channel.send('ERROR: ' + 'Internal Server Error');
                                           }
                                        if (response.statusCode == 501) {
                                           msg.channel.send('ERROR: ' + 'Not Implemented');
                                           }
                                        if (response.statusCode == 502) {
                                           msg.channel.send('ERROR: ' + 'Bad Gateway');
                                           }
                                        if (response.statusCode == 503) {
                                           msg.channel.send('ERROR: ' + 'Service Unavailable');
                                           }
                                        if (response.statusCode == 504) {
                                           msg.channel.send('ERROR: ' + 'Gateway Timeout');
                                           }
                                        if (response.statusCode == 505) {
                                           msg.channel.send('ERROR: ' + 'HTTP Version Not Supported');
                                           }
                                        if (response.statusCode == 506) {
                                           msg.channel.send('ERROR: ' + 'Variant Also Negotiates');
                                           }
                                        if (response.statusCode == 507) {
                                           msg.channel.send('ERROR: ' + 'Insufficient Storage');
                                           }
                                        if (response.statusCode == 508) {
                                           msg.channel.send('ERROR: ' + 'Loop Detected');
                                           }
                                        if (response.statusCode == 509) {
                                           msg.channel.send('ERROR: ' + 'Bandwidth Limit Exceeded');
                                           }
                                        if (response.statusCode == 510) {
                                           msg.channel.send('ERROR: ' + 'Not Extended');
                                           }
                                        if (response.statusCode == 511) {
                                           msg.channel.send('ERROR: ' + 'Network Authentication Required');
                                           }
                                        if (response.statusCode == 598) {
                                           msg.channel.send('ERROR: ' + 'Network read timeout error');
                                           }
                                        if (response.statusCode == 599) {
                                           msg.channel.send('ERROR: ' + 'Network connect timeout error');
                                           }
                                      } else {
                                        var previousTime = Number(
                                          response.body.time
                                        );
                                        var currentBlockTime =
                                          currentTime - previousTime;
                                        var timestamp = moment()
                                          .tz('America/Los_Angeles')
                                          .format('MM-DD-YYYY hh:mm a');
                                        var description =
                                          'Difficulty: ' +
                                          numberWithCommas(
                                            difficulty.toFixed(0)
                                          ) +
                                          '\n' +
                                          'Block: ' +
                                          currentHeight +
                                          '\n' +
                                          'Block Solved in: ' +
                                          currentBlockTime +
                                          ' seconds ' +
                                          '\n' +
                                          'Block Solved by: \n' +
                                          currentBlockWinner +
                                          '\n' +
                                          'Block Reward: ' +
                                          numberWithCommas(currentReward) +
                                          ' ' +
                                          coinSymbol +
                                          '\n' +
                                          'Algo Hash: ' +
                                          currentBlockAlgo +
                                          '\n' +
                                          'Algo Order: \n' +
                                          currentAlgoOrder +
                                          '\n\n' +
                                          'Sources: ' +
                                          explorerApiUrl;
                                        const embed = {
                                          description: description,
                                          color: 7976557,
                                          footer: {
                                            text:
                                              'Last Updated | ' +
                                              timestamp +
                                              ' PST'
                                          },
                                          author: {
                                            name:
                                              coinName +
                                              '(' +
                                              coinSymbol +
                                              ') Network Stats',
                                            icon_url:
                                              'https://i.imgur.com/yWf5USu.png'
                                          }
                                        };
                                        msg.channel.send({ embed });
                                        return;
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
