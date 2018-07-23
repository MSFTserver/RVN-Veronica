let moment = require('moment-timezone');
let config = require('config');
let BlocksWonChannel = config.get('SocketBots').BlocksWonChannel;
let SocketUrl = config.get('SocketBots').SocketUrl;
let socketClient = require('socket.io-client');
let findEntry = require('../db-helpers.js').findEntry;
let newEntry = require('../db-helpers.js').newEntry;
let updateEntry = require('../db-helpers.js').updateEntry;
let dropdb = require('../db-helpers.js').dropdb;

exports.custom = ['BlockTimes'];

exports.BlockTimes = function(bot) {
  let eventToListenTo = 'raven/block';
  let room = 'raven';
  let socket = socketClient(SocketUrl);
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  });
  socket.on(eventToListenTo, function(data) {
    var poolName = data.block.poolInfo.poolName;
    var poolUrl = data.block.poolInfo.url;
    var blockHeight = data.block.height;
    var blockHash = data.block.hash;
    var changedDiff = blockHeight / 2016;
    var changeOnBlock = (Math.floor(changedDiff) + 1) * 2016;
    /*
    var BlockTimeLog = {
      Height: blockHeight,
      Time: ,
      Hashrate: blockHash,
    };
    newEntry(bot, msg, 'blockTime',  BlockTimeLog)
    if (blockHeight > changeOnBlock - 1){
      dropdb('blocktime');
    }
    */
    console.log(data);
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm::ss a');
  });
};
