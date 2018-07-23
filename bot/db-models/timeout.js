var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timeoutSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  timer: {
    type: Number,
    required: true
  },
  times: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});
mongoose.model('timeout', timeoutSchema);
