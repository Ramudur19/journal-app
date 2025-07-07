const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');
const auth = require('../middleware/auth');

// @route   POST /api/journals
// @desc    Create a journal entry
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, content, mood } = req.body;

  try {
    const newJournal = new Journal({
      user: req.user,
      title,
      content,
      mood
    });

    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get("/", auth, async (req, res) => {
  //Find all journal entries where user equals req.user
  allJournals = await Journal.find({user: req.user});

  res.status(200).json(allJournals);

  //Return them as JSON
});

router.put('/:id', auth, async(req, res) => {
  const { title, content, mood } = req.body;
  const id = req.params.id;
  var journal_entry = await Journal.findById(id);
  if (!journal_entry) {
    return res.status(401).send('id is invalid or not given');
  }

  if (journal_entry.user.toString() == req.user) {
    if (title) {
      journal_entry.title = title;
    }
    if(content) {
      journal_entry.content = content;
    }
    if(mood) {
      journal_entry.mood = mood;
    }
   }
   else {
    return res.status(401).send('user is not matching');
   }

  await journal_entry.save();
  res.status(200).json(journal_entry);
})

router.delete("/:id", auth, async(req,res) => {
  const id = req.params.id;
  var journal_entry = await Journal.findById(id);
  if (!journal_entry) {
    return res.status(404).send('id is invalid or not given');
  }
  if (journal_entry.user.toString() == req.user) { 
    await journal_entry.deleteOne();
    res.status(200).send("journal was deleted successfully")
  }
  else {
    return res.status(401).send("Unauthorized user")
  }

}) 

module.exports = router;
