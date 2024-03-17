const { getGroupsController, createGroupController, addToGroupController } = require('../controllers/group.controller')

const router = require('express').Router()

router.get('/:user', getGroupsController)

router.post('/', createGroupController) //users

router.post('/add', addToGroupController) //id, users

module.exports = router