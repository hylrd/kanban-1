const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/regis', userController.register )
router.post('/login', userController.login )
router.post('/gSignin', userController.gSignin )

module.exports = router