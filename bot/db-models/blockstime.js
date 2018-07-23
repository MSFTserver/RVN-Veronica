var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blockTimeSchema = new Schema({
  Height: {
    type: Number,
    required: true,
    unique: true
  },
  Time: {
    type: Number,
    required: true
  },
  Hashrate: {
    type: Number,
    required: true
  }
});
mongoose.model('blockTime', blockTimeSchema);
