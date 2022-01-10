const router = require('express').Router();
const User = require('../../models/User');
// GET a single user by its _id and populated thought and friend data

// POST a new user:


// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.

// /api/users
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
router.post('/', async (req, res) => {
    // SAVE IT O THE DB using the user model!
    const newUser = await User.create({ username: req.body.username, email: req.body.email });

    res.json(newUser);

});

// /api/users
// GET all users
router.get('/', async (req, res) => {
    // get all users
    const newUser = await User.find({});

    res.json(newUser);
});

// /api/users
// GET all users
router.get('/', async (req, res) => {
    // get all users
    const newUser = await User.find({});

    res.json(newUser);
});

// /api/users/:userId/friends/:friendId
// GET a single user by its _id and populated thought and friend data
router.get({ params }, res) {
    const newUser = await User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        res.json(newUser)
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
};

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;