// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:"categoryID"
});

// Categories have many Products
Category.hasMany(Product,{
  foreignKey:"categoryID"
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(tag,{
  through: ProductTag,
  foreignKey:"product_id"
});

// Tags belongToMany Products (through ProductTag)
tag.belongsToMany(Product,{
  through: ProductTag,
  foreignKey:"tag_id"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};