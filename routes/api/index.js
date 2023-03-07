const router = require('express').Router()

router.use('/rate',require('./rate'))
router.get('/test', (req,res)=>res.json({"mesage":"success"}))
module.exports = router