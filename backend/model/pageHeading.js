const mongoose = require('mongoose');

const PageHeadingSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    enum: ['product', 'service', 'blog', 'news', 'testimonial', 'banner', 'fqa', 'ourStaff']
  },
  heading: {
    type: String,
    required: true
  },
  subheading: {
    type: String
  }
});

module.exports = mongoose.model('PageHeadings', PageHeadingSchema);