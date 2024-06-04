const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  icons: { type: String, required: true },
  subCategories: [{
    category: { type: String },
    icons: { type: String },
    subSubCategory: [
      {
        category: { type: String },
        icons: { type: String },
      }
    ]
  }] 
});

module.exports = mongoose.model('Category', categorySchema);
