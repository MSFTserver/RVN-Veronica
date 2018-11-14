var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assetOTCSchema = new Schema({
  assetOwnerID: {
    type: String,
    required: true
  },
  assetOwnerUsername: {
    type: String,
    required: true
  },
  assetName: {
    type: String,
    required: true,
    unique: true
  },
  assetType: {
    type: String,
    required: true
  },
  assetAdmin: {
    type: String,
    reuired: true
  },
  assetUnits: {
    type: String,
    required: true
  },
  assetQuantity: {
    type: String,
    required: true
  },
  assetReissuable: {
    type: String,
    required: true
  },
  assetIPFS: {
    type: String,
    required: true
  },
  assetPrice: {
    type: String,
    required: true
  }
});
mongoose.model('assetOTC', assetOTCSchema);
