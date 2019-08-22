const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }]
}, { timestamps: true, versionKey: false });

module.exports = model('Dev', DevSchema);