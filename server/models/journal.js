const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral'],
    default: 'neutral'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Journal', JournalSchema);
