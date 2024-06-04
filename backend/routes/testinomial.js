const express = require('express');
const router = express.Router();

const {insertTestimonial, getTestimonials, updateTestimonial,deleteTestimonial} = require('../controller/testimonial');
const { uploadPhoto } = require('../middleware/fileUpload');

router.post('/insertTestinomial',uploadPhoto , insertTestimonial);
router.get('/getTestimonial' , getTestimonials);
router.put('/updateTestimonial',uploadPhoto, updateTestimonial)
router.delete('/deleteTestimonial' , deleteTestimonial)
module.exports = router;