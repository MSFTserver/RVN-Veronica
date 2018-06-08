let moment = require('moment-timezone');
let config = require('config');
let NewTxChannel = config.get('SocketBots').NewTxChannel;
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
    if (!data.isRBF){
      var vinAddresses = [];
      var voutAddresses = [];
      console.log('txid: '+data.txid);
      console.log('Total Amount: '+data.valueOut);
      var vin = data.vin;
      var vout = data.vout;
      for (i=0; i < vin.length; i++) {
        vinAddy = new Object();
        vinAddy['address'] = vin[i].address
        vinAddresses.push(vinAddy);
      }
      var test = JSON.stringify(countDuplicates(vinAddresses));
      var test2 = test.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ")
      console.log('vin:\n    ' + test2);
      for (l=0; l < vout.length; l++) {
        voutAddy = new Object();
        voutAddy['address'] = vout[l].address
        voutAddy['amount'] = vout[l].value / 100000000
        voutAddresses.push(voutAddy);
      }
      if (voutAddresses.length > 4){
        var newVoutAddresses = [];
        for (m=0; m < 4; m++){
          var voutObject = new Object();
          voutObject['address'] = voutAddresses[m].address
          voutObject['amount'] = voutAddresses[m].amount
          newVoutAddresses.push(voutObject);
        }
        var test3 = JSON.stringify(newVoutAddresses);
        var test4 = test3.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ")
        console.log('vout:\n    ' + test4 +'\n'+ (voutAddresses.length - 4) + ' More');
      } else {
        var test5 = JSON.stringify(voutAddresses);
        var test6 = test5.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ")
        console.log('vout:\n    ' + test6);
      }
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
      //bot.channels.get(NewTxChannel).send({ embed });
  });
  function countDuplicates(names){
    const result = [...names.reduce( (mp, o) => {
      if (!mp.has(o.address)) mp.set(o.address, Object.assign(o, { inputs: 0 }));
      mp.get(o.address).inputs++;
      return mp;
    }, new Map).values()];
    return result;
  }
};
