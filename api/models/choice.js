'use strict';
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  text: {
    type: String,
    default: 'Antwort'
  },
  correct: {
    type: Boolean,
    default: false
  },
  feedback: String,
  feedback_right: String,
  feedback_wrong: String
});
