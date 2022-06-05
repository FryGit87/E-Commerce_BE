const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const catagoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No matching id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create a new category
router.post("/", (req, res) => {
    try {
    const catagoryData = await Category.create(req.body);
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
   try {
    const catagoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catagoryData[0]) {
      res.status(404).json({ message: 'No matching id!' });
      return;
    }
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
   try {
    const catagoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No matching id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
