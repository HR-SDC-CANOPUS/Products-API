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
    return pool.connect().then((client) => {
      const query = `SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price,
            (
            SELECT array_to_json(array_agg(row_to_json(d)))
            FROM (
              SELECT feature, value FROM features
              WHERE features.current_product_id = products.id
            ) d
          ) AS features
          FROM products
          WHERE products.id = $1 `;
      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },

  readStyles: function (productId) {
    return pool.connect().then((client) => {
      const query = `SELECT row_to_json(t)
        FROM (
          SELECT products.id,
            (
            SELECT array_to_json(array_agg(row_to_json(d)))
            FROM (
              SELECT styles.style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style, (
                SELECT array_to_json(array_agg(row_to_json(d)))
                FROM (
                  SELECT photos.url, photos.thumbnail_url FROM photos
                  WHERE photos.style_id = styles.style_id
                ) d
              ) AS photos,
              (
                SELECT json_object_agg(skus.size, skus.quantity) FROM skus
                WHERE skus.style_id = styles.style_id
              ) AS skus
              FROM styles
              WHERE styles.product_id = products.id
            ) d
          ) AS results
          FROM products
          WHERE products.id = $1
        ) t`;
      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },

  readRelated: function (productId) {
    console.log("hello", productId);
    return pool.connect().then((client) => {
      const query = `select array_agg(related_products.related_product_id)
      from related_products
      where related_products.current_product_id = $1`;
      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res.rows[0].array_agg;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },
};
