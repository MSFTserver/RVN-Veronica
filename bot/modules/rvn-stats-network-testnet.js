/*
'use strict';
let needle = require('needle');
let config = require('config');
let moment = require('moment-timezone');
let hasRvnStatsNetworkChannels = require('../helpers.js')
  .hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = 'https://testnet.ravencoin.network/';
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['tnnetwork'];

exports.tnnetwork = {
  usage: '',
  description: 'Displays current TestNet Network Stats',
  process: function(bot, msg) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to Testnet bot.'
      );
      return;
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    var algolist1 = {
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
    needle.get(explorerApiUrl + 'api/status?q=getMiningInfo', function(
      error,
      response
    ) {
      if (response.statusCode !== 200) {
        msg.channel.send(getError(response.statusCode));
      } else {
        var hashrate = response.body.miningInfo.networkhashps;
        if (hashrate >= 10 ** 21 && hashrate < 10 ** 24) {
          var hashratecalc = hashrate / 10 ** 21;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' ZH/s';
        } else if (hashrate >= 10 ** 18 && hashrate < 10 ** 21) {
          var hashratecalc = hashrate / 10 ** 18;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' EH/s';
        } else if (hashrate >= 10 ** 15 && hashrate < 10 ** 18) {
          var hashratecalc = hashrate / 10 ** 15;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' PH/s';
        } else if (hashrate >= 10 ** 12 && hashrate < 10 ** 15) {
          var hashratecalc = hashrate / 10 ** 12;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' TH/s';
        } else if (hashrate >= 10 ** 9 && hashrate < 10 ** 12) {
          var hashratecalc = hashrate / 10 ** 9;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' GH/s';
        } else if (hashrate >= 10 ** 6 && hashrate < 10 ** 9) {
          var hashratecalc = hashrate / 10 ** 6;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' MH/s';
        } else if (hashrate >= 10 ** 3 && hashrate < 10 ** 6) {
          var hashratecalc = hashrate / 10 ** 3;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' kH/s';
        } else if (hashrate >= 1 && hasrate < 10 ** 3) {
          var hashratecalc = hashrate;
          var hashrate = numberWithCommas(hashratecalc.toFixed(4)) + ' H/s';
        }
        needle.get(explorerApiUrl + 'api/status', function(error, response) {
          if (response.statusCode !== 200) {
            msg.channel.send(getError(response.statusCode));
          } else {
            var Height = Number(response.body.info.blocks);
            var prvsHeight = Number(response.body.info.blocks) - 1;
            var difficulty = Number(response.body.info.difficulty);
            needle.get(explorerApiUrl + 'api/block-index/' + Height, function(
              error,
              response
            ) {
              if (response.statusCode !== 200) {
                msg.channel.send(getError(response.statusCode));
              } else {
                var BlockHash = response.body.blockHash;
                needle.get(
                  explorerApiUrl + 'api/block-index/' + prvsHeight,
                  function(error, response) {
                    if (response.statusCode !== 200) {
                      msg.channel.send(getError(response.statusCode));
                    } else {
                      var prvsBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/block/' + BlockHash,
                        function(error, response) {
                          if (response.statusCode !== 200) {
                            msg.channel.send(getError(response.statusCode));
                          } else {
                            var confirmations = response.body.confirmations;
                            var currentTime = Number(response.body.time);
                            let BlockWinner =
                              '[' +
                              response.body.poolInfo.poolName +
                              '](' +
                              response.body.poolInfo.url +
                              ')';
                            let hasWinner = true;
                            if (!response.body.poolInfo.poolName) {
                              hasWinner = false;
                            }
                            var Reward = Number(response.body.reward);
                            var BlockAlgo = BlockHash.substr(
                              BlockHash.length - 16
                            );
                            var Algo = BlockAlgo.split('');
                            var AlgoOrder =
                              algolist1[Algo[0]] +
                              '->' +
                              algolist1[Algo[1]] +
                              '->' +
                              algolist1[Algo[2]] +
                              '->' +
                              algolist1[Algo[3]] +
                              '->' +
                              algolist1[Algo[4]] +
                              '->' +
                              algolist1[Algo[5]] +
                              '->' +
                              algolist1[Algo[6]] +
                              '->' +
                              algolist1[Algo[7]] +
                              '->\n' +
                              algolist1[Algo[8]] +
                              '->' +
                              algolist1[Algo[9]] +
                              '->' +
                              algolist1[Algo[10]] +
                              '->' +
                              algolist1[Algo[11]] +
                              '->' +
                              algolist1[Algo[12]] +
                              '->' +
                              algolist1[Algo[13]] +
                              '->' +
                              algolist1[Algo[14]] +
                              '->' +
                              algolist1[Algo[15]];
                            needle.get(
                              explorerApiUrl + 'api/txs?block=' + Height,
                              function(error, response) {
                                if (response.statusCode !== 200) {
                                  msg.channel.send(
                                    getError(response.statusCode)
                                  );
                                } else {
                                  var BlockArray = response.body.txs;
                                  var txs = BlockArray.length - 1;
                                  var newBlockArray = [];
                                  for (var l = 0; l < BlockArray.length; l++) {
                                    if (!BlockArray[l].isCoinBase) {
                                      newBlockArray.push(BlockArray[l]);
                                    }
                                  }
                                  if (!newBlockArray[0]) {
                                    rvnSent = 0;
                                    rvnFees = 0;
                                  } else {
                                    var sentAmount = [];
                                    var feesAmount = [];
                                    for (
                                      var m = 0;
                                      m < newBlockArray.length;
                                      m++
                                    ) {
                                      sentAmount.push(
                                        newBlockArray[m].valueOut
                                      );
                                      feesAmount.push(newBlockArray[m].fees);
                                    }
                                    var rvnSent = sentAmount.reduce(function(
                                      acc,
                                      val
                                    ) {
                                      return acc + val;
                                    });
                                    var rvnFees = feesAmount.reduce(function(
                                      acc,
                                      val
                                    ) {
                                      return acc + val;
                                    });
                                  }
                                  var Winner = [];
                                  var WinnerAddys = [];
                                  if (!hasWinner) {
                                    for (
                                      var i = 0;
                                      i < BlockArray.length;
                                      i++
                                    ) {
                                      var position = i++;
                                      if (
                                        BlockArray[position].hasOwnProperty(
                                          'isCoinBase'
                                        )
                                      ) {
                                        Winner.push(BlockArray[position]);
                                      }
                                    }
                                    for (
                                      var l = 0;
                                      l < Winner[0].vout.length;
                                      l++
                                    ) {
                                      var addys =
                                        Winner[0].vout[l].scriptPubKey
                                          .addresses;
                                      if (addys) {
                                        WinnerAddys.push(addys);
                                      }
                                    }
                                    BlockWinner = WinnerAddys.join(' \n');
                                  }
                                  needle.get(
                                    explorerApiUrl +
                                      'api/block/' +
                                      prvsBlockHash,
                                    function(error, response) {
                                      if (response.statusCode !== 200) {
                                        msg.channel.send(
                                          getError(response.statusCode)
                                        );
                                      } else {
                                        var prvsTime = Number(
                                          response.body.time
                                        );
                                        var BlockTime = currentTime - prvsTime;
                                        var description =
                                          '**Current TESTNET Block!**' +
                                          '\n' +
                                          '__**Height**:__ ' +
                                          Height +
                                          '\n' +
                                          '__**Hash**:__\n' +
                                          BlockHash +
                                          '\n' +
                                          '__**Hashrate**:__' +
                                          hashrate +
                                          '\n' +
                                          '__**Difficulty**:__ ' +
                                          numberWithCommas(
                                            difficulty.toFixed(0)
                                          ) +
                                          '\n' +
                                          '__**Algo Hash**:__ ' +
                                          BlockAlgo +
                                          '\n' +
                                          '__**Algo Order**:__\n' +
                                          AlgoOrder +
                                          '\n' +
                                          '__**Solved by**:__ ' +
                                          BlockWinner +
                                          '\n' +
                                          '__**Solved in**:__ ' +
                                          BlockTime +
                                          ' seconds ' +
                                          '\n' +
                                          '__**Reward**:__ ' +
                                          numberWithCommas(Reward) +
                                          ' ' +
                                          coinSymbol +
                                          '\n' +
                                          '__**Transactions**__: ' +
                                          txs +
                                          '\n' +
                                          '__**Amount**__: ' +
                                          rvnSent +
                                          ' ' +
                                          coinSymbol +
                                          '\n' +
                                          '__**Fees**__: ' +
                                          rvnFees +
                                          ' ' +
                                          coinSymbol +
                                          '\n' +
                                          '__**Confirmations**:__ ' +
                                          numberWithCommas(confirmations) +
                                          '\n\n' +
                                          '__Sources:__\n' +
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
            });
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
*/
