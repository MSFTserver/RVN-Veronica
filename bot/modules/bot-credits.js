exports.commands = ['credits'];

exports.credits = {
  usage: '',
  description: 'credits to the men and women behind the bot!',
  process: function(bot, msg) {
    const embed = {
      description:
        'this bot has been worked on by several people from various communities, we would like to thank the people that have contributed the most to the development of this awesome bot!\n\n **Donate**\nif you like this bot and want to support its future development and fund the server to keep this thing going 24/7 with minimal down time please send your raven donations to the address below, every little bit helps to keep this server up and running!\n\n__**Bot-Dev Fund**__: [RR4iGJQfnduhnc3ZPNpjJBFPtSq5adcn33](https://rvn.hash4.life/address/RR4iGJQfnduhnc3ZPNpjJBFPtSq5adcn33)\n\n',
      color: '12262171',
      fields: [
        {
          name: 'Lead Dev',
          value: '[MSFTserver](https://github.com/MSFTserver)',
          inline: true
        },
        {
          name: 'Original Lead Dev',
          value: '[filipnyquist](https://github.com/filipnyquist)',
          inline: true
        },
        {
          name: 'Help Crew',
          value:
            '[nikooo777](https://github.com/nikooo777)\n[Coolguy3289](https://github.com/Coolguy3289)',
          inline: true
        },
        {
          name: 'GitHub Repos',
          value:
            '[rvnButler-Discord-Bot](https://github.com/MSFTserver/rvnButler-Discord-Bot)\n\n[TipBot](https://github.com/MSFTserver/TipBot)',
          inline: false
        }
      ],
      footer: {
        text: 'requested by ' + msg.author.username
      },
      author: {
        name: 'Discord Bot Credits!'
      }
    };
    msg.channel.send({ embed });
  }
};
