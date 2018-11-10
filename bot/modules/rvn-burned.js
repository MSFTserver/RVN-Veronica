let needle = require('needle');
let config = require('config');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;
let burn1 = 'RXissueAssetXXXXXXXXXXXXXXXXXhhZGt';
let burn2 = 'RXReissueAssetXXXXXXXXXXXXXXVEFAWu';
let burn3 = 'RXissueSubAssetXXXXXXXXXXXXXWcwhwL';
let burn4 = 'RXissueUniqueAssetXXXXXXXXXXWEAe58';
let burn = 'RXBurnXXXXXXXXXXXXXXXXXXXXXXWUo9FV';

exports.commands = ['burned'];

exports.burned = {
  usage: '',
  description: 'Displays current balance of Burned ' + coinSymbol,
  process: function(bot, msg, suffix) {
    words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (!inPrivate(msg) && !hasRvnCalcPriceChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to burned coins bot.'
      );
      return;
    }
    needle.get(explorerApiUrl + 'api/addr/' + burn + '/?noTxList=1', function(
      error,
      response
    ) {
      if (response.statusCode !== 200) {
        msg.channel.send(getError(response.statusCode));
      } else {
        var data = response.body;
        var balance = data.balance;
        needle.get(
          explorerApiUrl + 'api/addr/' + burn1 + '/?noTxList=1',
          function(error, response) {
            if (response.statusCode !== 200) {
              msg.channel.send(getError(response.statusCode));
            } else {
              var data = response.body;
              var balance1 = data.balance;
              needle.get(
                explorerApiUrl + 'api/addr/' + burn2 + '/?noTxList=1',
                function(error, response) {
                  if (response.statusCode !== 200) {
                    msg.channel.send(getError(response.statusCode));
                  } else {
                    var data = response.body;
                    var balance2 = data.balance;
                    needle.get(
                      explorerApiUrl + 'api/addr/' + burn3 + '/?noTxList=1',
                      function(error, response) {
                        if (response.statusCode !== 200) {
                          msg.channel.send(getError(response.statusCode));
                        } else {
                          var data = response.body;
                          var balance3 = data.balance;
                          needle.get(
                            explorerApiUrl +
                              'api/addr/' +
                              burn4 +
                              '/?noTxList=1',
                            function(error, response) {
                              if (response.statusCode !== 200) {
                                msg.channel.send(getError(response.statusCode));
                              } else {
                                var data = response.body;
                                var balance4 = data.balance;
                                var total = balance + balance1 + balance2 + balance3 + balance4;
                                var mainAssets = balance1 / 500;
                                var subAssets = balance3 / 100;
                                var uniqueAssets = balance4 / 5;
                                var reissues = balance2 / 100;
                                var description = '__**:fire:Ravencoin Burned!:fire:**__\n' +
                                  'General: [' +numberWithCommas(balance) +'](https://ravencoin.network/address/' + burn + ')\n' +
                                  'Main Asset: [' +numberWithCommas(balance1) +'](https://ravencoin.network/address/' + burn1 + ')\n' +
                                  'Sub Asset: [' +numberWithCommas(balance2) +'](https://ravencoin.network/address/' + burn2 + ')\n' +
                                  'Unique Asset: [' +numberWithCommas(balance3) +'](https://ravencoin.network/address/' + burn3 + ')\n' +
                                  'reissues: [' +numberWithCommas(balance4) +'](https://ravencoin.network/address/' + burn4 + ')\n\n' +
                                  '**Total Burned: ' + numberWithCommas(total) + '**\n\n' +
                                  '__**Asset Count**__\n' +
                                  'Main Assets: ' + numberWithCommas(mainAssets.toFixed(0)) + '\n' +
                                  'Sub Assets: ' + numberWithCommas(subAssets.toFixed(0)) + '\n' +
                                  'Unique Assets: ' + numberWithCommas(uniqueAssets.toFixed(0)) + '\n' +
                                  'Reissues: ' + numberWithCommas(reissues.toFixed(0));
                                  const embed = {
                                          description: description,
                                          color: 16734464
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
