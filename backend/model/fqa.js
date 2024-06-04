const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the FAQ
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  status: {type: Boolean,default: false, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 
});

FAQSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = FAQ;