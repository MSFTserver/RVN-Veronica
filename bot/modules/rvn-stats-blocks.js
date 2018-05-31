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
    'Displays  block info\n**!block number** <#>\n     displays block info using blocks Height\n**!block hash** <block-hash>\n     displays block info using blocks Hash',
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
        if (!words[1]) {
          var block = null;
        } else {
          var block = words[1];
        }
        getBlockbyNumber(block);
    } else if (words[0] == 'hash') {
      var block = words[1];
      getBlockbyHash(block);
    } else if (!words[0]) {
      var block = null;
      getBlockbyNumber(block);
    } else {
      var isNaN = getValidatedAmount(words[0]);
      if (!isNaN) {
        var block = words[0];
        getBlockbyHash(block);
      } else {
        var block = words[0];
        getBlockbyNumber(block);
      }
    }
    function getBlockbyHash(block) {
      needle.get(explorerApiUrl + 'api/block/' + block, function(
        error,
        response
      ) {
        if (response.statusCode !== 200) {
          if (response.statusCode == 122) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
            );
          }
          if (response.statusCode == 300) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
            );
          }
          if (response.statusCode == 301) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
            );
          }
          if (response.statusCode == 303) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
            );
          }
          if (response.statusCode == 304) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Modified'
            );
          }
          if (response.statusCode == 305) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
            );
          }
          if (response.statusCode == 306) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
            );
          }
          if (response.statusCode == 307) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
            );
          }
          if (response.statusCode == 308) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
            );
          }
          if (response.statusCode == 400) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Request'
            );
          }
          if (response.statusCode == 401) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
            );
          }
          if (response.statusCode == 402) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Payment Required'
            );
          }
          if (response.statusCode == 403) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
            );
          }
          if (response.statusCode == 404) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
            );
          }
          if (response.statusCode == 405) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
            );
          }
          if (response.statusCode == 406) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
            );
          }
          if (response.statusCode == 407) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Proxy Authen­tic­ation Required'
            );
          }
          if (response.statusCode == 408) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
            );
          }
          if (response.statusCode == 409) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
            );
          }
          if (response.statusCode == 410) {
            msg.channel.send('<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone');
          }
          if (response.statusCode == 411) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Length Required'
            );
          }
          if (response.statusCode == 412) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
            );
          }
          if (response.statusCode == 413) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Entity Too Large'
            );
          }
          if (response.statusCode == 414) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
            );
          }
          if (response.statusCode == 415) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
            );
          }
          if (response.statusCode == 416) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Requested Range Not Satisf­iable'
            );
          }
          if (response.statusCode == 417) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
            );
          }
          if (response.statusCode == 418) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
            );
          }
          if (response.statusCode == 422) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
            );
          }
          if (response.statusCode == 423) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
            );
          }
          if (response.statusCode == 424) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
            );
          }
          if (response.statusCode == 425) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
            );
          }
          if (response.statusCode == 426) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
            );
          }
          if (response.statusCode == 428) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
            );
          }
          if (response.statusCode == 429) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
            );
          }
          if (response.statusCode == 431) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Header Fields Too Large '
            );
          }
          if (response.statusCode == 444) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'No Response '
            );
          }
          if (response.statusCode == 449) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Retry With '
            );
          }
          if (response.statusCode == 450) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Blocked By Windows Parental Controls '
            );
          }
          if (response.statusCode == 451) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Unavailable For Legal Reasons'
            );
          }
          if (response.statusCode == 499) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
            );
          }
          if (response.statusCode == 500) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
            );
          }
          if (response.statusCode == 501) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
            );
          }
          if (response.statusCode == 502) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
            );
          }
          if (response.statusCode == 503) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
            );
          }
          if (response.statusCode == 504) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
            );
          }
          if (response.statusCode == 505) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'HTTP Version Not Supported'
            );
          }
          if (response.statusCode == 506) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Variant Also Negotiates'
            );
          }
          if (response.statusCode == 507) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
            );
          }
          if (response.statusCode == 508) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
            );
          }
          if (response.statusCode == 509) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Bandwidth Limit Exceeded'
            );
          }
          if (response.statusCode == 510) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Extended'
            );
          }
          if (response.statusCode == 511) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network Authentication Required'
            );
          }
          if (response.statusCode == 598) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network read timeout error'
            );
          }
          if (response.statusCode == 599) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network connect timeout error'
            );
          }
        } else {
          var Height = response.body.height;
          var previousHeight = Height - 1;
          var difficulty = response.body.difficulty;
          var Time = Number(response.body.time);
          var Reward = Number(response.body.reward);
          var BlockAlgo = block.substr(block.length - 16);
          var Algo = BlockAlgo.split('');
          var AlgoOrder =
            algolist[Algo[0]] +
            '->' +
            algolist[Algo[1]] +
            '->' +
            algolist[Algo[2]] +
            '->' +
            algolist[Algo[3]] +
            '->' +
            algolist[Algo[4]] +
            '->' +
            algolist[Algo[5]] +
            '->' +
            algolist[Algo[6]] +
            '->' +
            algolist[Algo[7]] +
            '->\n' +
            algolist[Algo[8]] +
            '->' +
            algolist[Algo[9]] +
            '->' +
            algolist[Algo[10]] +
            '->' +
            algolist[Algo[11]] +
            '->' +
            algolist[Algo[12]] +
            '->' +
            algolist[Algo[13]] +
            '->' +
            algolist[Algo[14]] +
            '->' +
            algolist[Algo[15]];
          needle.get(
            explorerApiUrl + 'api/txs?block=' + Height,
            function(error, response) {
              if (response.statusCode !== 200) {
                if (response.statusCode == 122) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request-URI too long'
                  );
                }
                if (response.statusCode == 300) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
                  );
                }
                if (response.statusCode == 301) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Moved Permanently'
                  );
                }
                if (response.statusCode == 303) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
                  );
                }
                if (response.statusCode == 304) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                  );
                }
                if (response.statusCode == 305) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                  );
                }
                if (response.statusCode == 306) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                  );
                }
                if (response.statusCode == 307) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Temporary Redirect'
                  );
                }
                if (response.statusCode == 308) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Permanent Redirect'
                  );
                }
                if (response.statusCode == 400) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                  );
                }
                if (response.statusCode == 401) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                  );
                }
                if (response.statusCode == 402) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Payment Required'
                  );
                }
                if (response.statusCode == 403) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                  );
                }
                if (response.statusCode == 404) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
                  );
                }
                if (response.statusCode == 405) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Method Not Allowed'
                  );
                }
                if (response.statusCode == 406) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                  );
                }
                if (response.statusCode == 407) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Proxy Authen­tic­ation Required'
                  );
                }
                if (response.statusCode == 408) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
                  );
                }
                if (response.statusCode == 409) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
                  );
                }
                if (response.statusCode == 410) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                  );
                }
                if (response.statusCode == 411) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Length Required'
                  );
                }
                if (response.statusCode == 412) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Precondition Failed'
                  );
                }
                if (response.statusCode == 413) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request Entity Too Large'
                  );
                }
                if (response.statusCode == 414) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request-URI Too Long'
                  );
                }
                if (response.statusCode == 415) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unsupported Media Type'
                  );
                }
                if (response.statusCode == 416) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Requested Range Not Satisf­iable'
                  );
                }
                if (response.statusCode == 417) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Expectation Failed'
                  );
                }
                if (response.statusCode == 418) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                  );
                }
                if (response.statusCode == 422) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unprocessable Entity'
                  );
                }
                if (response.statusCode == 423) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
                  );
                }
                if (response.statusCode == 424) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Failed Dependency'
                  );
                }
                if (response.statusCode == 425) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unordered Collection'
                  );
                }
                if (response.statusCode == 426) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
                  );
                }
                if (response.statusCode == 428) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Precondition Required '
                  );
                }
                if (response.statusCode == 429) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Too Many Requests '
                  );
                }
                if (response.statusCode == 431) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request Header Fields Too Large '
                  );
                }
                if (response.statusCode == 444) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'No Response '
                  );
                }
                if (response.statusCode == 449) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Retry With '
                  );
                }
                if (response.statusCode == 450) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Blocked By Windows Parental Controls '
                  );
                }
                if (response.statusCode == 451) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unavailable For Legal Reasons'
                  );
                }
                if (response.statusCode == 499) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Client Closed Request'
                  );
                }
                if (response.statusCode == 500) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Internal Server Error'
                  );
                }
                if (response.statusCode == 501) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
                  );
                }
                if (response.statusCode == 502) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                  );
                }
                if (response.statusCode == 503) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Service Unavailable'
                  );
                }
                if (response.statusCode == 504) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
                  );
                }
                if (response.statusCode == 505) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'HTTP Version Not Supported'
                  );
                }
                if (response.statusCode == 506) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Variant Also Negotiates'
                  );
                }
                if (response.statusCode == 507) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Insufficient Storage'
                  );
                }
                if (response.statusCode == 508) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                  );
                }
                if (response.statusCode == 509) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Bandwidth Limit Exceeded'
                  );
                }
                if (response.statusCode == 510) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                  );
                }
                if (response.statusCode == 511) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network Authentication Required'
                  );
                }
                if (response.statusCode == 598) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network read timeout error'
                  );
                }
                if (response.statusCode == 599) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network connect timeout error'
                  );
                }
              } else {
                var WinnerArray = response.body;
                var Winner = [];
                var WinnerAddys = [];
                for (var i = 0; i < WinnerArray.txs.length; i++) {
                  var position = i++;
                  if (
                    WinnerArray.txs[position].hasOwnProperty(
                      'isCoinBase'
                    )
                  ) {
                    Winner.push(WinnerArray.txs[position]);
                  }
                }
                for (var l = 0; l < Winner[0].vout.length; l++) {
                  var addys = Winner[0].vout[l].scriptPubKey.addresses;
                  if (addys) {
                    WinnerAddys.push(addys);
                  }
                }
                var BlockWinner = WinnerAddys.join(' \n');
                if (
                  BlockWinner.includes(
                    'RFgNoNzd8KEHbeFxnvJamy4yCV8ZDvR4jD'
                  )
                ) {
                  BlockWinner = '[suprnova](https://rvn.suprnova.cc/)';
                } else if (
                  BlockWinner.includes(
                    'RHQRGxCsVLwW6GYMkNHDRnzWaMHinXsGDt'
                  )
                ) {
                  BlockWinner = '[Yiimp](http://yiimp.eu/)';
                } else if (
                  BlockWinner.includes(
                    'RNJMLCLiss7hf23rZSq9BzhoQ94H5EDQTy'
                  )
                ) {
                  BlockWinner =
                    '[Raven Miner](http://www.ravenminer.com/)';
                } else if (
                  BlockWinner.includes(
                    'RVG96MbaKEDFzzj9NzbAuxkDt86KAm2Qj5'
                  )
                ) {
                  BlockWinner = '[f2pool](https://labs.f2pool.com/labs)';
                } else if (
                  BlockWinner.includes(
                    'RTUYcbkJo9zuW74brFc3bwxXyKpCiogxT7'
                  )
                ) {
                  BlockWinner = '[Pickaxe Pro](https://pickaxe.pro/)';
                } else if (
                  BlockWinner.includes(
                    'RN6vJ31K3Ycj7S4obdtYckXPPSAy7z5g2p'
                  )
                ) {
                  BlockWinner =
                    '[Mining Panda](https://miningpanda.site)';
                } else if (
                  BlockWinner.includes(
                    'RG2tNoZpm6VKgpnUDqHr8L9gDL7kh43JnW'
                  )
                ) {
                  BlockWinner =
                    '[Crypto Pool Party](https://cryptopool.party/)';
                } else if (
                  BlockWinner.includes(
                    'RGdHyWTLp9rR5mfUX2hGdAjCuYaDqa3hDo'
                  )
                ) {
                  BlockWinner =
                    '[KRAWWW Miner](http://krawww-miner.eu/)';
                } else if (
                  BlockWinner.includes(
                    'RHLJmCnpZ9JKBxYj1RWc7teD8gHSxkTozs'
                  )
                ) {
                  BlockWinner = '[minepool](https://www.minepool.com/)';
                } else if (
                  BlockWinner.includes(
                    'RF7FaQRQq9DdVcaZZikdahdacTiJh17NDU'
                  )
                ) {
                  BlockWinner =
                    '[Virtopia](https://mineit.virtopia.ca/)';
                } else if (
                  BlockWinner.includes(
                    'RGBjnf4gpXsJLvcGqvU1yc6ZwKQMEPqaTf'
                  )
                ) {
                  BlockWinner =
                    '[OMEGA Pool](https://www.omegapool.cc/?page=dashboard&coin=raven)';
                } else if (
                  BlockWinner.includes(
                    'RAFmhKe26pSinN9eERhqWk1nUMnx33LDi2'
                  )
                ) {
                  BlockWinner =
                    '[Evocatioin Network](https://evocation.network/stats.html)';
                } else if (
                  BlockWinner.includes(
                    'RK4GiCpC6nvX2sswH3pre1nwbng8S8ViCn'
                  )
                ) {
                  BlockWinner =
                    '[Coin Blockers](https://rvn.coinblockers.com/)';
                } else if (
                  BlockWinner.includes(
                    'RQZS8LBvv2VWuAEWF5BXoRikoG6MRp5asH'
                  )
                ) {
                  BlockWinner = '[BSOD](https://bsod.pw/site/mining)';
                } else if (
                  BlockWinner.includes(
                    'R9JkHdoFVMmuhDnQX3W8L6KDKfzueWNQuj'
                  )
                ) {
                  BlockWinner = '[Hash 4 Life](https://hash4.life/)';
                } else if (
                  BlockWinner.includes(
                    'REESXgjhAuarm3Vs9rxPZpEmuAoSmbHBXV'
                  )
                ) {
                  BlockWinner =
                    '[Ominous Network](http://pool.ominousnetwork.com/)';
                }
                needle.get(
                  explorerApiUrl + 'api/block-index/' + previousHeight,
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      if (response.statusCode == 122) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI too long'
                        );
                      }
                      if (response.statusCode == 300) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Multiple Choices'
                        );
                      }
                      if (response.statusCode == 301) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Moved Permanently'
                        );
                      }
                      if (response.statusCode == 303) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
                        );
                      }
                      if (response.statusCode == 304) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Modified'
                        );
                      }
                      if (response.statusCode == 305) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                        );
                      }
                      if (response.statusCode == 306) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Switch Proxy'
                        );
                      }
                      if (response.statusCode == 307) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Temporary Redirect'
                        );
                      }
                      if (response.statusCode == 308) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Permanent Redirect'
                        );
                      }
                      if (response.statusCode == 400) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bad Request'
                        );
                      }
                      if (response.statusCode == 401) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unauth­orized'
                        );
                      }
                      if (response.statusCode == 402) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Payment Required'
                        );
                      }
                      if (response.statusCode == 403) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                        );
                      }
                      if (response.statusCode == 404) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
                        );
                      }
                      if (response.statusCode == 405) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Method Not Allowed'
                        );
                      }
                      if (response.statusCode == 406) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Acceptable'
                        );
                      }
                      if (response.statusCode == 407) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Proxy Authen­tic­ation Required'
                        );
                      }
                      if (response.statusCode == 408) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Timeout'
                        );
                      }
                      if (response.statusCode == 409) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
                        );
                      }
                      if (response.statusCode == 410) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                        );
                      }
                      if (response.statusCode == 411) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Length Required'
                        );
                      }
                      if (response.statusCode == 412) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Failed'
                        );
                      }
                      if (response.statusCode == 413) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Entity Too Large'
                        );
                      }
                      if (response.statusCode == 414) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI Too Long'
                        );
                      }
                      if (response.statusCode == 415) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unsupported Media Type'
                        );
                      }
                      if (response.statusCode == 416) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Requested Range Not Satisf­iable'
                        );
                      }
                      if (response.statusCode == 417) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Expectation Failed'
                        );
                      }
                      if (response.statusCode == 418) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            "I'm a teapot"
                        );
                      }
                      if (response.statusCode == 422) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unprocessable Entity'
                        );
                      }
                      if (response.statusCode == 423) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
                        );
                      }
                      if (response.statusCode == 424) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Failed Dependency'
                        );
                      }
                      if (response.statusCode == 425) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unordered Collection'
                        );
                      }
                      if (response.statusCode == 426) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Upgrade Required'
                        );
                      }
                      if (response.statusCode == 428) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Required '
                        );
                      }
                      if (response.statusCode == 429) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Too Many Requests '
                        );
                      }
                      if (response.statusCode == 431) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Header Fields Too Large '
                        );
                      }
                      if (response.statusCode == 444) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'No Response '
                        );
                      }
                      if (response.statusCode == 449) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Retry With '
                        );
                      }
                      if (response.statusCode == 450) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Blocked By Windows Parental Controls '
                        );
                      }
                      if (response.statusCode == 451) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unavailable For Legal Reasons'
                        );
                      }
                      if (response.statusCode == 499) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Client Closed Request'
                        );
                      }
                      if (response.statusCode == 500) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Internal Server Error'
                        );
                      }
                      if (response.statusCode == 501) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Implemented'
                        );
                      }
                      if (response.statusCode == 502) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bad Gateway'
                        );
                      }
                      if (response.statusCode == 503) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Service Unavailable'
                        );
                      }
                      if (response.statusCode == 504) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Gateway Timeout'
                        );
                      }
                      if (response.statusCode == 505) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'HTTP Version Not Supported'
                        );
                      }
                      if (response.statusCode == 506) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Variant Also Negotiates'
                        );
                      }
                      if (response.statusCode == 507) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Insufficient Storage'
                        );
                      }
                      if (response.statusCode == 508) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Loop Detected'
                        );
                      }
                      if (response.statusCode == 509) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bandwidth Limit Exceeded'
                        );
                      }
                      if (response.statusCode == 510) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Extended'
                        );
                      }
                      if (response.statusCode == 511) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network Authentication Required'
                        );
                      }
                      if (response.statusCode == 598) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network read timeout error'
                        );
                      }
                      if (response.statusCode == 599) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network connect timeout error'
                        );
                      }
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/block/' + previousBlockHash,
                        function(error, response) {
                          if (response.statusCode !== 200) {
                            if (response.statusCode == 122) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request-URI too long'
                              );
                            }
                            if (response.statusCode == 300) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Multiple Choices'
                              );
                            }
                            if (response.statusCode == 301) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Moved Permanently'
                              );
                            }
                            if (response.statusCode == 303) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'See Other'
                              );
                            }
                            if (response.statusCode == 304) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Modified'
                              );
                            }
                            if (response.statusCode == 305) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Use Proxy'
                              );
                            }
                            if (response.statusCode == 306) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Switch Proxy'
                              );
                            }
                            if (response.statusCode == 307) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Temporary Redirect'
                              );
                            }
                            if (response.statusCode == 308) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Permanent Redirect'
                              );
                            }
                            if (response.statusCode == 400) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bad Request'
                              );
                            }
                            if (response.statusCode == 401) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unauth­orized'
                              );
                            }
                            if (response.statusCode == 402) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Payment Required'
                              );
                            }
                            if (response.statusCode == 403) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Forbidden'
                              );
                            }
                            if (response.statusCode == 404) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Found'
                              );
                            }
                            if (response.statusCode == 405) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Method Not Allowed'
                              );
                            }
                            if (response.statusCode == 406) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Acceptable'
                              );
                            }
                            if (response.statusCode == 407) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Proxy Authen­tic­ation Required'
                              );
                            }
                            if (response.statusCode == 408) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Timeout'
                              );
                            }
                            if (response.statusCode == 409) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Conflict'
                              );
                            }
                            if (response.statusCode == 410) {
                              msg.channel.send(
                                '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                              );
                            }
                            if (response.statusCode == 411) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Length Required'
                              );
                            }
                            if (response.statusCode == 412) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Precondition Failed'
                              );
                            }
                            if (response.statusCode == 413) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Entity Too Large'
                              );
                            }
                            if (response.statusCode == 414) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request-URI Too Long'
                              );
                            }
                            if (response.statusCode == 415) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unsupported Media Type'
                              );
                            }
                            if (response.statusCode == 416) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Requested Range Not Satisf­iable'
                              );
                            }
                            if (response.statusCode == 417) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Expectation Failed'
                              );
                            }
                            if (response.statusCode == 418) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  "I'm a teapot"
                              );
                            }
                            if (response.statusCode == 422) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unprocessable Entity'
                              );
                            }
                            if (response.statusCode == 423) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Locked'
                              );
                            }
                            if (response.statusCode == 424) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Failed Dependency'
                              );
                            }
                            if (response.statusCode == 425) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unordered Collection'
                              );
                            }
                            if (response.statusCode == 426) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Upgrade Required'
                              );
                            }
                            if (response.statusCode == 428) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Precondition Required '
                              );
                            }
                            if (response.statusCode == 429) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Too Many Requests '
                              );
                            }
                            if (response.statusCode == 431) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Header Fields Too Large '
                              );
                            }
                            if (response.statusCode == 444) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'No Response '
                              );
                            }
                            if (response.statusCode == 449) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Retry With '
                              );
                            }
                            if (response.statusCode == 450) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Blocked By Windows Parental Controls '
                              );
                            }
                            if (response.statusCode == 451) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unavailable For Legal Reasons'
                              );
                            }
                            if (response.statusCode == 499) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Client Closed Request'
                              );
                            }
                            if (response.statusCode == 500) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Internal Server Error'
                              );
                            }
                            if (response.statusCode == 501) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Implemented'
                              );
                            }
                            if (response.statusCode == 502) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bad Gateway'
                              );
                            }
                            if (response.statusCode == 503) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Service Unavailable'
                              );
                            }
                            if (response.statusCode == 504) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Gateway Timeout'
                              );
                            }
                            if (response.statusCode == 505) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'HTTP Version Not Supported'
                              );
                            }
                            if (response.statusCode == 506) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Variant Also Negotiates'
                              );
                            }
                            if (response.statusCode == 507) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Insufficient Storage'
                              );
                            }
                            if (response.statusCode == 508) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Loop Detected'
                              );
                            }
                            if (response.statusCode == 509) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bandwidth Limit Exceeded'
                              );
                            }
                            if (response.statusCode == 510) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Extended'
                              );
                            }
                            if (response.statusCode == 511) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network Authentication Required'
                              );
                            }
                            if (response.statusCode == 598) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network read timeout error'
                              );
                            }
                            if (response.statusCode == 599) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network connect timeout error'
                              );
                            }
                          } else {
                            var previousTime = Number(response.body.time);
                            var BlockTime = Time - previousTime;
                            var timestamp = moment()
                              .tz('America/Los_Angeles')
                              .format('MM-DD-YYYY hh:mm a');
                            var description =
                              'Difficulty: ' +
                              numberWithCommas(difficulty.toFixed(0)) +
                              '\n' +
                              'Block: ' +
                              Height +
                              '\n' +
                              'Block Solved in: ' +
                              BlockTime +
                              ' seconds ' +
                              '\n' +
                              'Block Solved by: \n' +
                              BlockWinner +
                              '\n' +
                              'Block Reward: ' +
                              numberWithCommas(Reward) +
                              ' ' +
                              coinSymbol +
                              '\n' +
                              'Algo Hash: ' +
                              BlockAlgo +
                              '\n' +
                              'Algo Order: \n' +
                              AlgoOrder +
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
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
            );
          }
          if (response.statusCode == 300) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
            );
          }
          if (response.statusCode == 301) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
            );
          }
          if (response.statusCode == 303) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
            );
          }
          if (response.statusCode == 304) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Modified'
            );
          }
          if (response.statusCode == 305) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
            );
          }
          if (response.statusCode == 306) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
            );
          }
          if (response.statusCode == 307) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
            );
          }
          if (response.statusCode == 308) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
            );
          }
          if (response.statusCode == 400) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Request'
            );
          }
          if (response.statusCode == 401) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
            );
          }
          if (response.statusCode == 402) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Payment Required'
            );
          }
          if (response.statusCode == 403) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
            );
          }
          if (response.statusCode == 404) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
            );
          }
          if (response.statusCode == 405) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
            );
          }
          if (response.statusCode == 406) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
            );
          }
          if (response.statusCode == 407) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Proxy Authen­tic­ation Required'
            );
          }
          if (response.statusCode == 408) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
            );
          }
          if (response.statusCode == 409) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
            );
          }
          if (response.statusCode == 410) {
            msg.channel.send('<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone');
          }
          if (response.statusCode == 411) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Length Required'
            );
          }
          if (response.statusCode == 412) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
            );
          }
          if (response.statusCode == 413) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Entity Too Large'
            );
          }
          if (response.statusCode == 414) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
            );
          }
          if (response.statusCode == 415) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
            );
          }
          if (response.statusCode == 416) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Requested Range Not Satisf­iable'
            );
          }
          if (response.statusCode == 417) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
            );
          }
          if (response.statusCode == 418) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
            );
          }
          if (response.statusCode == 422) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
            );
          }
          if (response.statusCode == 423) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
            );
          }
          if (response.statusCode == 424) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
            );
          }
          if (response.statusCode == 425) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
            );
          }
          if (response.statusCode == 426) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
            );
          }
          if (response.statusCode == 428) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
            );
          }
          if (response.statusCode == 429) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
            );
          }
          if (response.statusCode == 431) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Request Header Fields Too Large '
            );
          }
          if (response.statusCode == 444) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'No Response '
            );
          }
          if (response.statusCode == 449) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Retry With '
            );
          }
          if (response.statusCode == 450) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Blocked By Windows Parental Controls '
            );
          }
          if (response.statusCode == 451) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Unavailable For Legal Reasons'
            );
          }
          if (response.statusCode == 499) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
            );
          }
          if (response.statusCode == 500) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
            );
          }
          if (response.statusCode == 501) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
            );
          }
          if (response.statusCode == 502) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
            );
          }
          if (response.statusCode == 503) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
            );
          }
          if (response.statusCode == 504) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
            );
          }
          if (response.statusCode == 505) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'HTTP Version Not Supported'
            );
          }
          if (response.statusCode == 506) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Variant Also Negotiates'
            );
          }
          if (response.statusCode == 507) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
            );
          }
          if (response.statusCode == 508) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
            );
          }
          if (response.statusCode == 509) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Bandwidth Limit Exceeded'
            );
          }
          if (response.statusCode == 510) {
            msg.channel.send(
              '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Extended'
            );
          }
          if (response.statusCode == 511) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network Authentication Required'
            );
          }
          if (response.statusCode == 598) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network read timeout error'
            );
          }
          if (response.statusCode == 599) {
            msg.channel.send(
              '<' +
                explorerApiUrl +
                '>' +
                ' ERROR: ' +
                'Network connect timeout error'
            );
          }
        } else {
          if (!block) {
            var Height = response.body.info.blocks;
            var previousHeight = Number(response.body.info.blocks) - 1;
            var currentBlock = true;
          } else {
            var isNaN = getValidatedAmount(block);
            if (!isNaN) {
              msg.channel.send('Please specify a number for the block');
              return;
            } else {
              var block = isNaN;
            }
            var Height = block;
            var previousHeight = Number(block) - 1;
          }
          needle.get(
            explorerApiUrl + 'api/block-index/' + Height,
            function(error, response) {
              if (response.statusCode !== 200) {
                if (response.statusCode == 122) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request-URI too long'
                  );
                }
                if (response.statusCode == 300) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
                  );
                }
                if (response.statusCode == 301) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Moved Permanently'
                  );
                }
                if (response.statusCode == 303) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
                  );
                }
                if (response.statusCode == 304) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                  );
                }
                if (response.statusCode == 305) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                  );
                }
                if (response.statusCode == 306) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                  );
                }
                if (response.statusCode == 307) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Temporary Redirect'
                  );
                }
                if (response.statusCode == 308) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Permanent Redirect'
                  );
                }
                if (response.statusCode == 400) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                  );
                }
                if (response.statusCode == 401) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                  );
                }
                if (response.statusCode == 402) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Payment Required'
                  );
                }
                if (response.statusCode == 403) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                  );
                }
                if (response.statusCode == 404) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
                  );
                }
                if (response.statusCode == 405) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Method Not Allowed'
                  );
                }
                if (response.statusCode == 406) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                  );
                }
                if (response.statusCode == 407) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Proxy Authen­tic­ation Required'
                  );
                }
                if (response.statusCode == 408) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
                  );
                }
                if (response.statusCode == 409) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
                  );
                }
                if (response.statusCode == 410) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                  );
                }
                if (response.statusCode == 411) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Length Required'
                  );
                }
                if (response.statusCode == 412) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Precondition Failed'
                  );
                }
                if (response.statusCode == 413) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request Entity Too Large'
                  );
                }
                if (response.statusCode == 414) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request-URI Too Long'
                  );
                }
                if (response.statusCode == 415) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unsupported Media Type'
                  );
                }
                if (response.statusCode == 416) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Requested Range Not Satisf­iable'
                  );
                }
                if (response.statusCode == 417) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Expectation Failed'
                  );
                }
                if (response.statusCode == 418) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                  );
                }
                if (response.statusCode == 422) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unprocessable Entity'
                  );
                }
                if (response.statusCode == 423) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
                  );
                }
                if (response.statusCode == 424) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Failed Dependency'
                  );
                }
                if (response.statusCode == 425) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unordered Collection'
                  );
                }
                if (response.statusCode == 426) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
                  );
                }
                if (response.statusCode == 428) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Precondition Required '
                  );
                }
                if (response.statusCode == 429) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Too Many Requests '
                  );
                }
                if (response.statusCode == 431) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Request Header Fields Too Large '
                  );
                }
                if (response.statusCode == 444) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'No Response '
                  );
                }
                if (response.statusCode == 449) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Retry With '
                  );
                }
                if (response.statusCode == 450) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Blocked By Windows Parental Controls '
                  );
                }
                if (response.statusCode == 451) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Unavailable For Legal Reasons'
                  );
                }
                if (response.statusCode == 499) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Client Closed Request'
                  );
                }
                if (response.statusCode == 500) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Internal Server Error'
                  );
                }
                if (response.statusCode == 501) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
                  );
                }
                if (response.statusCode == 502) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                  );
                }
                if (response.statusCode == 503) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Service Unavailable'
                  );
                }
                if (response.statusCode == 504) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
                  );
                }
                if (response.statusCode == 505) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'HTTP Version Not Supported'
                  );
                }
                if (response.statusCode == 506) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Variant Also Negotiates'
                  );
                }
                if (response.statusCode == 507) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Insufficient Storage'
                  );
                }
                if (response.statusCode == 508) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                  );
                }
                if (response.statusCode == 509) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Bandwidth Limit Exceeded'
                  );
                }
                if (response.statusCode == 510) {
                  msg.channel.send(
                    '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                  );
                }
                if (response.statusCode == 511) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network Authentication Required'
                  );
                }
                if (response.statusCode == 598) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network read timeout error'
                  );
                }
                if (response.statusCode == 599) {
                  msg.channel.send(
                    '<' +
                      explorerApiUrl +
                      '>' +
                      ' ERROR: ' +
                      'Network connect timeout error'
                  );
                }
              } else {
                var BlockHash = response.body.blockHash;
                needle.get(
                  explorerApiUrl + 'api/block-index/' + previousHeight,
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      if (response.statusCode == 122) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI too long'
                        );
                      }
                      if (response.statusCode == 300) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Multiple Choices'
                        );
                      }
                      if (response.statusCode == 301) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Moved Permanently'
                        );
                      }
                      if (response.statusCode == 303) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
                        );
                      }
                      if (response.statusCode == 304) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Modified'
                        );
                      }
                      if (response.statusCode == 305) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                        );
                      }
                      if (response.statusCode == 306) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Switch Proxy'
                        );
                      }
                      if (response.statusCode == 307) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Temporary Redirect'
                        );
                      }
                      if (response.statusCode == 308) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Permanent Redirect'
                        );
                      }
                      if (response.statusCode == 400) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bad Request'
                        );
                      }
                      if (response.statusCode == 401) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unauth­orized'
                        );
                      }
                      if (response.statusCode == 402) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Payment Required'
                        );
                      }
                      if (response.statusCode == 403) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                        );
                      }
                      if (response.statusCode == 404) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
                        );
                      }
                      if (response.statusCode == 405) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Method Not Allowed'
                        );
                      }
                      if (response.statusCode == 406) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Acceptable'
                        );
                      }
                      if (response.statusCode == 407) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Proxy Authen­tic­ation Required'
                        );
                      }
                      if (response.statusCode == 408) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Timeout'
                        );
                      }
                      if (response.statusCode == 409) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
                        );
                      }
                      if (response.statusCode == 410) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                        );
                      }
                      if (response.statusCode == 411) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Length Required'
                        );
                      }
                      if (response.statusCode == 412) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Failed'
                        );
                      }
                      if (response.statusCode == 413) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Entity Too Large'
                        );
                      }
                      if (response.statusCode == 414) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request-URI Too Long'
                        );
                      }
                      if (response.statusCode == 415) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unsupported Media Type'
                        );
                      }
                      if (response.statusCode == 416) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Requested Range Not Satisf­iable'
                        );
                      }
                      if (response.statusCode == 417) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Expectation Failed'
                        );
                      }
                      if (response.statusCode == 418) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            "I'm a teapot"
                        );
                      }
                      if (response.statusCode == 422) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unprocessable Entity'
                        );
                      }
                      if (response.statusCode == 423) {
                        msg.channel.send(
                          '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
                        );
                      }
                      if (response.statusCode == 424) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Failed Dependency'
                        );
                      }
                      if (response.statusCode == 425) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unordered Collection'
                        );
                      }
                      if (response.statusCode == 426) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Upgrade Required'
                        );
                      }
                      if (response.statusCode == 428) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Precondition Required '
                        );
                      }
                      if (response.statusCode == 429) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Too Many Requests '
                        );
                      }
                      if (response.statusCode == 431) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Request Header Fields Too Large '
                        );
                      }
                      if (response.statusCode == 444) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'No Response '
                        );
                      }
                      if (response.statusCode == 449) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Retry With '
                        );
                      }
                      if (response.statusCode == 450) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Blocked By Windows Parental Controls '
                        );
                      }
                      if (response.statusCode == 451) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Unavailable For Legal Reasons'
                        );
                      }
                      if (response.statusCode == 499) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Client Closed Request'
                        );
                      }
                      if (response.statusCode == 500) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Internal Server Error'
                        );
                      }
                      if (response.statusCode == 501) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Implemented'
                        );
                      }
                      if (response.statusCode == 502) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bad Gateway'
                        );
                      }
                      if (response.statusCode == 503) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Service Unavailable'
                        );
                      }
                      if (response.statusCode == 504) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Gateway Timeout'
                        );
                      }
                      if (response.statusCode == 505) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'HTTP Version Not Supported'
                        );
                      }
                      if (response.statusCode == 506) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Variant Also Negotiates'
                        );
                      }
                      if (response.statusCode == 507) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Insufficient Storage'
                        );
                      }
                      if (response.statusCode == 508) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Loop Detected'
                        );
                      }
                      if (response.statusCode == 509) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Bandwidth Limit Exceeded'
                        );
                      }
                      if (response.statusCode == 510) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Not Extended'
                        );
                      }
                      if (response.statusCode == 511) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network Authentication Required'
                        );
                      }
                      if (response.statusCode == 598) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network read timeout error'
                        );
                      }
                      if (response.statusCode == 599) {
                        msg.channel.send(
                          '<' +
                            explorerApiUrl +
                            '>' +
                            ' ERROR: ' +
                            'Network connect timeout error'
                        );
                      }
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/txs?block=' + Height,
                        function(error, response) {
                          if (response.statusCode !== 200) {
                            if (response.statusCode == 122) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request-URI too long'
                              );
                            }
                            if (response.statusCode == 300) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Multiple Choices'
                              );
                            }
                            if (response.statusCode == 301) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Moved Permanently'
                              );
                            }
                            if (response.statusCode == 303) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'See Other'
                              );
                            }
                            if (response.statusCode == 304) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Modified'
                              );
                            }
                            if (response.statusCode == 305) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Use Proxy'
                              );
                            }
                            if (response.statusCode == 306) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Switch Proxy'
                              );
                            }
                            if (response.statusCode == 307) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Temporary Redirect'
                              );
                            }
                            if (response.statusCode == 308) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Permanent Redirect'
                              );
                            }
                            if (response.statusCode == 400) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bad Request'
                              );
                            }
                            if (response.statusCode == 401) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unauth­orized'
                              );
                            }
                            if (response.statusCode == 402) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Payment Required'
                              );
                            }
                            if (response.statusCode == 403) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Forbidden'
                              );
                            }
                            if (response.statusCode == 404) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Found'
                              );
                            }
                            if (response.statusCode == 405) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Method Not Allowed'
                              );
                            }
                            if (response.statusCode == 406) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Acceptable'
                              );
                            }
                            if (response.statusCode == 407) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Proxy Authen­tic­ation Required'
                              );
                            }
                            if (response.statusCode == 408) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Timeout'
                              );
                            }
                            if (response.statusCode == 409) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Conflict'
                              );
                            }
                            if (response.statusCode == 410) {
                              msg.channel.send(
                                '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                              );
                            }
                            if (response.statusCode == 411) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Length Required'
                              );
                            }
                            if (response.statusCode == 412) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Precondition Failed'
                              );
                            }
                            if (response.statusCode == 413) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Entity Too Large'
                              );
                            }
                            if (response.statusCode == 414) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request-URI Too Long'
                              );
                            }
                            if (response.statusCode == 415) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unsupported Media Type'
                              );
                            }
                            if (response.statusCode == 416) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Requested Range Not Satisf­iable'
                              );
                            }
                            if (response.statusCode == 417) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Expectation Failed'
                              );
                            }
                            if (response.statusCode == 418) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  "I'm a teapot"
                              );
                            }
                            if (response.statusCode == 422) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unprocessable Entity'
                              );
                            }
                            if (response.statusCode == 423) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Locked'
                              );
                            }
                            if (response.statusCode == 424) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Failed Dependency'
                              );
                            }
                            if (response.statusCode == 425) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unordered Collection'
                              );
                            }
                            if (response.statusCode == 426) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Upgrade Required'
                              );
                            }
                            if (response.statusCode == 428) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Precondition Required '
                              );
                            }
                            if (response.statusCode == 429) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Too Many Requests '
                              );
                            }
                            if (response.statusCode == 431) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Request Header Fields Too Large '
                              );
                            }
                            if (response.statusCode == 444) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'No Response '
                              );
                            }
                            if (response.statusCode == 449) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Retry With '
                              );
                            }
                            if (response.statusCode == 450) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Blocked By Windows Parental Controls '
                              );
                            }
                            if (response.statusCode == 451) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Unavailable For Legal Reasons'
                              );
                            }
                            if (response.statusCode == 499) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Client Closed Request'
                              );
                            }
                            if (response.statusCode == 500) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Internal Server Error'
                              );
                            }
                            if (response.statusCode == 501) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Implemented'
                              );
                            }
                            if (response.statusCode == 502) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bad Gateway'
                              );
                            }
                            if (response.statusCode == 503) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Service Unavailable'
                              );
                            }
                            if (response.statusCode == 504) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Gateway Timeout'
                              );
                            }
                            if (response.statusCode == 505) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'HTTP Version Not Supported'
                              );
                            }
                            if (response.statusCode == 506) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Variant Also Negotiates'
                              );
                            }
                            if (response.statusCode == 507) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Insufficient Storage'
                              );
                            }
                            if (response.statusCode == 508) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Loop Detected'
                              );
                            }
                            if (response.statusCode == 509) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Bandwidth Limit Exceeded'
                              );
                            }
                            if (response.statusCode == 510) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Not Extended'
                              );
                            }
                            if (response.statusCode == 511) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network Authentication Required'
                              );
                            }
                            if (response.statusCode == 598) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network read timeout error'
                              );
                            }
                            if (response.statusCode == 599) {
                              msg.channel.send(
                                '<' +
                                  explorerApiUrl +
                                  '>' +
                                  ' ERROR: ' +
                                  'Network connect timeout error'
                              );
                            }
                          } else {
                            var WinnerArray = response.body;
                            var Winner = [];
                            var WinnerAddys = [];
                            for (
                              var i = 0;
                              i < WinnerArray.txs.length;
                              i++
                            ) {
                              var position = i++;
                              if (
                                WinnerArray.txs[position].hasOwnProperty(
                                  'isCoinBase'
                                )
                              ) {
                                Winner.push(
                                  WinnerArray.txs[position]
                                );
                              }
                            }
                            for (
                              var l = 0;
                              l < Winner[0].vout.length;
                              l++
                            ) {
                              var addys =
                                Winner[0].vout[l].scriptPubKey.addresses;
                              if (addys) {
                                WinnerAddys.push(addys);
                              }
                            }
                            var BlockWinner = WinnerAddys.join(
                              ' \n'
                            );
                            if (
                              BlockWinner.includes(
                                'RFgNoNzd8KEHbeFxnvJamy4yCV8ZDvR4jD'
                              )
                            ) {
                              BlockWinner =
                                '[suprnova](https://rvn.suprnova.cc/)';
                            } else if (
                              BlockWinner.includes(
                                'RHQRGxCsVLwW6GYMkNHDRnzWaMHinXsGDt'
                              )
                            ) {
                              BlockWinner = '[Yiimp](http://yiimp.eu/)';
                            } else if (
                              BlockWinner.includes(
                                'RNJMLCLiss7hf23rZSq9BzhoQ94H5EDQTy'
                              )
                            ) {
                              BlockWinner =
                                '[Raven Miner](http://www.ravenminer.com/)';
                            } else if (
                              BlockWinner.includes(
                                'RVG96MbaKEDFzzj9NzbAuxkDt86KAm2Qj5'
                              )
                            ) {
                              BlockWinner =
                                '[f2pool](https://labs.f2pool.com/labs)';
                            } else if (
                              BlockWinner.includes(
                                'RTUYcbkJo9zuW74brFc3bwxXyKpCiogxT7'
                              )
                            ) {
                              BlockWinner =
                                '[Pickaxe Pro](https://pickaxe.pro/)';
                            } else if (
                              BlockWinner.includes(
                                'RN6vJ31K3Ycj7S4obdtYckXPPSAy7z5g2p'
                              )
                            ) {
                              BlockWinner =
                                '[Mining Panda](https://miningpanda.site)';
                            } else if (
                              BlockWinner.includes(
                                'RG2tNoZpm6VKgpnUDqHr8L9gDL7kh43JnW'
                              )
                            ) {
                              BlockWinner =
                                '[Crypto Pool Party](https://cryptopool.party/)';
                            } else if (
                              BlockWinner.includes(
                                'RGdHyWTLp9rR5mfUX2hGdAjCuYaDqa3hDo'
                              )
                            ) {
                              BlockWinner =
                                '[KRAWWW Miner](http://krawww-miner.eu/)';
                            } else if (
                              BlockWinner.includes(
                                'RHLJmCnpZ9JKBxYj1RWc7teD8gHSxkTozs'
                              )
                            ) {
                              BlockWinner =
                                '[minepool](https://www.minepool.com/)';
                            } else if (
                              BlockWinner.includes(
                                'RF7FaQRQq9DdVcaZZikdahdacTiJh17NDU'
                              )
                            ) {
                              BlockWinner =
                                '[Virtopia](https://mineit.virtopia.ca/)';
                            } else if (
                              BlockWinner.includes(
                                'RGBjnf4gpXsJLvcGqvU1yc6ZwKQMEPqaTf'
                              )
                            ) {
                              BlockWinner =
                                '[OMEGA Pool](https://www.omegapool.cc/?page=dashboard&coin=raven)';
                            } else if (
                              BlockWinner.includes(
                                'RAFmhKe26pSinN9eERhqWk1nUMnx33LDi2'
                              )
                            ) {
                              BlockWinner =
                                '[Evocatioin Network](https://evocation.network/stats.html)';
                            } else if (
                              BlockWinner.includes(
                                'RK4GiCpC6nvX2sswH3pre1nwbng8S8ViCn'
                              )
                            ) {
                              BlockWinner =
                                '[Coin Blockers](https://rvn.coinblockers.com/)';
                            } else if (
                              BlockWinner.includes(
                                'RQZS8LBvv2VWuAEWF5BXoRikoG6MRp5asH'
                              )
                            ) {
                              BlockWinner =
                                '[BSOD](https://bsod.pw/site/mining)';
                            } else if (
                              BlockWinner.includes(
                                'R9JkHdoFVMmuhDnQX3W8L6KDKfzueWNQuj'
                              )
                            ) {
                              BlockWinner =
                                '[Hash 4 Life](https://hash4.life/)';
                            } else if (
                              BlockWinner.includes(
                                'REESXgjhAuarm3Vs9rxPZpEmuAoSmbHBXV'
                              )
                            ) {
                              BlockWinner =
                                '[Ominous Network](http://pool.ominousnetwork.com/)';
                            }
                            needle.get(
                              explorerApiUrl + 'api/block/' + BlockHash,
                              function(error, response) {
                                if (response.statusCode !== 200) {
                                  if (response.statusCode == 122) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Request-URI too long'
                                    );
                                  }
                                  if (response.statusCode == 300) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Multiple Choices'
                                    );
                                  }
                                  if (response.statusCode == 301) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Moved Permanently'
                                    );
                                  }
                                  if (response.statusCode == 303) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'See Other'
                                    );
                                  }
                                  if (response.statusCode == 304) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Not Modified'
                                    );
                                  }
                                  if (response.statusCode == 305) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Use Proxy'
                                    );
                                  }
                                  if (response.statusCode == 306) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Switch Proxy'
                                    );
                                  }
                                  if (response.statusCode == 307) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Temporary Redirect'
                                    );
                                  }
                                  if (response.statusCode == 308) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Permanent Redirect'
                                    );
                                  }
                                  if (response.statusCode == 400) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Bad Request'
                                    );
                                  }
                                  if (response.statusCode == 401) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Unauth­orized'
                                    );
                                  }
                                  if (response.statusCode == 402) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Payment Required'
                                    );
                                  }
                                  if (response.statusCode == 403) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Forbidden'
                                    );
                                  }
                                  if (response.statusCode == 404) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Not Found'
                                    );
                                  }
                                  if (response.statusCode == 405) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Method Not Allowed'
                                    );
                                  }
                                  if (response.statusCode == 406) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Not Acceptable'
                                    );
                                  }
                                  if (response.statusCode == 407) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Proxy Authen­tic­ation Required'
                                    );
                                  }
                                  if (response.statusCode == 408) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Request Timeout'
                                    );
                                  }
                                  if (response.statusCode == 409) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Conflict'
                                    );
                                  }
                                  if (response.statusCode == 410) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Gone'
                                    );
                                  }
                                  if (response.statusCode == 411) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Length Required'
                                    );
                                  }
                                  if (response.statusCode == 412) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Precondition Failed'
                                    );
                                  }
                                  if (response.statusCode == 413) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Request Entity Too Large'
                                    );
                                  }
                                  if (response.statusCode == 414) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Request-URI Too Long'
                                    );
                                  }
                                  if (response.statusCode == 415) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Unsupported Media Type'
                                    );
                                  }
                                  if (response.statusCode == 416) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Requested Range Not Satisf­iable'
                                    );
                                  }
                                  if (response.statusCode == 417) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Expectation Failed'
                                    );
                                  }
                                  if (response.statusCode == 418) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        "I'm a teapot"
                                    );
                                  }
                                  if (response.statusCode == 422) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Unprocessable Entity'
                                    );
                                  }
                                  if (response.statusCode == 423) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Locked'
                                    );
                                  }
                                  if (response.statusCode == 424) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Failed Dependency'
                                    );
                                  }
                                  if (response.statusCode == 425) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Unordered Collection'
                                    );
                                  }
                                  if (response.statusCode == 426) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Upgrade Required'
                                    );
                                  }
                                  if (response.statusCode == 428) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Precondition Required '
                                    );
                                  }
                                  if (response.statusCode == 429) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Too Many Requests '
                                    );
                                  }
                                  if (response.statusCode == 431) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Request Header Fields Too Large '
                                    );
                                  }
                                  if (response.statusCode == 444) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'No Response '
                                    );
                                  }
                                  if (response.statusCode == 449) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Retry With '
                                    );
                                  }
                                  if (response.statusCode == 450) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Blocked By Windows Parental Controls '
                                    );
                                  }
                                  if (response.statusCode == 451) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Unavailable For Legal Reasons'
                                    );
                                  }
                                  if (response.statusCode == 499) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Client Closed Request'
                                    );
                                  }
                                  if (response.statusCode == 500) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Internal Server Error'
                                    );
                                  }
                                  if (response.statusCode == 501) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Not Implemented'
                                    );
                                  }
                                  if (response.statusCode == 502) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Bad Gateway'
                                    );
                                  }
                                  if (response.statusCode == 503) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Service Unavailable'
                                    );
                                  }
                                  if (response.statusCode == 504) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Gateway Timeout'
                                    );
                                  }
                                  if (response.statusCode == 505) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'HTTP Version Not Supported'
                                    );
                                  }
                                  if (response.statusCode == 506) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Variant Also Negotiates'
                                    );
                                  }
                                  if (response.statusCode == 507) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Insufficient Storage'
                                    );
                                  }
                                  if (response.statusCode == 508) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Loop Detected'
                                    );
                                  }
                                  if (response.statusCode == 509) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Bandwidth Limit Exceeded'
                                    );
                                  }
                                  if (response.statusCode == 510) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Not Extended'
                                    );
                                  }
                                  if (response.statusCode == 511) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Network Authentication Required'
                                    );
                                  }
                                  if (response.statusCode == 598) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Network read timeout error'
                                    );
                                  }
                                  if (response.statusCode == 599) {
                                    msg.channel.send(
                                      '<' +
                                        explorerApiUrl +
                                        '>' +
                                        ' ERROR: ' +
                                        'Network connect timeout error'
                                    );
                                  }
                                } else {
                                  var difficulty = response.body.difficulty;
                                  var Time = Number(response.body.time);
                                  var Reward = Number(
                                    response.body.reward
                                  );
                                  var BlockAlgo = BlockHash.substr(
                                    BlockHash.length - 16
                                  );
                                  var Algo = BlockAlgo.split('');
                                  var AlgoOrder =
                                    algolist[Algo[0]] +
                                    '->' +
                                    algolist[Algo[1]] +
                                    '->' +
                                    algolist[Algo[2]] +
                                    '->' +
                                    algolist[Algo[3]] +
                                    '->' +
                                    algolist[Algo[4]] +
                                    '->' +
                                    algolist[Algo[5]] +
                                    '->' +
                                    algolist[Algo[6]] +
                                    '->' +
                                    algolist[Algo[7]] +
                                    '->\n' +
                                    algolist[Algo[8]] +
                                    '->' +
                                    algolist[Algo[9]] +
                                    '->' +
                                    algolist[Algo[10]] +
                                    '->' +
                                    algolist[Algo[11]] +
                                    '->' +
                                    algolist[Algo[12]] +
                                    '->' +
                                    algolist[Algo[13]] +
                                    '->' +
                                    algolist[Algo[14]] +
                                    '->' +
                                    algolist[Algo[15]];
                                  needle.get(
                                    explorerApiUrl +
                                      'api/block/' +
                                      previousBlockHash,
                                    function(error, response) {
                                      if (response.statusCode !== 200) {
                                        if (response.statusCode == 122) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Request-URI too long'
                                          );
                                        }
                                        if (response.statusCode == 300) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Multiple Choices'
                                          );
                                        }
                                        if (response.statusCode == 301) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Moved Permanently'
                                          );
                                        }
                                        if (response.statusCode == 303) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'See Other'
                                          );
                                        }
                                        if (response.statusCode == 304) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Not Modified'
                                          );
                                        }
                                        if (response.statusCode == 305) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Use Proxy'
                                          );
                                        }
                                        if (response.statusCode == 306) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Switch Proxy'
                                          );
                                        }
                                        if (response.statusCode == 307) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Temporary Redirect'
                                          );
                                        }
                                        if (response.statusCode == 308) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Permanent Redirect'
                                          );
                                        }
                                        if (response.statusCode == 400) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Bad Request'
                                          );
                                        }
                                        if (response.statusCode == 401) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Unauth­orized'
                                          );
                                        }
                                        if (response.statusCode == 402) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Payment Required'
                                          );
                                        }
                                        if (response.statusCode == 403) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Forbidden'
                                          );
                                        }
                                        if (response.statusCode == 404) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Not Found'
                                          );
                                        }
                                        if (response.statusCode == 405) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Method Not Allowed'
                                          );
                                        }
                                        if (response.statusCode == 406) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Not Acceptable'
                                          );
                                        }
                                        if (response.statusCode == 407) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Proxy Authen­tic­ation Required'
                                          );
                                        }
                                        if (response.statusCode == 408) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Request Timeout'
                                          );
                                        }
                                        if (response.statusCode == 409) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Conflict'
                                          );
                                        }
                                        if (response.statusCode == 410) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Gone'
                                          );
                                        }
                                        if (response.statusCode == 411) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Length Required'
                                          );
                                        }
                                        if (response.statusCode == 412) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Precondition Failed'
                                          );
                                        }
                                        if (response.statusCode == 413) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Request Entity Too Large'
                                          );
                                        }
                                        if (response.statusCode == 414) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Request-URI Too Long'
                                          );
                                        }
                                        if (response.statusCode == 415) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Unsupported Media Type'
                                          );
                                        }
                                        if (response.statusCode == 416) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Requested Range Not Satisf­iable'
                                          );
                                        }
                                        if (response.statusCode == 417) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Expectation Failed'
                                          );
                                        }
                                        if (response.statusCode == 418) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              "I'm a teapot"
                                          );
                                        }
                                        if (response.statusCode == 422) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Unprocessable Entity'
                                          );
                                        }
                                        if (response.statusCode == 423) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Locked'
                                          );
                                        }
                                        if (response.statusCode == 424) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Failed Dependency'
                                          );
                                        }
                                        if (response.statusCode == 425) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Unordered Collection'
                                          );
                                        }
                                        if (response.statusCode == 426) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Upgrade Required'
                                          );
                                        }
                                        if (response.statusCode == 428) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Precondition Required '
                                          );
                                        }
                                        if (response.statusCode == 429) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Too Many Requests '
                                          );
                                        }
                                        if (response.statusCode == 431) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Request Header Fields Too Large '
                                          );
                                        }
                                        if (response.statusCode == 444) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'No Response '
                                          );
                                        }
                                        if (response.statusCode == 449) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Retry With '
                                          );
                                        }
                                        if (response.statusCode == 450) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Blocked By Windows Parental Controls '
                                          );
                                        }
                                        if (response.statusCode == 451) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Unavailable For Legal Reasons'
                                          );
                                        }
                                        if (response.statusCode == 499) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Client Closed Request'
                                          );
                                        }
                                        if (response.statusCode == 500) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Internal Server Error'
                                          );
                                        }
                                        if (response.statusCode == 501) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Not Implemented'
                                          );
                                        }
                                        if (response.statusCode == 502) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Bad Gateway'
                                          );
                                        }
                                        if (response.statusCode == 503) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Service Unavailable'
                                          );
                                        }
                                        if (response.statusCode == 504) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Gateway Timeout'
                                          );
                                        }
                                        if (response.statusCode == 505) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'HTTP Version Not Supported'
                                          );
                                        }
                                        if (response.statusCode == 506) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Variant Also Negotiates'
                                          );
                                        }
                                        if (response.statusCode == 507) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Insufficient Storage'
                                          );
                                        }
                                        if (response.statusCode == 508) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Loop Detected'
                                          );
                                        }
                                        if (response.statusCode == 509) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Bandwidth Limit Exceeded'
                                          );
                                        }
                                        if (response.statusCode == 510) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Not Extended'
                                          );
                                        }
                                        if (response.statusCode == 511) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Network Authentication Required'
                                          );
                                        }
                                        if (response.statusCode == 598) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Network read timeout error'
                                          );
                                        }
                                        if (response.statusCode == 599) {
                                          msg.channel.send(
                                            '<' +
                                              explorerApiUrl +
                                              '>' +
                                              ' ERROR: ' +
                                              'Network connect timeout error'
                                          );
                                        }
                                      } else {
                                        var previousTime = Number(
                                          response.body.time
                                        );
                                        var BlockTime =
                                          Time - previousTime;
                                        var timestamp = moment()
                                          .tz('America/Los_Angeles')
                                          .format('MM-DD-YYYY hh:mm a');
                                        if (currentBlock){
                                          var title = '**Current Block**\n';
                                        } else {
                                          var title = ''
                                        }
                                        var description =
                                          title + 'Difficulty: ' +
                                          numberWithCommas(
                                            difficulty.toFixed(0)
                                          ) +
                                          '\n' +
                                          'Block: ' +
                                          Height +
                                          '\n' +
                                          'Block Solved in: ' +
                                          BlockTime +
                                          ' seconds ' +
                                          '\n' +
                                          'Block Solved by: \n' +
                                          BlockWinner +
                                          '\n' +
                                          'Block Reward: ' +
                                          numberWithCommas(Reward) +
                                          ' ' +
                                          coinSymbol +
                                          '\n' +
                                          'Algo Hash: ' +
                                          BlockAlgo +
                                          '\n' +
                                          'Algo Order: \n' +
                                          AlgoOrder +
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
