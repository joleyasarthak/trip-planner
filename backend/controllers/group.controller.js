const { getGroup, getGroups, createGroup, addToGroup } = require("../services/group.service");

const createGroupController = (req, res) => {
    createGroup(req.body)
    .then((data) => {res.send(data)})
    .catch(err => res.status(500).send(err))
}

const addToGroupController = (req, res) => {
    addToGroup(req.body)
    .then(() => res.send("success"))
    .catch(err => res.status(500).send(err))
}

const getGroupsController = (req, res) => {
    getGroups(req.params.user)
    .then((data) => res.send(data))
    .catch(err => res.status(500).send(err))
}

module.exports = {
    createGroupController, addToGroupController, getGroupsController
}