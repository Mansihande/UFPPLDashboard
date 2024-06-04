const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the ourstaff
const OurStaffSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  photo:[{ type: String ,required: true}],
  details: { type: String, required: true },
  jobTitle: { type: String, required: true },
  customerForm: { type: Schema.Types.Mixed, required: true }, // Flexible structure for custom form
  status: {type: Boolean,default: false, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
OurStaffSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
// Create the model
const OurStaff = mongoose.model('OurStaff', OurStaffSchema);

module.exports = OurStaff;
