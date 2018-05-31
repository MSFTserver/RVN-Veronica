let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let channelID = config.get('General').Channels.botspam;

exports.custom = ['onUserJoin'];
exports.onUserJoin = function(bot) {
  bot.on('guildMemberAdd', member => {
    member
      .send(
        'to start your experience off right in this discord id like to go over how our server is organized we are using a function in our bot where you guys can set your own roles to unlock more channels to join further into the community if you are looking to do more than just find general knowledge about the coin, heading over to our #bot-spam channel and using the command `!roles` you can see the roles you are allowed to set to yourself, these roles will unlock certain channels for your interests setting the `Fam` role is our base/unlock all channels roles for those want the full in-depth view of the community!'
      )
      .catch(function(error) {
        bot.channels
          .get(channelID)
          .send(
            member +
              ', Please enable Direct Messages from server members to communicate fully with our bot, it is located in the user setting area under Privacy & Safety tab, select the option allow direct messages from server members\nSince the bot could not send you our Welcome message please check the posts in <#429134369093845002> and available commands in <#429855347281494026>'
          );
      });
    member
      .send({
        embed: {
          title: '*Click here for more info about Raven!*',
          description:
            'This community allows Raven users to interact with the team directly and for us to engage users in order to grow Ravencoin ! \n\n' +
            ':red_circle: __**GROUND RULES**__:red_circle:\n' +
            '1. We welcome constructive criticism but have zero tolerance for aggressive or entitled demands. \n' +
            '2. Be respectful to other community members. Harassment will not be tolerated!! \n' +
            '3. Do not spam, advertise or post referral links outside of the respective provided channels! \n' +
            '4. Do bot beg for coins. \n' +
            '5. All software linked should be Open Source and we would appreciate them to be GitHub links for the communities safety. \n' +
            '6. No spamming or flooding the chat with messages or unsolicitated DMs.\n' +
            '7. Do not use the @ everyone / @ here ping without permission.\n' +
            '8. Do not cause a nuisance in the community, repeated complaints from several members will lead to administrative action.\n' +
            '9. Do not argue with staff. Decisions are final.\n' +
            '10. Impersonating a Staff member will result in an IMMEDIATE ban! \n' +
            '12. No inappropriate links, this INC: Screamer, Porn, NSFW or anything else of that nature.\n' +
            '13. Don\'t troll people asking for support\n' +
            '14. Do not reveal private information about any individuals or corporate entities. \n' +
            '15. Do not engage in any other excessively disruptive behavior.\n' +
            '16. if you have any issues with user feel free to reach out to either a Moderator(Red) or Admin(Green) \n' +
            '\n' +
            '__**Helpful hints & links**__\n' +
            '1. Type !tip help to interact with our Tipbot which can be used to send and receive Raven Coins (RVN). **Enable 2FA in your Discord account settings!** \n' +
            '2. Backing up your Raven wallet is your responsbility!\n' +
            '3. Are you a dev? Check out the #development channel and also use `!addrole Developer` \n' +
            '4. Check Pinned posts in each channel they provide relative and useful info to that channels topic',
          fields: [
            {
              name: 'Official Site',
              value: '[ravencoin.org](https://ravencoin.org/)',
              inline: true
            },
            {
              name: 'Bitcointalk ANN Thread',
              value:
                '[topic=3238497](https://bitcointalk.org/index.php?topic=3238497)',
              inline: true
            },
            {
              name: 'x16r Whitepaper',
              value:
                '[PDF File](https://ravencoin.org/wp-content/uploads/2018/01/X16R-Whitepaper.pdf)',
              inline: true
            },
            {
              name: 'Block Explorer',
              value: '[rvn.hash4.life](https://rvn.hash4.life/)',
              inline: true
            },
            {
              name: 'Raven Statistics',
              value: '[rvnstats.info](https://www.rvnstats.info/)',
              inline: true
            },
            {
              name: 'Wallets & Miners',
              value:
                '[Github Repo](https://github.com/MSFTserver/RavenCoin-Wallet-With-Miners/releases)',
              inline: true
            },
            {
              name: 'Ravencoin Wiki',
              value: '[raven.wiki mining](https://raven.wiki/wiki/Mining)',
              inline: true
            },
            {
              name: 'Community Forum',
              value: '[ravenforum](https://ravenforum.org/)',
              inline: true
            }
          ],
          url: 'https://bitcointalk.org/index.php?topic=3238497',
          color: 7976557,
          author: {
            name: 'Welcome to Raven Discord Community',
            icon_url: 'https://i.imgur.com/ZoakSOl.png'
          }
        }
      })
      .catch(function(error) {
        return;
      });
  });
};

exports.commands = [
  'welcome' // command that is in this file, every command needs it own export as shown below
];

