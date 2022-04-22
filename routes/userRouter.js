const router = require("express").Router();
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.refreshToken)

router.get('/logout', userCtrl.logout)

router.get('/infor', auth ,  userCtrl.getUser)

router.get('/history', auth ,  userCtrl.history)

router.patch('/addcart', auth ,  userCtrl.addCart)
module.exports = router