let findEntry = require('../db-helpers.js').findEntry;
let newEntry = require('../db-helpers.js').newEntry;
let updateEntry = require('../db-helpers.js').updateEntry;
let inSpam = require('../helpers.js').inSpam;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let channelID = config.get('General').Channels.botspam;

exports.commands = ['asset'];

exports.asset = {
  usage: '**list**',
  description:
    'Displays all raven assets forsale OTC\n     (optionally add asset name to return just that assets info)\n**!asset sell**, <assetName>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     provide all required info for asset seprated by commas!\n     Example: `!asset sell, VERONICA, Yes/No/True/False, Main/sub/unique, 0-8, 0, Yes/No/True/False, Yes/No/True/False/IPFShash, 10000 RVN`\n**!asset update**, <assetName>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     if you would like to update your assets info and not change other things use `d` in place of info to leave default from database\n     Example`!asset update, d, d, d, d, d, True, d, d`',
  process: function(bot, msg, suffix) {
    console.log('started asset list');
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
     if (words[0] == 'list') {
      assetList(bot,msg,suffix);
      return;
    } else if (words[0].toLowerCase() == 'sell,') {
      newAsset(bot, msg, suffix);
      return;
    } else if (words[0].toLowerCase() == 'update,') {
      updateAsset(bot, msg, suffix);
      return;
    } else {
      msg.channel.send('**!asset list**\n     Displays all raven assets forsale asset\n     (optionally add asset name to return just that assets info)\n**!asset sell**, <assetName>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     provide all required info for asset seprated by commas!\n     Example: `!asset sell, VERONICA, Yes/No/True/False, Main/sub/unique, 0-8, 0, Yes/No/True/False, Yes/No/True/False/IPFShash, 10000 RVN`\n**!asset update**, <assetName>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     if you would like to update your assets info and not change other things use `d` in place of info to leave default from database\n     Example`!asset update, d, d, d, d, d, True, d, d`');
      return;
    }

    function assetList(bot, msg, suffix) {
      var words = suffix
        .trim()
        .split(' ')
        .filter(function(n) {
          return n !== '';
        });
      if (!words[1]) {
        if (!inPrivate(msg) && !inSpam(msg)) {
          msg.channel.send(
            'Please use <#' + channelID + '> or DMs to talk to assets bot.'
          );
          return;
        }
        msg.channel.send('assets list sent via DM')
        findEntry(bot, msg, 'assetOTC', false, false, findAssets);
        function findAssets(bot, msg, docs) {
          var assets = []
          docs.forEach(function(results) {
            var Name = results.assetName;
            var hex = convert2Hex1(Name);
            function d2h(d) {
                return d.toString(16);
            }
            function convert2Hex1 (tmp) {
              var str = '',
                  i = 0,
                  tmp_len = tmp.length,
                  c;

              for (; i < tmp_len; i += 1) {
                  c = tmp.charCodeAt(i);
                  str += d2h(c) + ' ';
              }
              return str;
          }
            var Price = results.assetPrice;
            var createLink = '(' + Name + ')[https://www.assetsexplorer.com/asset/' + hex + '] : ' + Price;
            assets.push(createLink);
          });
          var message = assets.toString().replace(/,/g, '\n     ');
          msg.channel.send('__**Assets Listed**__\n     ' + message + '\n    use `!asset list <assetName>` to see info about specific asset.');
        }
      } else {
        if (!inPrivate(msg) && !inSpam(msg)) {
          msg.channel.send(
            'Please use <#' + channelID + '> or DMs to talk to assets bot.'
          );
          return;
        }
        findEntry(bot, msg, 'assetOTC', 'assetName', words[1], findAsset);
        function findAsset(bot, msg, docs) {
          if (!docs || !docs[0]) {
            return;
          } else {
            var OwnerID = docs[0].assetOwnerID;
            var Owner = docs[0].assetOwner;
            var Name = docs[0].assetName;
            var Admin = docs[0].assetAdmin;
            var Type = docs[0].assetType;
            var Units = docs[0].assetUnits;
            var Quantity = docs[0].assetQuantity;
            var Reissuable = docs[0].assetReissuable;
            var hasIPFS = docs[0].assetIPFS;
            var Price = docs[0].assetPrice;
            var hex = convert2Hex2(Name);
            function d2h(d) {
                return d.toString(16);
            }
            function convert2Hex2 (tmp) {
              var str = '',
                  i = 0,
                  tmp_len = tmp.length,
                  c;

              for (; i < tmp_len; i += 1) {
                  c = tmp.charCodeAt(i);
                  str += d2h(c) + ' ';
              }
              return str;
          }
            var message =
              'Lister Discord ID: ' + OwnerID +
              '\n(to verify you dm the correct person!)\n' +
              '   is !admin Asset: ' + Admin + '\n' +
              '   Type: ' + Type + '\n' +
              '__**PRICE**__: ' + Price + '\n' +
              '     Units: ' + Units + '\n' +
              '     Quantity: ' + Quantity + '\n' +
              '     Reissuable:' + Reissuable + '\n' +
              '     IPFS: ' + hasIPFS + '\n';
            msg.author.send({
              embed: {
                title: 'Lister: ' + Owner,
                description: message,
                color: 8995497,
                author: {
                  name: name,
                  url: 'https://www.assetsexplorer.com/asset/' + hex
                }
              }
            });
          }
        }
      }
    }

    function newAsset(bot, msg, suffix) {
      if (!inPrivate(msg) && !inSpam(msg)) {
        msg.channel.send('Please use <#' + channelID + '> to sell an asset.');
        return;
      }
      var words = suffix
        .trim()
        .split(',')
        .filter(function(n) {
          return n !== '';
        });
      if (!words[1] || !words[2] || !words[3] || !words[4] || !words[5] || !words[6] || !words[7] || !words[8]) {
        msg.channel.send(
          'provide all required info for asset seprated by commas! \n**!asset sell**, <assetName>, <!AdminAsset>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     provide all required info for asset seprated by commas!\n     Example: `!asset sell, VERONICA, Yes/No/True/False, Main/sub/unique, 0-8, 0, Yes/No/True/False, Yes/No/True/False/IPFShash, 10000 RVN`'
        );
        return;
      }
      findEntry(bot, msg, 'assetOTC', 'assetName', words[1], getAsset);
      function getAsset(bot, msg, docs) {
        if (!docs || !docs[0]) {
          var Name = words[1];
          var Admin = words[2]
          var Type = words[3];
          var Units = words[4];
          var Quantity = words[5];
          var Reissuable = words[6];
          var hasIPFS = words[7];
          var Price = words[8];
          var newAsset = {
            assetOwnerID: msg.author.id,
            assetOwner: msg.author.username,
            assetName: Name.trim(),
            assetAdmin: Admin.trim(),
            assetType: Type.trim(),
            assetUnits: Units.trim(),
            assetQuantity: Quantity.trim(),
            assetReissuable: Reissuable.trim(),
            assetIPFS: hasIPFS.trim(),
            assetPrice: Price,
          };
          newEntry(bot, msg, 'assetOTC', newAsset);
        } else {
          msg.channel.send( words[1] + ' already exists, if you own this asset please use update or remove.');
          return;
        }
      }
    }
    function updateAsset(bot, msg, suffix) {
      if (!inPrivate(msg) && !inSpam(msg)) {
        msg.channel.send('Please use <#' + channelID + '> to update an asset.');
        return;
      }
      var words = suffix
        .trim()
        .split(',')
        .filter(function(n) {
          return n !== '';
        });
        if (!words[1] || !words[2] || !words[3] || !words[4] || !words[5] || !words[6] || !words[7] || !words[8]) {
          msg.channel.send(
            'provide all required info for asset seprated by commas! \n**!asset update**, <assetName>, <!AdminAsset>, <assetType>, <assetUnits>, <assetQuantity>, <assetReissuable>, <assetIPFS>, <Price>\n     if you would like to update your assets info and not change other things use `d` in place of info to leave default from database\n     Example`!asset update, d, d, d, d, d, True, d, d`'
          );
          return;
        }
      findEntry(bot, msg, 'assetOTC', 'assetName', words[1], getAssetandUpdate);
      function getAssetandUpdate(bot, msg, docs) {
        if (!docs || !docs[0]) {
          msg.channel.send('no asset found in database with name: ' + words[1] )
        } else {
          if (docs[0].assetOwnerID != msg.author.id) {
            msg.channel.send(
              'only the entry creator can edit this assets info!'
            );
            return;
          }
          var OwnerID = docs[0].assetOwnerID;
          var Owner = docs[0].assetOwner;
          if (words[1].trim() == 'd') {
            var Name = docs[0].assetName;
          } else {
            var Name = words[1];
          }
          if (words[2].trim() == 'd') {
            var Admin = docs[0].assetAdmin;
          } else {
            var Admin = words[2];
          }
          if (words[3].trim() == 'd') {
            var Type = docs[0].assetType;
          } else {
            var Type = words[3];
          }
          if (words[4].trim() == 'd') {
            var Units = docs[0].assetUnits;
          } else {
            var Units = words[4];
          }
          if (words[5].trim() == 'd') {
            var Quantity = docs[0].assetQuantity;
          } else {
            var Quantity = words[5];
          }
          if (words[6].trim() == 'd') {
            var Reissuable = docs[0].assetReissuable;
          } else {
            var Reissuable = words[6];
          }
          if (words[7].trim() == 'd') {
            var hasIPFS = docs[0].assetIPFS;
          } else {
            var hasIPFS = words[7];
          }
          if (words[8].trim() == 'd') {
            var Price = docs[0].assetPrice;
          } else {
            var Price = words[8];
          }
          var updateAsset = {
            assetOwnerID: OwnerID,
            assetOwner: Owner,
            assetName: Name.trim(),
            assetAdmin: Admin.trim(),
            assetType: Type.trim(),
            assetUnits: Units.trim(),
            assetQunatity: Quantity.trim(),
            assetReissuable: Reissuable.trim(),
            assetIPFS: hasIPFS.trim(),
            assetPrice: Price
          };
          updateEntry(
            bot,
            msg,
            'assetOTC',
            'assetName',
            Name,
            updateAsset
          );
        }
      }
    }
}
};
