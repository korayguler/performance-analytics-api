const mongoose = require('mongoose');

const MetricScheme = new mongoose.Schema({
  site: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  fcp: {
    type: Number,
    required: true,
  },
  ttfb: {
    type: Number,
    required: true,
  },
  dom_load: {
    type: Number,
    required: true,
  },
  window_load: {
    type: Number,
    required: true,
  },
  files: [
    {
      name: {
        type: String,
        required: true,
      },
      file_type: {
        type: String,
        required: true,
      },
      response_end: {
        type: Number,
        required: true,
      },
    },
  ],
  generated_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Metric', MetricScheme);
