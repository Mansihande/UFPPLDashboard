const express = require('express');
const router = express.Router();
const {insertProduct}= require('../controller/product')
const {uploadPhoto} = require('../middleware/fileUpload')
const {insertCategory,updateCategory,updateSubCategory,updatesubsubcategory,deletecategory,deletesubcategory,deletesubsubcategory,getAll,getSpecificCategory,getSpecificSubcategory}= require('../controller/category')


router.post('/insertProduct',uploadPhoto,insertProduct);
// router.get('/getService',getService)
// router.put('/updateService', uploadPhoto, updateService);
// router.delete('/deleteService',deleteService);
// router.get('/singleService',getServiceById)

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