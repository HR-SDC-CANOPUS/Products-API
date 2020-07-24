const axios = require("axios");
const pool = require("../connection");

module.exports = {
  readList: function (page = 1, count = 5) {
    return pool
      .connect()
      .then((client) => {
        const query = `SELECT * FROM products
        LIMIT $2 OFFSET $1`;
        const result = client.query(query, [page * count - count, count]);
        client.release();
        return result;
      })
      .catch((err) => console.log(err));
  },

  readProduct: function (productId) {
    return pool
      .connect()
      .then((client) => {
        const query = `SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price,
            (
            SELECT array_to_json(array_agg(row_to_json(d)))
            FROM (
              select feature, value FROM features
              where features.current_product_id = products.id
            ) d
          ) as features
          FROM products
          where products.id = $1 `;
        const result = client.query(query, [productId]);
        client.release();
        return result;
      })
      .catch((err) => console.log(err));
  },

  readStyles: function (productId) {
    return pool
      .connect()
      .then((client) => {
        const query = `SELECT row_to_json(t) 
        FROM(
          SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price,
            (
            SELECT array_to_json(array_agg(row_to_json(d)))
            FROM (
              select feature, value FROM features
              where features.current_product_id = products.id
            ) d
          ) as features
          FROM products
          where products.id = $1 
        ) t`;
        return client
          .query(query, [productId])
          .then((res) => {
            client.release();
            return res;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  readRelated: function (params, callback) {},
};

// GET /products/list Retrieves the list of products.
// GET /products/:product_id = Returns all product level information for a specified product id.
// GET /products/:product_id/styles Returns the all styles available for the given product.
// GET /products/:product_id/related - Returns the id's of products related to the product specified.
