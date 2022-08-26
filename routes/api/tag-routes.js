const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// const { update } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
  const TagData = await Tag.findByPk(req.params.id,{
    include: [{model:Product}]
  });

  if (!TagData){
    res.status(404).json({message:"no tags with id"});
    return;
  }
  res.status(200).json(TagData);
} catch (err){
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const NewTagData = await Tag.create({
      tag_name: req.body.tag_name
  });
    res.status(200).json(NewTagData);
  } catch (err){
    res.status(400).json(err);
  }
  
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update({
      id: req.body.id,
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updateTagData);
    if (!updateTagData) {
      res.status(404).json({message: 'No tag found with id!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(delTagData);
    if (!delTagData) {
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
