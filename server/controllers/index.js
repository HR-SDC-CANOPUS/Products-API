const {
  readList,
  readProduct,
  readStyles,
  readRelated,
} = require(".././models/");

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
    console.log("req params", req.params);
    const { product_id } = req.params;
    readProduct(product_id)
      .then((results) => {
        res.send(results.rows[0]);
      })
      .catch((err) => console.error(err));
  },

  getStyles: function (req, res) {
    console.log("req params", req.params);
    readStyles()
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => console.error(err));
  },

  getRelated: function (req, res) {
    readRelated()
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => console.error(err));
  },
};
