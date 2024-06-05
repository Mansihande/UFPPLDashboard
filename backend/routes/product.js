const express = require('express');
const router = express.Router();
const {insertService,getService,updateService,deleteService,getServiceById} = require('../controller/services') 
const {uploadPhoto} = require('../middleware/fileUpload')
const {insertCategory,updateCategory,updateSubCategory,updatesubsubcategory,deletecategory,deletesubcategory,deletesubsubcategory,getAll,getSpecificCategory,getSpecificSubcategory}= require('../controller/category')


router.post('/insertService',uploadPhoto,insertService);
router.get('/getService',getService)
router.put('/updateService', uploadPhoto, updateService);
router.delete('/deleteService',deleteService);
router.get('/singleService',getServiceById)

router.post('/insertCategory',insertCategory)
router.put('/updateCategory',updateCategory)
router.put('/updateSubCategory',updateSubCategory)
router.put('/updatesubsubcategory',updatesubsubcategory)
router.delete('/deletecategory',deletecategory)
router.delete('/deletesubcategory',deletesubcategory)
router.delete('/deletesubsubcategory',deletesubsubcategory)
router.get('/getAll',getAll)
router.get('/getSpecificCategory',getSpecificCategory)
router.get('/getSpecificSubcategory',getSpecificSubcategory)
module.exports = router;