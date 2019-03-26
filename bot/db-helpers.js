const mongoose = require(`mongoose`);
let probe = require(`pmx`).probe();
let moment = require(`moment-timezone`);
let config = require(`config`);
let { logChannel } = config.get(`moderation`);
let { pm2Name } = config.get(`General`);
exports.findEntry = function(bot, msg, useDB, keyName, valueName, callback) {
  var database = mongoose.model(useDB);
  try {
    mongoose.model(useDB);
  } catch (err) {
    console.log(err);
    return;
  }
  var key = keyName;
  var value = valueName;
  if (!key && !value) {
    var findKey = {};
  } else if (!key || !value) {
    var findKey = {};
  } else {
    var findKey = { [key]: value };
  }
  database.find(findKey, function(err, docs) {
    if (!docs || !docs[0]) {
      callback(bot, msg, !1);
    } else {
      callback(bot, msg, docs);
    }
  });
};
exports.newEntry = function(bot, msg, useDB, saveEntry) {
  var database = mongoose.model(useDB);
  var entry = new database(saveEntry);
  entry
    .save()
    .then(entry => {})
    .catch(err => {
      var time = moment()
        .tz(`America/Los_Angeles`)
        .format(`MM-DD-YYYY hh:mm a`);
      console.log(`[${time} PST][${pm2Name}] ERROR saving Entry:\n ${err}`);
    });
};
exports.updateEntry = function(bot, msg, useDB, keyName, valueName, saveEntry) {
  var key = keyName;
  var value = valueName;
  var updateKey = { [key]: value };
  var database = mongoose.model(useDB);
  database
    .updateOne(updateKey, { $set: saveEntry })
    .then(database => {})
    .catch(err => {
      var time = moment()
        .tz(`America/Los_Angeles`)
        .format(`MM-DD-YYYY hh:mm a`);
      console.log(`[${time} PST][${pm2Name}] ERROR Updating Entry:\n ${err}`);
    });
};
exports.dropdb = function(useDB) {
  mongoose.connection.db.dropCollection(useDB, function(err, result) {
    if (err) {
      console.log(`Error Deleting db : ${err}`);
    }
  });
};
exports.removeEntry = function(bot, msg, useDB, keyName, keyValue) {
  var key = keyName;
  var value = keyValue;
  var updateKey = { [key]: value };
  var database = mongoose.model(useDB);
  database.findOneAndRemove(updateKey, function(err, result) {
    if (err) {
      msg.channel.send(`Could not delete Entry: ${keyValue}`);
      return;
    }
    msg.channel.send(`entry Removed!`);
  });
};
exports.pm2MetricGet = function(pm2MetricName) {
  var pm2Metrics = mongoose.model(`pm2`);
  pm2Metrics.find({ metricName: pm2MetricName }, function(err, docs) {
    if (!docs || !docs[0]) {
      return;
    } else {
      probe.metric({
        name: pm2MetricName,
        value: function() {
          return docs[0].metric;
        }
      });
    }
  });
};
exports.pm2MetricSave = function(pm2MetricName) {
  var pm2Metric = mongoose.model(`pm2`);
  var time = moment()
    .tz(`America/Los_Angeles`)
    .format(`MM-DD-YYYY hh:mm a`);
  pm2Metric.find({ metricName: pm2MetricName }, function(err, docs) {
    if (!docs || !docs[0]) {
      var newMetric = new pm2Metric({ metricName: pm2MetricName, metric: 1 });
      newMetric
        .save()
        .then(newMetric => {
          var time = moment()
            .tz(`America/Los_Angeles`)
            .format(`MM-DD-YYYY hh:mm a`);
          console.log(
            `[${time} PST][${pm2Name}]` + ` Saved New Metric: ${pm2MetricName}`
          );
        })
        .catch(err => {
          var time = moment()
            .tz(`America/Los_Angeles`)
            .format(`MM-DD-YYYY hh:mm a`);
          console.log(
            `[${time} PST][${pm2Name}]` +
              ` ERROR saving Metric ${pm2MetricName}:\n${err}`
          );
        });
    } else {
      var counter = docs[0].metric + 1;
      var newMetric = { metric: counter };
      pm2Metric
        .updateOne({ metricName: pm2MetricName }, { $set: newMetric })
        .then(pm2Metric => {})
        .catch(err => {
          var time = moment()
            .tz(`America/Los_Angeles`)
            .format(`MM-DD-YYYY hh:mm a`);
          console.log(
            `[${time} PST][${pm2Name}]` +
              ` ERROR Updating metric ${pm2MetricName}:\n${err}`
          );
        });
    }
  });
};
