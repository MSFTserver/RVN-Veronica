const IPFS = require('ipfs');
const node = new IPFS();
let isIPFS = require('is-ipfs');
let moment = require('moment-timezone');
//start ipfs
node.on('ready', () => {
  var time = moment()
    .tz('America/Los_Angeles')
    .format('MM-DD-YYYY hh:mm a');
  console.log('[' + time + ' PST][veronica] IPFS Node started!');
});
exports.commands = ['ipfs'];

exports.ipfs = {
  usage: '**view** <ipfs-hash>',
  description:
    'Displays ipfs link to view decrypted hash\n**!ipfs create** <message>\n     Creates an ipfs hash with given message',
  process: function(bot, msg, suffix) {
    let words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var command = words[0];
    if (!words[1]) {
      doHelp(bot, msg);
      return;
    } else if (command == 'create') {
      var message = words.slice(1).join(' ');
      createIPFS(bot, msg, message);
      return;
    } else if (command == 'show') {
      var hash = words[1];
      if (!checkHash(hash)) {
        msg.channel.send('Invalid IPFS Hash!');
        return;
      }
      showIPFS(bot, msg, hash);
      return;
    } else {
      doHelp(bot, msg);
      return;
    }
    function createIPFS(bot, msg, message) {
      var res1 = message.split(' ');
      var res2 = res1.length;
      var res3 = message.length;
      var newPath =
        res1[0] + res1[1] + '' + (res2 / res3 * res3 ** res2).toFixed(0);
      node.files.add(
        {
          path: newPath.txt,
          content: Buffer.from(message)
        },
        function(err, filesAdded) {
          if (err) {
            msg.channel.send('error creating ipsf hash: ' + err);
          }
          fileMultihash = filesAdded[0].hash;
          msg.channel.send('`' + message + '` = ' + '`' + fileMultihash + '`');
          return;
        }
      );
    }
    function showIPFS(bot, msg, hash) {
      msg.channel.send('https://gateway.ipfs.io/ipfs/' + hash);
      return;
    }
    function doHelp(bot, msg) {
      msg.channel.send(
        '**!ipfs view** <ipfs-hash>\n     Displays ipfs link to view decrypted hash\n**!ipfs create** <message>\n     Creates an ipfs hash with given message'
      );
      return;
    }
    function checkHash(hash) {
      return isIPFS.multihash(hash);
    }
  }
};