exports.welcome = {
  usage: '<@username>',
  description:
    ':desktop: :cop: send welcome message to specified user :cop: :desktop:',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('command cannot be used in a DM');
      return;
    }
    if (suffix == '') {
      msg.channel.send('no user defined');
      return;
    }
    if (!hasPerms(msg)) {
      msg.channel.send('You Dont Have Permission To Use This Command!');
      return;
    }
    msg.mentions.members
      .first()
      .send(
        'to start your experience off right in this discord id like to go over how our server is organized we are using a function in our bot where you guys can set your own roles to unlock more channels to join further into the community if you are looking to do more than just find general knowledge about the coin, heading over to our #bot-spam channel and using the command `!roles` you can see the roles you are allowed to set to yourself, these roles will unlock certain channels for your interests setting the `Fam` role is our base/unlock all channels roles for those want the full in-depth view of the community!'
      )
      .catch(function(error) {
        msg.channel.send(
          msg.mentions.members.first() +
            ', Please enable Direct Messages from server members to communicate fully with our bot, it is located in the user setting area under Privacy & Safety tab, select the option allow direct messages from server members'
        );
      });
    msg.mentions.members
      .first()
      .send({
        embed: {
          title: '*Click here for more info about Raven!*',
          description:
          'This community allows Raven users to interact with the team directly and for us to engage users in order to grow Ravencoin ! \n\n' +
          ':red_circle: __**GROUND RULES**__:red_circle:\n' +
          '1. We welcome constructive criticism but have zero tolerance for aggressive or entitled demands. \n' +
          '2. Be respectful to other community members. Harassment will not be tolerated!! \n' +
          '3. Do not spam, advertise or post referral links outside of the respective provided channels! \n' +
          '4. Do bot beg for coins. \n' +
          '5. All software linked should be Open Source and we would appreciate them to be GitHub links for the communities safety. \n' +
          '6. No spamming or flooding the chat with messages or unsolicitated DMs.\n' +
          '7. Do not use the @ everyone / @ here ping without permission.\n' +
          '8. Do not cause a nuisance in the community, repeated complaints from several members will lead to administrative action.\n' +
          '9. Do not argue with staff. Decisions are final.\n' +
          '10. Impersonating a Staff member will result in an IMMEDIATE ban! \n' +
          '12. No inappropriate links, this INC: Screamer, Porn, NSFW or anything else of that nature.\n' +
          '13. Don\'t troll people asking for support\n' +
          '14. Do not reveal private information about any individuals or corporate entities. \n' +
          '15. Do not engage in any other excessively disruptive behavior.\n' +
          '16. if you have any issues with user feel free to reach out to either a Moderator(Red) or Admin(Green) \n' +
          '\n' +
          '__**Helpful hints & links**__\n' +
          '1. Type !tip help to interact with our Tipbot which can be used to send and receive Raven Coins (RVN). **Enable 2FA in your Discord account settings!** \n' +
          '2. Backing up your Raven wallet is your responsbility!\n' +
          '3. Are you a dev? Check out the #development channel and also use `!addrole Developer` \n' +
          '4. Check Pinned posts in each channel they provide relative and useful info to that channels topic',
          fields: [
            {
              name: 'Official Site',
              value: '[ravencoin.org](https://ravencoin.org/)',
              inline: true
            },
            {
              name: 'Bitcointalk ANN Thread',
              value:
                '[topic=3238497](https://bitcointalk.org/index.php?topic=3238497)',
              inline: true
            },
            {
              name: 'x16r Whitepaper',
              value:
                '[PDF File](https://ravencoin.org/wp-content/uploads/2018/01/X16R-Whitepaper.pdf)',
              inline: true
            },
            {
              name: 'Block Explorer',
              value: '[threeeyed.info](http://threeeyed.info/)',
              inline: true
            },
            {
              name: 'Raven Statistics',
              value: '[rvnstats.info](https://www.rvnstats.info/)',
              inline: true
            },
            {
              name: 'Wallets & Miners',
              value:
                '[Github Repo](https://github.com/MSFTserver/RavenCoin-Wallet-With-Miners/releases)',
              inline: true
            },
            {
              name: 'Ravencoin Wiki',
              value: '[raven.wiki mining](https://raven.wiki/wiki/Mining)',
              inline: true
            },
            {
              name: 'Community Forum',
              value: '[ravenforum](https://ravenforum.org/)',
              inline: true
            }
          ],
          url: 'https://bitcointalk.org/index.php?topic=3238497',
          color: 7976557,
          author: {
            name: 'Welcome to Raven Discord Community',
            icon_url: 'https://i.imgur.com/ZoakSOl.png'
          }
        }
      })
      .catch(function(error) {
        return;
      });
  }
};
