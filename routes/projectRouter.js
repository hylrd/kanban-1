const router = require('express').Router()
const projectController = require('../controllers/projectController')
const authenticated = require('../middlewares/authenticated')

router.post('/', authenticated, projectController.add)
router.get('/', projectController.getAll)
router.post('/collab', projectController.collab)
router.delete('/user/:userId/:projectId', projectController.removeUser)
router.get('/:id', projectController.getListUser)
router.delete('/:id', projectController.remove)
router.put('/:id', projectController.update)

module.exports = router