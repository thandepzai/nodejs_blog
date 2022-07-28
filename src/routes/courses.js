const express = require('express')
const router = express.Router()

const couseController = require('../app/controllers/CourseController')

//newsController.index
router.get('/create',couseController.create)
router.post('/store',couseController.store)
router.post('/handle-form-action',couseController.handleFormAction)
router.get('/:id/edit',couseController.edit)
router.patch('/:id/restore',couseController.restore)
router.put('/:id',couseController.update)
router.delete('/:id',couseController.delete)
router.delete('/:id/clear',couseController.clear)
router.get('/:slug',couseController.show)



module.exports = router
