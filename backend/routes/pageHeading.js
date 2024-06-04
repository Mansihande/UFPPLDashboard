const express = require('express');
const router = express.Router();

const {getpageHeading,updatePageHeading} = require('../controller/pageHeading') 

router.get('/heading',getpageHeading);
router.put('/updateHeading',updatePageHeading);

module.exports = router;