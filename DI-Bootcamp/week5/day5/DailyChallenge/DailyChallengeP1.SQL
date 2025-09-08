CREATE TABLE Customer (
id SERIAL PRIMARY KEY,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL
);

CREATE TABLE CustomerProfile (
id SERIAL PRIMARY KEY,
isLoggedIn BOOLEAN DEFAULT FALSE,
customer_id INT UNIQUE,
FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

INSERT INTO Customer (first_name, last_name)
VALUES
('John', 'Doe'),
('Jerome','Lalu'),
('Lea','Rive');

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (
    TRUE,
    (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe')
);

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (
    FALSE,
    (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu')
);

SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id;

SELECT COUNT(*) AS not_logged_in_customers
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE;

