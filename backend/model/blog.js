const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = required("./category");
// Define the schema for the blog
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    photo: [{ type: String, required: true }],
    status: { type: Boolean, default: false },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  BlogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

// Create the model
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
