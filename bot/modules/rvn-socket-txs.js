let moment = require('moment-timezone');
let config = require('config');
let BlocksWonChannel = config.get('SocketBots').BlocksWonChannel;
let SocketUrl = config.get('SocketBots').SocketUrl;
let socketClient = require('socket.io-client');

exports.custom = ['socketBlocks'];

exports.socketBlocks = function(bot) {
  let eventToListenTo = 'raven/tx';
  let room = 'raven';
  let socket = socketClient(SocketUrl);
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  });
  socket.on(eventToListenTo, function(data) {
    //console.log(data);
    if (!data.isRBF){
      var vinAddresses = [];
      var voutAddresses = [];
      console.log(data.txid);
      console.log(data.valueOut);
      var vin = data.vin;
      var vout = data.vout;
      for (i=0; i < vin.length; i++) {
        vinAddresses.push(vin.address);
      }
      console.log(countDuplicates(vinAddresses));
      for (i=0; i < vout.length; i++) {
        voutAddy = new Object();
        voutAddy['address'] = vout.address
        voutAddy['amount'] = vout.value
        voutAddresses.push(voutAddy);
      }
      console.log(voutAddresses);
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm::ss a');
      // const embed = {
      //   description:
      //     'Won by [' +
      //     poolName +
      //     '](' +
      //     poolUrl +
      //     ')\n[View Block](' +
      //     SocketUrl +
      //     '/block/' +
      //     blockHash +
      //     ')',
      //   color: 7976557,
      //   footer: {
      //     text: 'Last Updated | ' + timestamp + ' PST'
      //   },
      //   author: {
      //     name: 'Block ' + blockHeight,
      //     icon_url: 'https://i.imgur.com/nKHVQgq.png'
      //   }
      // };
      //bot.channels.get(BlocksWonChannel).send({ embed });
  });
  function countDuplicates(names){
    const result = [...names.reduce( (mp, o) => {
      if (!mp.has(o.address)) mp.set(o.address, Object.assign({ count: 0 }, o));
      mp.get(o.address).count++;
      return mp;
    }, new Map).values()];
    return result;
  }
};
