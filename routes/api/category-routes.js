const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: 
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    })
    .then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: "Category ID not found"});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

//{category_name: "shirt"}
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategory => res.json(newCategory))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)// create a new category
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData[0]) {
        res.status(404).json({message: "Category ID not found"});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        if (!deletedCategory) {
          res.status(404).json({message: "Category ID not found"});
          return;
        }
        res.json(deletedCategory);
      })
      .catch((err) => {
        consloe.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
