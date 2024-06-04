const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the banner
const BannerSchema = new Schema({
  title: { type: String, required: true },
  photo:[{ type: String ,required: true}],// URL of the banner photo
  details: { type: String },
  bannerUrl: { type: String, required: true } ,// URL associated with the banner
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {type: Boolean,default: false, },
});

// Create the model
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
