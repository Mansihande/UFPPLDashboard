const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the service
const ServiceSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  photo:[{ type: String ,required: true}],
  status: { type: String, required: true },
  icons: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ServiceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
// Create the model
const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
 