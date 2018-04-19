let fs = require('fs');
let moment = require('moment-timezone');
let Probe = require('pmx').probe();
let counter = 0;
let metric = Probe.metric({
  name: 'notes logged',
  value: function() {
    return counter;
  }
});

exports.commands = [
  'botmaster' // command name that will be used for next lines of code below
];

exports.botmaster = {
  usage: '<message for botmaster>', //command usage like !demo <@username>, exclude !demo
  description: 'leave a note for the bot masters', //the description of command for !help command
  process: function(bot, msg, suffix) {
    var logStream = fs.createWriteStream('Logs/Bot-Dev-Notes.txt', {
      flags: 'a'
    });
    var time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    logStream.write(
      '\r\n[' +
        time +
        ' PST][' +
        msg.channel.name +
        ']' +
        msg.author.username +
        ': ' +
        msg.content
    );
    counter++;
    msg.channel.send('Message has been logged for Bot Devs!');
  }
};
