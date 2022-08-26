const router = require('express').Router();
const { DELETE } = require('sequelize/types/lib/query-types');
const { Category, Product } = require('../../models');
const { findOne } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'productName', 'price', 'quantity', 'categoryID']
    }
  }).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'Did not find categories!' });
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: Product,
    attributes:["id","productname","price","quantity",'categoryID']

  }).then(categoryData => {
    if(!categoryData){
      res.status(404).json({message:"did not find categories"})
      return;
    }
    res.json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  });
  
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    categoryName: req.body.categoryName
  }).then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
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

    if(!updatecategories){
      res.status(404).json({message:"no category found with id"});
      return;
    }
    res.status(200).json(updatecategories);
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!delCategoryData){
      res.status(404).json({ message: "no category found with id"});
      return;
    }

    res.status(200).json(delCategoryData);
  } catch(err){
    res.status(500).json(err);
    }
});

module.exports = router;
