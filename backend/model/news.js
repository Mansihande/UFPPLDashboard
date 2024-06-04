const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the News
const NewsSchema = new Schema ( {
    title: { type:String, required: true},
    date: {type:String , required:true},
    details: { type: String, required: true },
    photo:[{ type: String ,required: true}],
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

NewsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const News = mongoose.model('News', NewsSchema);

module.exports = News ;