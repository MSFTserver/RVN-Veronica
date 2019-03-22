let inSpam = require("../helpers.js").inSpam;
let inPrivate = require("../helpers.js").inPrivate;
let config = require("config");
let channelID = config.get("General").Channels.botspam;

exports.commands = ["8ball"];

exports["8ball"] = {
  usage: "<question?>",
  description: "answers yes or no question",
  process: function(bot, msg, suffix) {
    if (!inPrivate(msg) && !inSpam(msg)) {
      msg.channel.send(
        "Please use <#" + channelID + "> or DMs to talk to the Raven Gods."
      );
      return;
    }
    var question = suffix;
    if (suffix.slice(-1) != "?") {
      var question = suffix + "?";
    }
    const responses = [
      "it is certain",
      "it is decidedly so",
      "without a doubt",
      "yes — definitely",
      "you may rely on it",
      "as I see it, yes",
      "most likely",
      "outlook good",
      "yes",
      "signs point to yes",
      "reply hazy, try again",
      "ask again later",
      "better not tell you now",
      "cannot predict now",
      "concentrate and ask again",
      "don’t count on it",
      "my reply is no",
      "my sources say no",
      "outlook not so good",
      "very doubtful",
      "absolutely",
      "answer unclear ask later",
      "cannot foretell now",
      "can’t say now",
      "chances aren’t good",
      "consult me later",
      "don’t bet on it",
      "focus and ask again",
      "indications say yes",
      "looks like yes",
      "no",
      "no doubt about it",
      "positively",
      "prospect good",
      "so it shall be",
      "the stars say no",
      "unlikely",
      "very likely",
      "you can count on it",
      "As If",
      "Ask Me If I Care",
      "Dumb Question Ask Another",
      "Forget About It",
      "Get A Clue",
      "In Your Dreams",
      "Not",
      "Not A Chance",
      "Obviously",
      "Oh Please",
      "Sure",
      "That’s Ridiculous",
      "Well Maybe",
      "What Do You Think?",
      "Whatever",
      "Who Cares?",
      "Yeah And I’m The Pope",
      "Yeah Right",
      "You Wish",
      "You’ve Got To Be Kidding..."
    ];
    var doit = responses[Math.floor(responses.length * Math.random())];
    msg.channel.send(
      "<@" +
        msg.author.id +
        "> SCREAMS, **" +
        question +
        "**\nThe all mighty Raven Gods replied** " +
        doit +
        "**"
    );
  }
};
