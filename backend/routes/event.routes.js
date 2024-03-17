const { getEventsController, createEventController, eventDecisionController } = require('../controllers/event.controller')

const router = require('express').Router()

// input:
// user param
router.get('/:user', getEventsController)

// author_id
// date_expected
// location
// title
// description
// status => EVENT/ACTIVITY
// invited => [list of ids]
router.post('/', createEventController)

// action => accept, reject, remove
// id (user_id)
// event (event_id)
router.post('/decide', eventDecisionController)

module.exports = router