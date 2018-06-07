let moment = require('moment-timezone');
let config = require('config');
let BlocksWonChannel = config.get('SocketBots').BlocksWonChannel;
let SocketUrl = config.get('SocketBots').SocketUrl;
let socketClient = require('socket.io-client');


exports.custom = [
    'socketBlocks'
]

exports.socketBlocks = function(bot) {
  console.log(SocketUrl);
  let eventToListenTo = 'raven/block'
  let room = 'raven'
  let socket = socketClient(SocketUrl);
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  })
  socket.on(eventToListenTo, function(data) {
    console.log(data);
    var poolName = data.block.poolInfo.poolName;
    var poolUrl = data.block.poolInfo.url;
    var blockHeight = data.block.height;
    var blockHash = data.block.hash;
    if (poolName) {
      bot.channels
        .get(BlocksWonChannel)
        .send('Block ' + blockHeight + ' Won by [' + poolName + '](' + poolUrl +') [View Block](' + SocketUrl + '/block/' + blockHash + ')');
    }
  });
}
