CREATE TABLE items (
    item VARCHAR(100),
    price INT          
);

CREATE TABLE customers (
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

INSERT INTO items (item, price) VALUES
    ('Small Desk', 100),
    ('Large desk', 300),
    ('Fan', 80);

INSERT INTO customers (first_name, last_name) VALUES
    ('Greg', 'Jones'),
    ('Sandra', 'Jones'),
    ('Scott', 'Scott'),
    ('Trevor', 'Green'),
    ('Melanie', 'Johnson');

SELECT * FROM items;

SELECT * FROM items WHERE price > 80;

SELECT * FROM items WHERE price <= 300;

SELECT * FROM customers WHERE last_name = 'Smith';

SELECT * FROM customers WHERE last_name = 'Jones';

SELECT * FROM customers WHERE last_name != 'Scott';
