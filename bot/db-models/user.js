`use strict`;
var mongoose = require(`mongoose`);
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
  accAvatar: String,
  accJoinedDate: Number,
  accCreatedDate: Number,
  accRep: Number,
  lastMsg: {
    msgTime: Number,
    msgID: String,
    msgChan: String,
    msgCont: String
  },
  lastCMD: {
    cmdTime: Number,
    cmdID: String,
    cmdChan: String,
    cmdCont: String
  }
});
mongoose.model(`users`, usersSchema);
