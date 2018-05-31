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

exports.commands = ['network'];

exports.network = {
  usage: '',
  description: 'Displays current Network Stats',
  process: function(bot, msg) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to hash bot.'
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
            '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Request Entity Too Large'
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
          msg.channel.send('<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked');
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
            '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
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
            '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bandwidth Limit Exceeded'
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
        var currentHeight = Number(response.body.info.blocks);
        var previousHeight = Number(response.body.info.blocks) - 1;
        var difficulty = Number(response.body.info.difficulty);
        needle.get(
          explorerApiUrl + 'api/block-index/' + currentHeight,
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
                  '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
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
              var currentBlockHash = response.body.blockHash;
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
                        '<' +
                          explorerApiUrl +
                          '>' +
                          ' ERROR: ' +
                          'Not Implemented'
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
                    var previousBlockHash = response.body.blockHash;
                    needle.get(
                      explorerApiUrl + 'api/txs?block=' + currentHeight,
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
                                var currentTime = Number(response.body.time);
                                var currentReward = Number(
                                  response.body.reward
                                );
                                var currentBlockAlgo = currentBlockHash.substr(
                                  currentBlockHash.length - 16
                                );
                                var currentAlgo = currentBlockAlgo.split('');
                                var currentAlgoOrder =
                                  algolist1[currentAlgo[0]] +
                                  '->' +
                                  algolist1[currentAlgo[1]] +
                                  '->' +
                                  algolist1[currentAlgo[2]] +
                                  '->' +
                                  algolist1[currentAlgo[3]] +
                                  '->' +
                                  algolist1[currentAlgo[4]] +
                                  '->' +
                                  algolist1[currentAlgo[5]] +
                                  '->' +
                                  algolist1[currentAlgo[6]] +
                                  '->' +
                                  algolist1[currentAlgo[7]] +
                                  '->\n' +
                                  algolist1[currentAlgo[8]] +
                                  '->' +
                                  algolist1[currentAlgo[9]] +
                                  '->' +
                                  algolist1[currentAlgo[10]] +
                                  '->' +
                                  algolist1[currentAlgo[11]] +
                                  '->' +
                                  algolist1[currentAlgo[12]] +
                                  '->' +
                                  algolist1[currentAlgo[13]] +
                                  '->' +
                                  algolist1[currentAlgo[14]] +
                                  '->' +
                                  algolist1[currentAlgo[15]];
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
                                      var currentBlockTime =
                                        currentTime - previousTime;
                                      var description =
                                        'Difficulty: ' +
                                        numberWithCommas(
                                          difficulty.toFixed(0)
                                        ) +
                                        '\n' +
                                        '__**Current Block!**__' +
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
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
