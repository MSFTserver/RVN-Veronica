var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  accUserID: {
    type: String,
    required: true,
    unique: true
  },
  accUsername: {
    type: String,
    required: true
  },
  accDiscriminator: {
    type: String,
    required: true
  },
  accAvatar: {
    type: String
  },
  accJoinedDate: {
    type: String
  },
  accCreatedDate: {
    type: String
  },
  accRep: {
    type: Number
  }
});
mongoose.model('users', usersSchema);
