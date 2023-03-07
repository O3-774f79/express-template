const router = require('express').Router()
// const auth = require('../auth')

router.use('/users', require('./user'))
router.use('/posts',require('./post'))
router.get('/test', (req,res)=>res.json({"mesage":"success"}))
module.exports = router