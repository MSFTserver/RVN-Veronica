exports.commands = [`credits`];
exports.credits = {
  usage: ``,
  description: `credit to the men and women behind the bot!`,
  process: function(bot, msg) {
    const embed = {
      description: `this bot has been worked on by several people from various communities,I would like to thank the people that have contributed the most to the development of this awesome bot!\n`,
      color: `12262171`,
      fields: [
        {
          name: `Lead Dev`,
          value: `[MSFTserver](https://github.com/MSFTserver)`,
          inline: true
        },
        {
          name: `GitHub Repos`,
          value: `[Veronica](https://github.com/MSFTserver/RVN-Veronica)\n\n[TipBot](https://github.com/MSFTserver/TipBot)`,
          inline: false
        }
      ],
      footer: { text: `requested by ${msg.author.username}` },
      author: { name: `Discord Bot Credits!` }
    };
    msg.author.send({ embed });
  }
};
