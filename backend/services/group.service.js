const Group = require('../models/group.model')
const { filterForUnique } = require('./general.service')

const getGroup = async (id) => {
    if (!id) {
        throw new Error("Incorect Input")
    }

    const group = await Group.findById(id)
    return group
}

const getGroups = async (user) => {
    if (!user) {
        throw new Error("Incorrect Input")
    }

    const groups = await Group.find({users: user})
    return groups
}

const createGroup = async (body) => {
    const users = body.users //include the author and everyone they're adding
    const groupName = body.name

    if (!(users && groupName)) {
        throw new Error("Incorect Input")
    }
    
    const newGroup = new Group()
    newGroup.name = groupName
    newGroup.users = [...users]

    return await newGroup.save()
}

const addToGroup = async (body) => {
    const users = body.users
    const invite = body.id
    
    if (!(users && invite)) {
        throw new Error("Incorect Input")
    }

    const group = await Group.findById(invite)
    group.users = filterForUnique(group.users, users)
    return await group.save()
}

module.exports = {
    createGroup, addToGroup, getGroup, getGroups
}