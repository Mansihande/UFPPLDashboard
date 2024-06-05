// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  photo:[{ type: String ,required: true}],
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: false },
  categories: [{ type: String, ref: 'Category' }],
  subcategories: [{ type: String, ref: 'Category' }],
  subSubcategories: [{ type: String, ref: 'Category' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

  
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;