const express = require('express');
const router = express.Router();
const { insertNews,getNews,updateNews, deleteNews } = require('../controller/news'); 
const { uploadPhoto } = require('../middleware/fileUpload');

router.post('/insertNews',uploadPhoto, insertNews);
router.get('/getNews' , getNews);
router.put('/updateNews',uploadPhoto,updateNews);
router.delete('/deleteNews', deleteNews);
module.exports = router;
