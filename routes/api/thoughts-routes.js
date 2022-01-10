const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

// /api/thoughts
// GET to get all thoughts
router.get('/', async (req, res) => {
    // get all users
    const newThought = await Thought.find({});

    res.json(newThought);
});

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
router.post('/:userId', async (req, res) => {
    // SAVE IT TO THE DB using the user model!
    try {
        const newThought = await Thought.create({ thoughtText: req.body.thoughtText })
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId },
            { $push: { thought: newThought._id } });

        res.json(newThought);
    } catch (err) {
        console.log(err);
    }

});

// PUT to update a thought by its _id
router.put('/:thoughtId', async ({ params, body }, res) => {
    // SAVE IT TO THE DB using the user model!
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true });
        res.json(updatedThought);
    } catch (err) {
        console.log(err);
    }
});


// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId });
        res.json(deletedThought);
    } catch (err) {
        console.log(err);
    }
});

// /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', async (req, res) => {
    // SAVE IT TO THE DB using the user model!
    try {
        const newReaction = await Thought.create({ reacton: req.body.reaction })
        const updatedThought = await User.findOneAndUpdate({ _id: req.params.thoughtId },
            { $push: { reaction: newReaction.body } });

        res.json(newReaction);
    } catch (err) {
        console.log(err);
    }

});
// addReaction({ params, body }, res) {
//     Thought.findOneAndUpdate(
//         { _id: params.id },
//         { $push: { reactions: body} },
//         { new: true }
//     )
//     .then(dbThoughtData => {
//         if (!dbThoughtData) {
//             res.status(404).json({ message: 'No thought found with this id!' });
//             return;
//         }
//         res.json(dbThoughtData);
//     })
//     .catch(err => res.json(err));
// }

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value
module.exports = router;