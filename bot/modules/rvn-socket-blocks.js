let moment = require('moment-timezone');
let config = require('config');
let BlocksWonChannel = config.get('SocketBots').BlocksWonChannel;
let SocketUrl = config.get('SocketBots').SocketUrl;
let io = require('socket.io-client')('SocketUrl');
let eventToListenTo = 'raven/block'
let room = 'raven'

exports.custom = [
    'socketBlocks'
]

exports.socketBlocks = function(bot) {
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  })
  socket.on(eventToListenTo, function(data) {
    console.log(data);
    var poolName = data.block.poolInfo.poolName;
    var poolUrl = data.block.poolInfo.url;
    var blockHeight = data.block.height;
    var blockHash = data.block.hash;
    bot.channels
      .get(BlocksWonChannel)
      .send('Block ' + blockHeight + ' Won by [' + poolName + '](' + poolUrl +') [View Block](' + SocketUrl + '/block/' + blockHash + ')');
  });
}
