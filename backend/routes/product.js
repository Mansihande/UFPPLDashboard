const express = require('express');
const router = express.Router();
const {insertProduct,updateProduct,deleteProduct,getAllProducts,getSingleProduct,getCategoryProducts,getSubcategoryProducts,getSubSubcategoryProducts}= require('../controller/product')
const {uploadPhoto} = require('../middleware/fileUpload')
const {insertCategory,insertSubCategory,insertSubSubCategory,updateCategory,updateSubCategory,updatesubsubcategory,deletecategory,deletesubcategory,deletesubsubcategory,getAll,getSpecificCategory,getSpecificSubcategory,getSpecificSubSubcategory}= require('../controller/category')


router.post('/insertProduct',uploadPhoto,insertProduct);
router.get('/getAllProducts',getAllProducts)
router.put('/updateProduct', uploadPhoto, updateProduct);
router.delete('/deleteProduct',deleteProduct);
router.get('/getSingleProduct',getSingleProduct)
router.get('/getCategoryProducts',getCategoryProducts)
router.get('/getSubcategoryProducts',getSubcategoryProducts)
router.get('/getSubSubcategoryProducts',getSubSubcategoryProducts)


router.post('/insertCategory',insertCategory)
router.post('/insertSubCategory',insertSubCategory)
router.post('/insertSubSubCategory',insertSubSubCategory)
router.put('/updateCategory',updateCategory)
router.put('/updateSubCategory',updateSubCategory)
router.put('/updatesubsubcategory',updatesubsubcategory)
router.delete('/deletecategory',deletecategory)
router.delete('/deletesubcategory',deletesubcategory)
router.delete('/deletesubsubcategory',deletesubsubcategory)
router.get('/getAll',getAll)
router.get('/getSpecificCategory',getSpecificCategory)
router.get('/getSpecificSubcategory',getSpecificSubcategory)
router.get('/getSpecificSubSubcategory',getSpecificSubSubcategory)
module.exports = router;