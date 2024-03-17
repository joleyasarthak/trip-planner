const { getEvent, getInvitedEvents, createEvent, acceptEvent, rejectEvent, removeDecisionEvent } = require("../services/event.service")

const getEventsController = (req, res) => {
    getInvitedEvents(req.params.user)
    .then((data) => res.send(data))
    .catch(err => res.status(500).send(err))
}

const createEventController = (req, res) => {
    createEvent(req.body)
    .then(data => res.send(data))
    .catch(err => {console.log(err); res.status(500).send(err)})
}

const eventDecisionController = (req, res) => {
    if (req.body.action == "accept") {
        acceptEvent(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send(err))
    } else if (req.body.action == "reject") {
        rejectEvent(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send(err))
    } else {
        removeDecisionEvent(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send(err))
    }
}

module.exports = {
    getEventsController, createEventController, eventDecisionController
}

