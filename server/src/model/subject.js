const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
