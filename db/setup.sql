CREATE EXTENSION hstore;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    slogan TEXT,
    description TEXT, 
    category TEXT, 
    default_price INTEGER NOT NULL,
    features hstore
);

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER,
    name TEXT,
    sale_price TEXT,
    original_price INTEGER,
    default_style BOOLEAN,
    photos hstore,
    skus hstore
);

/*this table needs work*/
CREATE TABLE related_products (
    id SERIAL PRIMARY KEY, 
    current_product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
);
