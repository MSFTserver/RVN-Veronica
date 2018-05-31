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
        if (error || response.statusCode !== 200) {
          msg.channel.send(explorerApiUrl + ' API is not available');
        } else {
          var currentHeight = response.body.height;
          var previousheight = currentHeight - 1;
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
              if (error || response.statusCode !== 200) {
                msg.channel.send(explorerApiUrl + ' API is not available');
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
                    if (error || response.statusCode !== 200) {
                      msg.channel.send(
                        explorerApiUrl + ' API is not available'
                      );
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/block/' + previousBlockHash,
                        function(error, response) {
                          if (error || response.statusCode !== 200) {
                            msg.channel.send(
                              explorerApiUrl + ' API is not available'
                            );
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
                            bot.channels.get(TimedHashChannel).send({ embed });
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
        if (error || response.statusCode !== 200) {
          msg.channel.send(explorerApiUrl + ' API is not available');
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
              if (error || response.statusCode !== 200) {
                msg.channel.send(explorerApiUrl + ' API is not available');
              } else {
                var currentBlockHash = response.body.blockHash;
                needle.get(
                  explorerApiUrl + 'api/block-index/' + previousHeight,
                  function(error, response) {
                    if (error || response.statusCode !== 200) {
                      msg.channel.send(
                        explorerApiUrl + ' API is not available'
                      );
                    } else {
                      var previousBlockHash = response.body.blockHash;
                      needle.get(
                        explorerApiUrl + 'api/txs?block=' + currentHeight,
                        function(error, response) {
                          if (error || response.statusCode !== 200) {
                            msg.channel.send(
                              explorerApiUrl + ' API is not available'
                            );
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
                                if (error || response.statusCode !== 200) {
                                  msg.channel.send(
                                    explorerApiUrl + ' API is not available'
                                  );
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
                                        error ||
                                        response.statusCode !== 200
                                      ) {
                                        msg.channel.send(
                                          explorerApiUrl +
                                            ' API is not available'
                                        );
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
