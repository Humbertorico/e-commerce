const router = require('express').Router();
// const { DELETE } = require('sequelize/types/lib/query-types');
const { Category, Product } = require('../../models');
// const { findOne } = require('../../models/Category');

// The `/api/categories` endpoint?

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category with id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create({
    categoryName: req.body.categoryName
  }).then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update({
      id: req.body.id,
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updateCategoryData);
    if (!updateCategoryData) {
      res.status(404).json({message: 'No category found with id!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategoryData);
    if (!deleteCategoryData) {
      res.status(404).json({message: 'No category found with  id!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
