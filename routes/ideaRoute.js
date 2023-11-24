const {Router} = require('express');
const router = new Router();
const Idea = require('../models/IdeaSchema');

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    return res.json({
      succes: true,
      data: ideas,
    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    return res.status(404).json({
      succes: false,
      message: 'Idea not found',
    });
  }
  return res.status(200).json({
    success: true,
    idea,
  });
});

router.post('/', async (req, res) => {
  const {tag, text, author} = req.body;
  try {
    const newIdea = new Idea({
      text,
      tag,
      author,
    });
    console.log(newIdea);
    await newIdea.save();
    return res.status(200).json({newIdea});
  } catch (error) {
    res.status(500);
  }
});

router.patch('/:id', async (req, res) => {
  const {text, tag} = req.body;

  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text,
          tag,
        },
      },
      {new: true}
    );
    res.json({
      succes: true,
      data: updatedIdea,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);

    if (!idea) {
      return res.status(404).json({
        status: false,
        message: 'Idea not found',
      });
    }
    return res.status(200).json({
      succes: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
