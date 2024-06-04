const express = require("express");
const app = express();
const mongoose=require("mongoose");
const productRoute = require('./routes/product');
const servicesRoute = require('./routes/services');
const newsRoute = require('./routes/news');
const pageHeadingRoute = require('./routes/pageHeading');
const imagesRoute = require('./routes/image')
const testimonial = require('./routes/testinomial');
const cors = require("cors")
const serveStatic = require('serve-static');
const path = require('path');

app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
  const port = process.env.PORT || 3009;
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });

  app.use('/uploads', serveStatic(path.join(__dirname, '../images')));
  app.use(cors({
    origin:"*",
    credentials:true,
  }))
  
  app.use('/product',productRoute );
  app.use('/services',servicesRoute );
  app.use('/news',newsRoute)
  app.use('/pageHeading',pageHeadingRoute );
  app.use('/image',imagesRoute)
  app.use('/testimonial',testimonial)

  

  