const User = require('../models/user.model')

const createUser = async (body)=>{
    const email = body.email
    const name = body.name  
    const password = body.password
    if (!(email && name && password)){
        throw new Error ("Incorrect Input")
    }

    const newUser = new User({
        email: email,
        name: name,
        password: password,
        _id: name
    })
    console.log(newUser)
    return await newUser.save()
}

const getAllUser = async () => {
    const users = await User.find({})
    return users
}

const getUser = async (id)=>{ //parameter should be string of the id??
    const user = await User.findById(id)
    return user
}
const getUserByEmail = async (email) => {
    const user = await User.findOne({email: email})
    return user
}
const getUsers = async (users)=>{ //parameter should be string of the id??
    if (!users) {
        throw new Error("Incorrect Input")
    }

    const usersArray = [];

    for (let user in users){
        usersArray.push(await User.findById(users[user]))                
    }

    // const users = await Group.find({users: id})
    return usersArray
}

const sendFriendRequest = async (senderId, receiverId)=>{ //parameter should be string of the id??
    if (senderId == receiverId){
        throw new Error("Cannot send a friend request to yourself")
    }
    
    const sender = await User.findById(senderId)
    const receiver = await User.findById(receiverId)
    
    if (!receiver){
        throw new Error("User not found") //idk if u need this
    }

    if (receiver.friendRequestReceived.includes(sender)){
        throw new Error ("Already requested")
    }
    if (receiver.friends.includes(senderId)){
        throw new Error ("Already friends")
    }

    receiver.friendRequestReceived.push(senderId)
    sender.friendRequestSent.push (receiverId)

    await receiver.save()
    return await sender.save()

    //friend request received of the other user
    //update friend request sent array
    //if friend request does not exist, return error
}
const acceptFriendRequest = async (senderId, receiverId)=>{ //parameter should be string of the id??
    const sender = await User.findById(senderId)
    const receiver = await User.findById(receiverId)
    sender.friendRequestSent.filter(elt => elt != receiverId)
    receiver.friendRequestReceived.filter(elt => elt != senderId)
    sender.friends.push(receiverId)
    receiver.friends.push(senderId)
    
    await receiver.save()
    return await sender.save()
    //update friend request sent array of other person, update friend request received of u
    //add to friend array list
    //pop off the friend requests list
}
const declineFriendRequest = async (senderId, receiverId)=>{ //parameter should be string of the id??
    const sender = await User.findById(senderId)
    const receiver = await User.findById(receiverId)
    receiver.friendRequestReceived.filter(elt => elt != senderId)
    return await receiver.save()
}

module.exports = {
    createUser, getUser, getUsers, sendFriendRequest, acceptFriendRequest, declineFriendRequest , getUserByEmail, getAllUser
}
