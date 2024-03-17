const {createUserController, getUserController, getUsersController, sendFriendRequestController, acceptFriendRequestController, declineFriendRequestController, getUserByEmailController} = require ('../controllers/user.controller')
const { getAllUser } = require('../services/user.service')

const router = require ('express').Router()

router.post('/',createUserController)
router.get('/all', (req, res) => {
    getAllUser()
    .then((data) => res.send(data))
    .catch(()=> res.status(500))
})
router.get('/:user', getUserController)
router.post('/users', getUsersController)
router.get('/email/:email', getUserByEmailController)


router.post('/friend/send', sendFriendRequestController)

router.post('/friend/accept', acceptFriendRequestController)

router.post('/friend/decline', declineFriendRequestController)

module.exports = router