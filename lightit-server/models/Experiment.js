const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  grade:        { type: String, required: true },
  subject:      { type: String, required: true },
  videoUrl:     { type: String },
  images:       [String],
  materials:    [String],
  procedure:    String,
  precautions:  String,
  results:      String,
  discussion:   String,
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName:  { type: String, required: true },
  visible:      { type: Boolean, default: true },

  status: {
    type: String,
    enum: ['pending','approved','rejected'],
    default: 'pending'
  },
  creatorName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Experiment', experimentSchema);
