const router = require('express').Router()
const controllers = require('../../controllers/rate.controller')

router.get('/',controllers.onGetAll)
router.get('/:id', controllers.onGetAll)

module.exports = router
