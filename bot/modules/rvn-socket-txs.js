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
      var vin = data.vin;
      var vout = data.vout;
      for (i=0; i < vin.length; i++) {
        vinAddy = new Object();
        vinAddy['address'] = vin[i].address
        vinAddresses.push(vinAddy);
      }
      var vinTrim = JSON.stringify(countDuplicates(vinAddresses));
      var newVin = vinTrim.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ");
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
        var voutString = JSON.stringify(newVoutAddresses);
        var newVout = voutString.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ");
        var dt = new Date();
        var timestamp = moment()
          .tz('America/Los_Angeles')
          .format('MM-DD-YYYY hh:mm::ss a');
          bot.channels.get(NewTxChannel).send({ embed: {
            description:
              '**txid**: '+ data.txid + '\n' +
              '**Total Amount**: '+data.valueOut + '\n' +
              '**vin**:\n    ' + newVin + '\n' +
              '**vout**:\n    ' + newVout +'\n'+
              (voutAddresses.length - 4) + ' More' + '\n\n'+
              '[View tx](' + SocketUrl + '/tx/' + data.txid + ')',
            color: 7976557,
            footer: {
              text: 'Last Updated | ' + timestamp + ' PST'
            },
            author: {
              name: 'New Transaction',
              icon_url: 'https://i.imgur.com/nKHVQgq.png'
            }
          }});
      } else {
        var voutString = JSON.stringify(voutAddresses);
        var newVout = voutString.replace(/\"/g, "").replace(/]/g, "").replace(/\[/g, "").replace(/{/g, "").replace(/}/g, "").replace(/address:/g, '').replace(/,/g, "\n    ");
        var dt = new Date();
        var timestamp = moment()
          .tz('America/Los_Angeles')
          .format('MM-DD-YYYY hh:mm::ss a');
          bot.channels.get(NewTxChannel).send({ embed: {
            description:
              '**txid**: ' + data.txid + '\n' +
              '**Total Amount**: '+data.valueOut + '\n' +
              '**vin**:\n    ' + newVin + '\n' +
              '**vout**:\n    ' + newVout +'\n\n'+
              '[View tx](' + SocketUrl + '/tx/' + data.txid + ')',
            color: 7976557,
            footer: {
              text: 'Last Updated | ' + timestamp + ' PST'
            },
            author: {
              name: 'New Transaction',
              icon_url: 'https://i.imgur.com/nKHVQgq.png'
            }
          }});
      }
    }
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
