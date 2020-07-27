const {
  readList,
  readProduct,
  readStyles,
  readRelated,
} = require("../models/");

module.exports = {
  getList: function (req, res) {
    const { page, count } = req.query;
    readList(page, count)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getProduct: function (req, res) {
    const { product_id } = req.params;
    readProduct(product_id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getStyles: function (req, res) {
    const { product_id } = req.params;
    readStyles(product_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getRelated: function (req, res) {
    const { product_id } = req.params;
    readRelated(product_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
