var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blockTimeTNSchema = new Schema({
  Height: {
    type: Number,
    required: true,
    unique: true
  },
  Time: {
    type: Number,
    required: true
  },
  Diff: {
    type: Number,
    required: true
  },
  SolveTime: {
    type: Number,
  }
});
mongoose.model('blockTimeTN', blockTimeTNSchema);
