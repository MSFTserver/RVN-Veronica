`use strict`;
var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;
var pm2Schema = new Schema({
  metricName: {
    type: String,
    required: true
  },
  metric: {
    type: Number,
    required: true
  }
});
mongoose.model(`pm2`, pm2Schema);
