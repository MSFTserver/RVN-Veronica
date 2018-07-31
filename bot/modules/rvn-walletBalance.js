let needle = require('needle');
let config = require('config');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['address'];

exports.address = {
  usage: '<Address>',
  description:
    'Displays current balance of ' + coinSymbol + ' address supplied',
  process: function(bot, msg, suffix) {
    words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (
      words[0] == 'dev' ||
      words[0] == 'devfund' ||
      words[0] == 'development' ||
      words[0] == 'legal' ||
      words[0] == 'legalfund'
    ) {
      if (words[0] == 'dev' || words[0] == 'devfund' || words[0] == 'development') {
        var address = 'rEgfYH2ed8a3Age6qLuhXeLvSUJU4Q3sBE';
      } else if (words[0] == 'legal' || words[0] == 'legalfund') {
        var address = 'rVFHXEu91BXK4NDaGGudjqBGdaWsaAK9Eg';
      }
    } else {
      var address = words[0];
    }
    if (!inPrivate(msg) && !hasRvnCalcPriceChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to balance bot.'
      );
      return;
    }
    if (address == undefined) {
      msg.channel.send('please supply a address!');
      return;
    }
    needle.get(
      explorerApiUrl + 'api/addr/' + address + '/?noTxList=1',
      function(error, response) {
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
          var data = response.body;
          var balance = data.balance;
          var totalReceived = data.totalReceived;
          var totalSent = data.totalSent;
          var unconfirmedBalance = data.unconfirmedBalance;
          var txApperances = data.txApperances;
          if (unconfirmedBalance > 0) {
            var unconfirmedTxApperances = data.unconfirmedTxApperances;
            var description =
              'Details for **' +
              address +
              '**\n' +
              'Balance: **' +
              numberWithCommas(balance) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Received: **' +
              numberWithCommas(totalReceived) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Sent: **' +
              numberWithCommas(totalSent) +
              ' ' +
              coinSymbol +
              '**\n\n' +
              '# of tx: **' +
              numberWithCommas(txApperances) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Unconfirmed Balance: **' +
              numberWithCommas(unconfirmedBalance) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Unconfirmed # of tx: **' +
              numberWithCommas(unconfirmedTxApperances) +
              '**';
          } else {
            var description =
              'Details for **' +
              address +
              '**\n' +
              'Balance: **' +
              numberWithCommas(balance) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Received: **' +
              numberWithCommas(totalReceived) +
              ' ' +
              coinSymbol +
              '**\n' +
              'Sent: **' +
              numberWithCommas(totalSent) +
              ' ' +
              coinSymbol +
              '**\n' +
              '# of tx: **' +
              numberWithCommas(txApperances) +
              '**';
          }
          msg.channel.send(description);
          return;
        }
      }
    );
    const numberWithCommas = x => {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };
  }
};
