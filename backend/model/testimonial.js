const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the testimonial
const TestimonialSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  photo:[{ type: String ,required: true}],
  status: {type: Boolean,default: false, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

TestimonialSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
// Create the model
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;
