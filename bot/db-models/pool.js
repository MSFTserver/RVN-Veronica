var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var poolsSchema = new Schema({
  poolOwnerID: {
    type: String,
    required: true,
    unique: true
  },
  poolOwner: {
    type: String,
    required: true
  },
  poolName: {
    type: String,
    required: true,
    unique: true
  },
  poolURL: {
    type: String,
    required: true,
    unique: true
  },
  poolFee: {
    type: String,
    required: true
  },
  poolStratum: {
    type: String,
    required: true,
    unique: true
  },
  poolPort: {
    type: String,
    required: true
  },
  poolInfo: {
    type: String
  }
});
mongoose.model('pools', poolsSchema);
