
let generateShortId;

(async () => {
  const { customAlphabet } = await import('nanoid');
  generateShortId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
})();

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    default: () => generateShortId(),
    index: true
  },
  
  username: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 3
  },

  email: {
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);