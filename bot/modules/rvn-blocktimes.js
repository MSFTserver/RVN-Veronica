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
  let msg = null;
  let eventToListenTo = 'raven/block';
  let room = 'raven';
  let socket = socketClient(SocketUrl);
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  });
  socket.on(eventToListenTo, function(data) {
    var blockHeight = data.block.height;
    var lastHeight = blockHeight - 1;
    var blockHash = data.block.hash;
    var blockTime = data.block.time;
    var changedDiff = blockHeight / 2016;
    var changeOnBlock = (Math.floor(changedDiff) + 1) * 2016;
    if (blockHeight == changeOnBlock){
      dropdb('blockTime');
    }
    console.log(data);
    var BlockTimeLog = {
      Height: blockHeight,
      Time: blockTime,
      Hashrate: blockHash,
      SolveTime: null
    };
    newEntry(bot, msg, 'blockTime',  BlockTimeLog);
    console.log(BlockTimeLog);
    findEntry(bot, msg, 'blockTime', 'Height', lastHeight, findLastBlock);
    function findLastBlock(bot, msg, docs) {
      if (docs){
      var lastTime = docs[0].Time;
      var SolveTime = lastTime - blockTime;
      if (lastTime) {
        var SolvedIn = {
          SolveTime: SolveTime
        };
        updateEntry(bot, msg, 'blockTime', 'Height', lastHeight, SolvedIn);
        console.log(lastHeight);
        console.log(SolvedIn);
      }
    }
    }
  });
};
