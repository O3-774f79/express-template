const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const validator = require('../../validators')

router.get('/',controllers.onGetAll)
router.get('/:id', controllers.onGetById)
router.post('/', controllers.onInsert)
router.put('/:id', controllers.onUpdate)
router.delete('/:id', controllers.onDelete)
router.post('/login', controllers.onLogin)
router.post('/register', controllers.onRegister)
router.post('/refresh-token', controllers.onRefreshToken)

module.exports = router
