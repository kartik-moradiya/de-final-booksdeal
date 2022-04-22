const express = require("express");
const catagoryCtrl = require('../controllers/catagoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express.Router();

router.get('/catagory' , catagoryCtrl.getCatagories)
router.post('/catagory' ,auth, authAdmin ,catagoryCtrl.createCatagories)
router.delete('/catagory/:id' ,auth, authAdmin ,catagoryCtrl.deleteCatagory)
router.put('/catagory/:id' ,auth, authAdmin ,catagoryCtrl.updateCatagory)

module.exports =router;
