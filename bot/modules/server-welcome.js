let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let initialMessage = "Welcome to the developer.ravencoin.online Discord!\nAs a newcomer, you won't be able to participate for the next 5 minutes and until step 5 is completed.\nTake this time to look around and get your bearings straight."+
"\n\n"+
"What to do next while you wait."+
"\n\n"+
"1. Read through the <#553283886596227075>\n"+
"2. Familiarize yourself with all the channels on the left.\n"+
"3. When you click on the channel, make sure to read the description first before chatting and check all relative pins before asking for help, Remember to stay on topic!\n"+
"4. This discord is managed by Veronica.  Check out the available commands in <#553291891425411103>!\n"+
"5. Verify you are ready to join the community by pressing ✅ below to confirm!";
const roles = ["fam"];
const reactions = ["✅"];

exports.custom = ['onUserJoin'];
exports.onUserJoin = function(bot) {
  bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD'){
        let channel = bot.channels.get(event.d.channel_id);
        let msg = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        if (msg.author.id == bot.user.id && msg.content != `you will be assigned the role "fam" and you can then participate in the discussions`){
            var role = 'fam';
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj);
                } else {
                    return;
                }
            }
        }
      });
    }
  });
}

// exports.commands = ['welcome'];
//
// exports.welcome = {
//   usage: '',
//   description: ':desktop: :cop: send welcome message to channel :cop: :desktop:',
//   process: function(bot, msg) {
//     if (inPrivate(msg)) {
//       msg.channel.send('You Can Not use this command In DMs!');
//       return;
//     }
//     if (roles.length !== reactions.length) {
//     console.log("Roles list and reactions list are not the same length!");
//     return;
//     }
//     if (hasPerms(msg)){
//           var toSend = generateMessages();
//           let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (msg, idx) => [msg, reactions[idx]])];
//           for (let mapObj of mappedArray){
//               msg.channel.send(mapObj[0]).then( sent => {
//                   if (mapObj[1]){
//                     sent.react(mapObj[1]);
//                   }
//               });
//           }
//       }
//   	function generateMessages(){
//   		var messages = [];
//   		messages.push(initialMessage);
//   		for (let role of roles) messages.push(`you will be assigned the role **"fam"** and you can then participate in the discussions`); //DONT CHANGE THIS
//   		return messages;
//   	}
//   }
// }
